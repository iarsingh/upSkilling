import React, { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

type Runbook = { id: string; title: string; content: string; steps: string[]; score?: number; category?: string };
type Incident = {
  id: string; title: string; description: string; service: string; severity: string; created_at: string;
  prediction: { category: string; team: string; confidence: number; needs_review: boolean; model_version: string };
  recommendation: { summary: string; steps: string[]; citation_ids: string[]; mode: string; requires_human_approval: boolean };
  runbooks: Runbook[];
  feedback?: { helpful: boolean; notes: string; correct_category: string | null } | null;
};
const sample = {
  title: 'Checkout pods restarting after deployment',
  description: 'Kubernetes checkout pods are in CrashLoopBackOff. Container events show OOMKilled after the latest deployment. Memory usage has reached the configured limit and readiness probes are failing.',
  service: 'checkout-api', severity: 'SEV2',
};
async function api<T>(path: string, key: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(path, { ...options, headers: { 'Content-Type': 'application/json', ...(key ? { 'X-API-Key': key } : {}), ...options.headers } });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(typeof body.detail === 'string' ? body.detail : `Request failed (${response.status}). Check your input and API connection.`);
  }
  return response.json();
}

function App() {
  const [tab, setTab] = useState<'triage' | 'runbooks'>('triage');
  const [form, setForm] = useState({ title: '', description: '', service: '', severity: 'SEV3' });
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [books, setBooks] = useState<Runbook[]>([]);
  const [selected, setSelected] = useState<Incident | null>(null);
  const [busy, setBusy] = useState(false);
  const [feedbackBusy, setFeedbackBusy] = useState(false);
  const [status, setStatus] = useState('Checking API');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [key, setKey] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');

  async function refresh() {
    try {
      const [health, rows, runbooks] = await Promise.all([
        api<{ status: string }>('/health/ready', key),
        api<Incident[]>('/api/v1/incidents', key),
        api<Runbook[]>('/api/v1/runbooks', key),
      ]);
      setStatus(health.status === 'ready' ? 'API ready' : 'API unavailable');
      setIncidents(rows); setBooks(runbooks);
    } catch (e) { setStatus('Setup needed'); setError((e as Error).message); }
  }
  useEffect(() => { void refresh(); }, [key]);

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      const row = await api<Incident>('/api/v1/incidents', key, { method: 'POST', body: JSON.stringify(form) });
      setSelected(row); setNotes(''); setCategory('');
      setIncidents(old => [row, ...old].slice(0, 25));
    } catch (e) { setError((e as Error).message); }
    finally { setBusy(false); }
  }
  async function selectIncident(id: string) {
    setError(''); setNotice('');
    try {
      const row = await api<Incident>(`/api/v1/incidents/${id}`, key);
      setSelected(row); setNotes(row.feedback?.notes ?? ''); setCategory(row.feedback?.correct_category ?? '');
    } catch (e) { setError((e as Error).message); }
  }
  async function saveFeedback(helpful: boolean) {
    if (!selected) return;
    setFeedbackBusy(true); setError(''); setNotice('');
    try {
      await api(`/api/v1/incidents/${selected.id}/feedback`, key, { method: 'PUT', body: JSON.stringify({ helpful, notes, correct_category: category || null }) });
      setSelected({ ...selected, feedback: { helpful, notes, correct_category: category || null } });
      setNotice('Review saved. Feedback is available for future evaluation.');
    } catch (e) { setError((e as Error).message); }
    finally { setFeedbackBusy(false); }
  }

  return <div className="shell">
    <aside className="sidebar">
      <a className="brand" href="/" aria-label="IncidentOps home"><span className="brandmark">io</span> IncidentOps<span className="beta">LOCAL</span></a>
      <p className="nav-label">WORKSPACE</p>
      <nav aria-label="Main navigation">
        <button className={tab === 'triage' ? 'nav-item active' : 'nav-item'} onClick={() => setTab('triage')}><span>◎</span> Incident triage</button>
        <button className={tab === 'runbooks' ? 'nav-item active' : 'nav-item'} onClick={() => setTab('runbooks')}><span>▤</span> Runbook library <small>{books.length}</small></button>
      </nav>
      <div className="sidebar-bottom"><span className={`dot ${status === 'API ready' ? 'green' : 'amber'}`}/><span>{status}</span><p>Local development workspace</p><details><summary>API access</summary><label>API key<input type="password" value={keyInput} onChange={e => setKeyInput(e.target.value)} autoComplete="off" placeholder="Only if configured"/></label><button className="subtle" onClick={() => { setError(''); setKey(keyInput); }}>Connect</button><small>Kept in memory for this session.</small></details></div>
    </aside>
    <main>
      <header><div className="breadcrumb">Workspace <span>/</span> {tab === 'triage' ? 'Incident triage' : 'Runbook library'}</div><span className="environment">● Development</span></header>
      <section className="page-heading"><div><p className="eyebrow">ON-CALL, WITH CONTEXT</p><h1>{tab === 'triage' ? 'From alert to a clear next step.' : 'The evidence behind each recommendation.'}</h1><p className="subtitle">{tab === 'triage' ? 'Route incidents, find relevant runbooks, and keep engineers in control.' : 'Five curated demo runbooks. Every recommendation links back to its sources.'}</p></div></section>
      {error && <div role="alert" className="message error">{error}<button onClick={() => { setError(''); void refresh(); }}>Retry connection</button></div>}
      {notice && <div role="status" className="message success">{notice}</div>}
      {tab === 'runbooks' ? <section className="library">{books.map(b => <article className="panel" key={b.id}><span className="tag">{b.category}</span><h2>{b.title}</h2><p>{b.content}</p><ol>{b.steps.map(s => <li key={s}>{s}</li>)}</ol><code>{b.id}</code></article>)}</section> : <>
        <section className="stats" aria-label="Workspace summary"><div><span>Recent incidents</span><strong>{incidents.length}<small>Latest 25</small></strong></div><div><span>Runbooks available</span><strong>{books.length}<small>Curated sources</small></strong></div><div><span>Review workflow</span><strong className="stat-text">Human led<small>Suggestions require review</small></strong></div></section>
        <div className="workspace-grid">
          <section className="panel intake"><div className="panel-heading"><h2>New incident</h2><span className="step-number">01 / INTAKE</span></div><p className="muted">Describe what happened. Include symptoms and recent changes.</p>
            <form onSubmit={submit}>
              <label>Incident title<input required minLength={5} maxLength={200} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Checkout pods restarting"/></label>
              <div className="form-row"><label>Service<input required maxLength={100} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} placeholder="checkout-api"/></label><label>Severity<select value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })}>{['SEV1','SEV2','SEV3','SEV4'].map(s => <option key={s}>{s}</option>)}</select></label></div>
              <label>What are you observing?<textarea required minLength={15} maxLength={10000} rows={6} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Symptoms, impact, errors, and anything that changed…"/></label>
              <div className="form-actions"><button type="button" className="subtle" onClick={() => setForm(sample)}>Use demo incident</button><button className="primary" disabled={busy}>{busy ? 'Investigating…' : 'Triage incident →'}</button></div>
              <p className="fineprint">Demo classifier · No actions are executed automatically.</p>
            </form>
          </section>
          <section className="panel investigation" aria-live="polite"><div className="panel-heading"><h2>Investigation</h2><span className="step-number">02 / REVIEW</span></div>
            {!selected ? <div className="empty"><span className="empty-symbol">◎</span><h3>Start with the signal.</h3><p>Submit an incident to see suggested routing, diagnostic steps, and the runbooks behind them.</p><div className="flow"><span>Classify</span><i>→</i><span>Retrieve</span><i>→</i><span>Review</span></div></div> : <>
              <div className="result-title"><span className="tag">{selected.severity}</span><span className="muted">{selected.service}</span><h3>{selected.title}</h3></div>
              <div className="routing"><div><span className="eyebrow">SUGGESTED TEAM</span><strong>{selected.prediction.team}</strong></div><span className="tag">{selected.prediction.category}</span></div>
              <p className="fineprint">Classifier score {Math.round(selected.prediction.confidence * 100)}% · {selected.prediction.needs_review ? 'Low confidence — manual routing needed' : 'Validate routing before assignment'}</p>
              <p>{selected.recommendation.summary}</p><ol className="steps">{selected.recommendation.steps.map(s => <li key={s}>{s}</li>)}</ol>
              <p className="eyebrow">SUPPORTING RUNBOOKS</p><div className="sources">{selected.runbooks.map(b => <details key={b.id}><summary>{b.title} {selected.recommendation.citation_ids.includes(b.id) ? '· cited' : ''}</summary><p>{b.content}</p><small>{b.id} · lexical match {Math.round((b.score ?? 0) * 100)}%</small></details>)}</div>
              <div className="review"><h3>Engineer feedback</h3><label>Correct category, if needed<select value={category} onChange={e => setCategory(e.target.value)}><option value="">No correction</option>{['database','kubernetes','network','application','security'].map(c => <option key={c}>{c}</option>)}</select></label><label>Review notes<textarea maxLength={2000} rows={2} value={notes} onChange={e => setNotes(e.target.value)} placeholder="What was useful or missing?"/></label><div className="form-actions"><button className="subtle" disabled={feedbackBusy} onClick={() => void saveFeedback(false)}>Needs improvement</button><button className="primary" disabled={feedbackBusy} onClick={() => void saveFeedback(true)}>Helpful ✓</button></div>{selected.feedback && <p className="fineprint">Saved review: {selected.feedback.helpful ? 'Helpful' : 'Needs improvement'}</p>}</div>
              <p className="fineprint">{selected.prediction.model_version} · Recommendation mode: {selected.recommendation.mode.replaceAll('_',' ')}</p>
            </>}
          </section>
        </div>
        <section className="panel recent"><div className="panel-heading"><h2>Recent incidents</h2><button className="subtle" onClick={() => void refresh()}>Refresh</button></div>{incidents.length === 0 ? <p className="muted">Your incident history will appear here after the first triage.</p> : <div className="table-wrap"><table><thead><tr><th>Incident</th><th>Service</th><th>Severity</th><th>Suggested team</th><th>Created</th></tr></thead><tbody>{incidents.map(row => <tr key={row.id}><td><button className="incident-link" onClick={() => void selectIncident(row.id)}>{row.title}</button></td><td>{row.service}</td><td><span className="tag">{row.severity}</span></td><td>{row.prediction.team}</td><td>{new Date(row.created_at.endsWith('Z') || /[+-]\d\d:\d\d$/.test(row.created_at) ? row.created_at : row.created_at + 'Z').toLocaleString()}</td></tr>)}</tbody></table></div>}</section>
      </>}
      <footer>IncidentOps <span>Evidence first. Engineers decide.</span><span>Synthetic training data · Validate with real incidents before production.</span></footer>
    </main>
  </div>;
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

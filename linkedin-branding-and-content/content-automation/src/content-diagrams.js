// Diagram components and relationships are selected from the post's subject and scenario.
const palettes = {
  fde: ['#0f766e', '#ccfbf1'], platform: ['#0369a1', '#e0f2fe'],
  ml: ['#15803d', '#dcfce7'], python: ['#b45309', '#fef3c7'], cloud: ['#6d28d9', '#ede9fe']
};
const recipes = [
  ...require("./library-diagrams"),
  [/autoscal|\bhpa\b|\bvpa\b/, 'architecture', 'AUTOSCALING CONTROL LOOPS', ['Metrics API','HPA → replicas','Workload pods','Node autoscaler','Pending pods','VPA → requests'], 'HPA changes replicas; VPA recommends resources; unschedulable pods drive node scaling.', [[0,1],[1,2],[5,2],[2,4],[4,3]]],
  [/service discovery/, 'architecture','SERVICE DISCOVERY',['Client pod','Service + DNS','Ready endpoints','CoreDNS','EndpointSlices','Application pods'],'DNS resolves the Service; traffic reaches ready endpoints selected for that Service.'],
  [/ingress/, 'architecture','INBOUND REQUEST PATH',['Client','Ingress controller','Service','DNS + TLS','Ingress rules','Ready pods'],'Trace DNS, TLS, routing, Service selectors, and ready endpoints in that order.'],
  [/networkpolicy/, 'architecture','WORKLOAD TRAFFIC BOUNDARIES',['Source workload','Network policy','Destination pods','Namespace labels','Ingress + egress','CNI enforcement'],'Policies select pods; allowed traffic depends on both ingress and egress rules.'],
  [/secret/, 'architecture','SECRET DELIVERY',['Secret store','Sync / CSI driver','Workload','IAM identity','Kubernetes Secret','Rotation control'],'Limit access, choose how secrets reach pods, and verify rotation without exposing values.'],
  [/model serving|model-serving/, 'architecture','MODEL SERVING PLATFORM',['API gateway','Inference service','Model response','Model registry','GPU node pool','Metrics + scaling'],'Separate model artifacts, request handling, GPU capacity, and observability.'],
  [/feature store/, 'architecture','FEATURE STORE BOUNDARIES',['Feature sources','Transform pipeline','Online serving','Offline store','Feature definitions','Access + lineage'],'Keep feature definitions consistent across training and serving; control access and ownership.'],
  [/batch inference|real-time inference/, 'architecture','TWO INFERENCE PATHS',['Batch input','Scheduled inference','Output dataset','API request','Online inference','Immediate response'],'Batch favors throughput; online serving must meet request latency and availability targets.',[[0,1,'scheduled'],[1,2,'persist'],[3,4,'request'],[4,5,'respond']]],
  [/rate limiter/, 'architecture','REQUEST ADMISSION',['Client','Rate-limit check','API handler','Identity + key','Shared counters','429 + retry hint'],'Choose the limit key and algorithm; handle shared state, bursts, and failure behavior.'],
  [/kafka/, 'architecture','PARTITIONED EVENT FLOW',['Producer','Topic partitions','Consumer group','Message key','Offset tracking','Downstream store'],'Ordering is within a partition. Keys and consumer ownership determine the processing boundary.'],
  [/namespace/, 'architecture','MULTI-TEAM CLUSTER',['Team workloads','Namespace boundary','Shared cluster','RBAC','ResourceQuota','NetworkPolicy'],'Namespaces group resources; RBAC, quotas, and network policies provide separate controls.'],
  [/vertex ai/, 'architecture','MANAGED VS SELF-MANAGED',['Model artifact','Vertex AI endpoint','Managed runtime','Model artifact','GKE deployment','Team-owned runtime'],'Compare operational ownership, runtime flexibility, scaling, and cost for the same workload.',[[0,1,'deploy'],[1,2,'serve'],[3,4,'deploy'],[4,5,'operate']]],
  [/internal developer platform/, 'architecture','DEVELOPER SELF-SERVICE',['Developer portal','Service template','Delivery pipeline','Catalog + owner','Policy controls','Runtime + feedback'],'A useful platform connects developer workflows to ownership, delivery, and production feedback.'],
  [/arg[o]? cd|gitops/, 'architecture','GITOPS PROMOTION',['Git repository','Argo CD reconcile','Target clusters','ApplicationSet','Policy + review','Health + drift'],'Promote reviewed desired state; reconcile each cluster and observe health and drift.'],
  [/registry|model approval/, 'flow','MODEL RELEASE GATES',['Register version','Evaluate candidate','Attach evidence','Owner approval','Promote alias','Monitor / rollback'],'Keep evaluation evidence and approval attached to the exact model version.'],
  [/mlflow|kubeflow|reproducib/, 'flow','REPRODUCIBLE TRAINING',['Version inputs','Pipeline steps','Track run','Store artifacts','Compare metrics','Register model'],'Tie each run to data, code, parameters, metrics, and immutable artifacts.'],
  [/lineage/, 'flow','AUDITABLE MODEL LINEAGE',['Data snapshot','Feature version','Code revision','Training run','Model version','Release record'],'Trace a deployed model back through its run, code, features, and source data.'],
  [/canary|istio/, 'flow','PROGRESSIVE TRAFFIC RELEASE',['Baseline ready','Deploy candidate','Small traffic split','Compare signals','Expand or stop','Rollback route'],'Use quality and service metrics to decide whether to expand candidate traffic.'],
  [/rollback/, 'flow','RECOVERY DECISION',['Detect regression','Stop promotion','Select good version','Restore traffic','Verify recovery','Record incident'],'Retain a known good artifact and test the steps that restore acceptable behavior.'],
  [/retrain/, 'flow','CONTROLLED RETRAINING',['Watch drift','Check performance','Approve trigger','Train candidate','Evaluate quality','Release or reject'],'A drift alert is evidence to investigate, not automatic proof that retraining will help.'],
  [/drift/, 'flow','DRIFT INVESTIGATION',['Reference window','Current sample','Validate schema','Compare distributions','Check performance','Investigate cause'],'Input drift and changes in predictive relationships require different evidence.'],
  [/monitoring signals/, 'architecture','MODEL OBSERVABILITY',['Prediction service','Telemetry pipeline','Dashboards + alerts','Quality labels','Latency + errors','Drift + cost'],'Monitor service health and model behavior; label-based quality may arrive later.'],
  [/latency/, 'flow','LATENCY INVESTIGATION',['Measure p95 / p99','Trace request','Split queue + compute','Profile bottleneck','Change one factor','Verify tail latency'],'Separate network, queueing, preprocessing, model execution, and response time.'],
  [/feature pipeline/, 'flow','FEATURE QUALITY GATES',['Source schema','Null + range checks','Freshness checks','Join validation','Leakage checks','Publish features'],'Reject stale or invalid features before they enter training or serving.'],
  [/disruption budget/, 'flow','VOLUNTARY DISRUPTION',['Healthy replicas','Set availability','Request eviction','Check PDB budget','Allow or block','Wait for readiness'],'PDBs constrain voluntary disruptions; they do not prevent every kind of outage.'],
  [/crashloop/, 'flow','RESTART INVESTIGATION',['Describe pod','Previous logs','Check exit reason','Review config','Check probes / OOM','Fix + verify'],'Read the termination reason and previous container logs before changing the deployment.'],
  [/imagepull/, 'flow','IMAGE PULL INVESTIGATION',['Read pod events','Check image reference','Verify registry access','Check credentials','Confirm architecture','Retry + verify'],'Separate missing tags, denied access, network failures, and incompatible images.'],
  [/readiness|liveness/, 'architecture','PROBE RESPONSIBILITIES',['Readiness check','Service endpoints','Request traffic','Liveness check','Container restart','Startup protection'],'Readiness gates traffic; liveness triggers restart; startup probes protect slow initialization.',[[0,1,'ready'],[1,2,'route'],[3,4,'failure'],[5,3,'protect']]],
  [/requests and limits/, 'architecture','RESOURCE BOUNDARIES',['Pod requests','Scheduler placement','Node capacity','CPU limit','Memory limit','Runtime enforcement'],'Requests guide scheduling; CPU limits throttle; memory limits can cause OOM termination.',[[0,1,'reserve'],[1,2,'fit'],[3,5,'throttle'],[4,5,'OOM risk']]],
  [/scheduler/, 'flow','POD PLACEMENT',['Resource requests','Filter nodes','Affinity rules','Taints + tolerations','Topology spread','Bind selected node'],'Scheduling combines available resources with workload placement constraints.'],
  [/node pool upgrade/, 'flow','SAFE NODE UPGRADE',['Check capacity','Review PDBs','Create surge nodes','Drain old nodes','Verify workloads','Finish or pause'],'Plan disruption and surge capacity before draining nodes hosting production workloads.'],
  [/rbac|iam|least privilege/, 'flow','ACCESS DECISION',['Identify principal','Choose scope','Define actions','Bind role','Test allowed + denied','Audit usage'],'Grant only the necessary actions and resources; verify both permitted and rejected requests.'],
  [/helm|kustomize/, 'flow','CONFIGURATION DELIVERY',['Base manifests','Values / overlays','Render output','Validate schema','Review diff','Apply + verify'],'Review rendered manifests rather than trusting templates or overlays alone.'],
  [/cloud cost/, 'flow','COST REPORT PIPELINE',['Billing export','Normalize records','Group by owner','Compare baseline','Flag anomalies','Publish report'],'Make currency, time window, allocation rules, and missing ownership explicit.'],
  [/excel|csv/, 'flow','TABULAR DATA AUTOMATION',['Read workbook / CSV','Validate columns','Normalize types','Transform rows','Write output','Reconcile totals'],'Check schemas and totals; preserve the input so results can be reproduced.'],
  [/file and folder/, 'flow','SAFE FILE OPERATIONS',['Select paths','Inspect permissions','Build dry-run plan','Review changes','Apply operations','Verify + log'],'Confirm scope and inspect the dry-run plan before changing files.'],
  [/health monitoring|health checks/, 'flow','HEALTH CHECK LOOP',['Load targets','Set timeouts','Probe endpoints','Classify failures','Emit metrics','Alert owner'],'Bound request time and distinguish a failed check from a confirmed service outage.'],
  [/incident summar/, 'flow','INCIDENT EVIDENCE',['Collect events','Normalize time','Build timeline','Link evidence','Draft summary','Owner review'],'Separate observed facts from hypotheses and retain links to supporting evidence.'],
  [/inventory/, 'flow','INFRASTRUCTURE INVENTORY',['List accounts','Query APIs','Handle pagination','Normalize resources','Check ownership','Export snapshot'],'Capture account, region, resource identifiers, and collection time for each record.'],
  [/config files|security checks/, 'flow','CONFIGURATION CHECKS',['Load configuration','Validate schema','Scan secret exposure','Check permissions','Report violations','Block unsafe change'],'Report specific violations and keep secret values out of logs and reports.'],
  [/github actions|ci[ /]cd validation/, 'flow','CI VALIDATION GATES',['Checkout revision','Install dependencies','Run validation','Collect results','Fail unsafe change','Publish evidence'],'Use clear exit codes and retain validation results for the exact revision.'],
  [/log analyzer/, 'flow','LOG ANALYSIS PIPELINE',['Stream input','Parse records','Handle bad lines','Classify events','Aggregate counts','Export report'],'Bound memory and preserve enough source context to investigate unusual events.'],
  [/cli tools/, 'flow','CLI EXECUTION',['Parse arguments','Validate input','Plan action','Execute with timeout','Emit structured result','Return exit code'],'Make errors actionable and scripts predictable through explicit output and exit codes.'],
  [/learning roadmap/, 'flow','LEARNING THROUGH DELIVERY',['Python basics','Files + data','HTTP + APIs','Tests + packaging','Safe automation','Production project'],'Build progressively: each skill should support a small, working engineering task.'],
  [/ansible|idempotency/, 'flow','REPEATABLE AUTOMATION',['Read current state','Define desired state','Plan change','Apply once','Run again','Verify no change'],'An idempotent operation reaches the same intended state when repeated.'],
  [/rto|rpo|outage strategy/, 'flow','DISASTER RECOVERY',['Set RTO + RPO','Design backups','Replicate state','Trigger failover','Restore + validate','Measure recovery'],'Test recovery time and data loss against the targets; backup existence alone is insufficient.'],
  [/opa|conftest|guardrail/, 'flow','POLICY BEFORE MERGE',['Infrastructure change','Render plan','Evaluate policies','Explain violations','Review exceptions','Merge allowed change'],'Evaluate policy against the planned change and make violations understandable to reviewers.'],
  [/cosign|slsa|signing/, 'flow','ARTIFACT TRUST',['Build artifact','Record provenance','Sign digest','Publish artifact','Verify identity','Admit deployment'],'Verify artifact identity and provenance at the deployment boundary.'],
  [/error budget|burn rate|slis|slos|actionable alerts/, 'flow','RELIABILITY DECISION',['Define user SLI','Choose SLO window','Measure failures','Compute budget burn','Route actionable alert','Adjust release pace'],'Use user-visible reliability and budget consumption to guide response and release decisions.'],
  [/capacity planning/, 'flow','CAPACITY MODEL',['Forecast demand','Benchmark service','Find bottleneck','Add headroom','Load-test spike','Review cost'],'Base capacity on measured throughput and latency under representative load.'],
  [/linux memory/, 'flow','MEMORY INVESTIGATION',['Check pressure','Inspect process RSS','Review page cache','Check swap activity','Read OOM events','Verify mitigation'],'Distinguish reclaimable cache, process growth, swap pressure, and OOM termination.'],
  [/container image layers/, 'flow','IMAGE BUILD + RUNTIME',['Base layers','Ordered build steps','Cache lookup','Immutable image','Writable layer','Running container'],'Build order affects cache reuse; runtime writes enter the container writable layer.'],
  [/rebase|cherry-pick/, 'flow','GIT CHANGE INTEGRATION',['Inspect branches','Choose merge strategy','Apply change','Resolve conflicts','Run verification','Review history'],'Choose history preservation or rewriting deliberately and verify the integrated result.'],
  [/threat model/, 'flow','DELIVERY TRUST BOUNDARIES',['Source commit','CI identity','Build environment','Artifact registry','Deployment identity','Production runtime'],'Identify who can change code, artifacts, credentials, and production state at each boundary.'],
  [/bash/, 'flow','FAILURE-AWARE SHELL',['Validate arguments','Quote variables','Check prerequisites','Run guarded action','Handle failures','Verify output'],'Make failures explicit and check outcomes rather than assuming commands succeeded.'],
  [/production checklist|deploying to kubernetes/, 'flow','DEPLOYMENT ACCEPTANCE',['Version artifact','Validate configuration','Check permissions','Verify health gates','Stage rollout','Observe + recover'],'Keep acceptance gates measurable and retain a tested recovery path.'],
  [/python automation|production python/, 'flow','RELIABLE AUTOMATION',['Validate inputs','Bound execution time','Retry transient errors','Prevent duplicates','Log results','Verify outcome'],'Timeouts, retry limits, idempotency, and observable results make automation dependable.']
];
const domains = [
  [/clinic|northshore|nurse|note|consent/, 'CLINIC ROUTING', ['Local note metadata','Consent gate','Routing rules','Clinic boundary','Approved policy','Nurse review'], 'Missing consent blocks routing; keep note bodies inside the clinic.'],
  [/ledger|brightpath|payment|settlement/, 'PAYMENT RECONCILIATION', ['Payment events','Match + deduplicate','Exception queue','Event identifiers','Settlement records','Analyst review'], 'Duplicates do not change totals; amount exceptions remain unresolved for human review.'],
  [/parts|helios|depot|bin|fault code/, 'PARTS LOOKUP', ['Asset + fault code','Signed parts lookup','Bin or escalation','Approved parts sheet','Stock snapshot','Depot lead'], 'A known fault can still be a stockout; unknown faults must not invent a part number.'],
  [/outage|cedar|feeder|storm|life.safety/, 'OUTAGE PRIORITIZATION', ['Open outages','Written priority rule','Suggested crew count','Life-safety flag','Restored filter','Dispatcher review'], 'Prioritize life safety; suggest capacity without dispatching crews or messaging customers.'],
  [/vendor|northline|bank change|sanctions/, 'VENDOR REVIEW', ['Vendor packet','Policy checks','Human review queue','Sanctions status','Bank-change flag','Second reviewer'], 'Blocked and manual-review decisions remain visible; the tool does not approve vendors.'],
  [/harborline|shipment|medical cargo|sop|tms|night desk/, 'OPERATIONS DECISION', ['Shipment record','Written priority','Cited recommendation','Local SOP binder','Evaluation cases','Shift lead review'], 'Keep recommendations explainable and read-only; the shift lead owns the decision.']
];
function contentDiagram(post) {
  const topic=post.baseTopic || post.topic || '';
  const source=`${topic} ${post.text || ''} ${post.draftPath || ''}`.toLowerCase();
  let spec;
  if (/fde|forward deployed/i.test(post.pillar || '')) {
    const domain=domains.find(([pattern])=>pattern.test(source));
    if (!domain) return null;
    const [,label,nodes,detail]=domain;
    // Use the existing interview sequence for process posts, but use domain components for workflow/design posts.
    const architecture=/workflow|constraint|security|architecture|design/.test(post.draftPath || '') || /workflow|route|sort|lookup/.test(topic.toLowerCase());
    const caseType=(post.draftPath || '').replace(/\.md$/, '').split('-').pop();
    const processSteps = {
      roi: [nodes[0], 'Choose pilot metric', 'Run shadow sample', 'Check agreement', 'Separate business ROI', 'Report evidence'],
      metric: [nodes[0], 'Define measurable result', 'Choose sample window', 'Check expected cases', 'Record disagreements', 'Report limits'],
      readout: [nodes[0], 'Show pilot evidence', 'Name disagreements', 'State scope limits', 'Assign next owner', 'Agree next step'],
      stakeholders: ['Name decision owners', nodes[1], 'Expose conflicting asks', 'Choose pilot boundary', 'Escalate tradeoff', 'Write the decision'],
      export: [nodes[0], 'Inspect real columns', 'Name missing field', 'Keep unknown explicit', 'Ask source owner', 'Validate new export'],
      audit: [nodes[0], 'Keep decision evidence', 'Exclude sensitive text', 'Record rule version', 'Replay locally', 'Review with owner'],
      writeback: [nodes[0], nodes[1], 'Keep output read-only', 'Check human agreement', 'Name writeback owner', 'Review recovery cost'],
      shadow: [nodes[0], nodes[1], 'Compare old process', 'Record disagreement', 'Check acceptance gate', 'Owner decides rollout'],
      overturn: [nodes[0], nodes[1], 'Owner disputes result', 'Pause affected scope', 'Add evaluation case', 'Revise written rule'],
      stop: [nodes[0], nodes[1], 'Watch stop conditions', 'Pause affected service', 'Return to old process', 'Owner verifies recovery'],
      rollback: [nodes[0], 'Detect unsafe outcome', 'Stop the new service', 'Use existing workflow', 'Verify no writeback', 'Owner confirms recovery'],
      handoff: [nodes[0], nodes[1], 'Document stop rules', 'Share evaluation file', 'Name support owner', 'Customer runs checks'],
      scope: [nodes[0], 'Define supported cases', 'Reject outside scope', nodes[1], 'Show explicit boundary', 'Owner agrees scope'],
      oldpath: [nodes[0], 'Run existing workflow', 'Compare new result', 'Keep old path available', 'Check disagreement', 'Owner chooses path'],
      unknown: [nodes[0], 'Find missing evidence', 'Return unknown', 'Do not infer a value', 'Escalate to owner', 'Add a known test case'],
      replay: [nodes[0], 'Capture rule version', 'Load source snapshot', nodes[1], 'Compare decision', 'Explain any difference'],
      recompute: [nodes[0], 'Show source values', 'Show written formula', nodes[1], 'Recompute by hand', 'Check same result'],
      access: ['Identify requesting user', 'Check approved scope', 'Apply access boundary', nodes[0], 'Record access decision', 'Test denied cases'],
      egress: [nodes[0], 'Apply network boundary', 'Remove external calls', nodes[1], 'Observe outbound traffic', 'Verify no egress'],
      demo: [nodes[0], 'Choose real test case', nodes[1], 'Show exception case', 'Explain human boundary', 'Ask owner to verify'],
      tiebreak: [nodes[0], 'Compare equal priority', 'Apply written tie rule', 'Show source evidence', 'Check with operator', 'Lock evaluation case'],
      incident: [nodes[0], 'Observe incorrect result', 'Pause affected scope', 'Preserve evidence', 'Reproduce locally', 'Verify corrected rule'],
      leftover: [nodes[0], nodes[1], 'Name unresolved work', 'Keep it visible', 'Assign human owner', 'Agree next action']
    };
    const original=post.diagram;
    const steps=processSteps[caseType] || original?.nodes || nodes;
    const sentences=(post.text || '').split(/(?<=[.!])\s+|\n+/).filter(s=>s&&!s.startsWith('#')&&!s.endsWith('?'));
    const evidence=sentences.find(s=>s.length<=175 && /\b(?:NT-|OUT-|AST-|pay-|evt-|V-)[\w-]+|9 of 10|zero|no consent|read.only/i.test(s));
    spec={layout:architecture?'architecture':'flow',label,nodes:architecture?nodes:steps,detail:evidence || detail,evidence:!!evidence,edges:architecture?[[0,1],[1,2],[3,0],[4,1],[2,5]]:undefined};
  } else {
    const recipe=/model[ -]serving/.test(topic.toLowerCase())
      ? recipes.find((entry)=>entry[2]==='MODEL SERVING PLATFORM')
      : recipes.find(([pattern])=>pattern.test(topic.toLowerCase()));
    if (!recipe) return null;
    const [,layout,label,nodes,detail,edges]=recipe;
    const relationships = {
      'MODEL SERVING PLATFORM': [[0,1],[1,2],[3,1],[4,1],[1,5]],
      'FEATURE STORE BOUNDARIES': [[0,1],[1,2],[1,3],[4,1],[5,2]],
      'MODEL OBSERVABILITY': [[0,1],[1,2],[3,1],[4,1],[5,1]],
      'SERVICE DISCOVERY': [[0,1],[1,2],[3,1],[4,2],[2,5]],
      'INBOUND REQUEST PATH': [[0,1],[1,2],[3,0],[4,1],[2,5]],
      'WORKLOAD TRAFFIC BOUNDARIES': [[0,1],[1,2],[3,1],[4,1],[5,1]],
      'SECRET DELIVERY': [[0,1],[1,2],[3,1],[1,4],[5,1]],
      'REQUEST ADMISSION': [[0,1],[1,2],[3,1],[4,1],[1,5]],
      'PARTITIONED EVENT FLOW': [[0,1],[1,2],[3,0],[2,4],[2,5]],
      'GITOPS PROMOTION': [[0,1],[1,2],[3,1],[4,0],[2,5]],
      'DEVELOPER SELF-SERVICE': [[0,1],[1,2],[3,0],[4,2],[2,5]]
    };
    spec={layout,label,nodes:label==='MODEL SERVING PLATFORM'&&!/gpu/i.test(topic)?nodes.map(n=>n==='GPU node pool'?'Compute node pool':n):nodes,detail:label==='MODEL SERVING PLATFORM'&&!/gpu/i.test(topic)?detail.replace('GPU capacity','compute capacity'):detail,edges:edges || relationships[label]};
  }
  const family=/fde/i.test(post.pillar || '')?'fde':/python/i.test(post.pillar || '')?'python':/mlops/i.test(post.pillar || '')?'ml':/kubernetes/i.test(post.pillar || '')?'platform':'cloud';
  const [accent,pale]=palettes[family];
  return {...spec,accent,pale,icon:spec.layout==='architecture'?'cloud':'gear'};
}
module.exports={contentDiagram};

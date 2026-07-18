import React, { useState } from 'react';
import { Mail, MessageSquare, ExternalLink, Calendar, CheckCircle2, Award, Clock, DollarSign, Send } from 'lucide-react';

interface ContactSchedulerProps {
  email: string;
  topmateUrl: string;
  coffeeUrl: string;
}

export const ContactScheduler: React.FC<ContactSchedulerProps> = ({ email, topmateUrl, coffeeUrl }) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [showFormSuccess, setShowFormSuccess] = useState(false);

  // Calendar scheduler simulator
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlot, setBookedSlot] = useState(false);

  const availableDays = [
    { num: 20, label: 'Mon', full: 'July 20' },
    { num: 21, label: 'Tue', full: 'July 21' },
    { num: 22, label: 'Wed', full: 'July 22' },
    { num: 23, label: 'Thu', full: 'July 23' },
    { num: 24, label: 'Fri', full: 'July 24' }
  ];

  const availableTimes = ['04:00 PM', '05:30 PM', '07:00 PM'];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;
    const subject = encodeURIComponent(`Portfolio inquiry from ${formName}`);
    const body = encodeURIComponent(`${formMsg}\n\n— ${formName} (${formEmail})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setShowFormSuccess(true);
    setFormName('');
    setFormEmail('');
    setFormMsg('');
    setTimeout(() => {
      setShowFormSuccess(false);
    }, 5000);
  };

  const handleBookSlot = () => {
    if (selectedDay === null || !selectedTime) return;
    setBookedSlot(true);
    window.open(topmateUrl, '_blank', 'noopener,noreferrer');
    setTimeout(() => {
      setBookedSlot(false);
      setSelectedDay(null);
      setSelectedTime(null);
    }, 5000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="contact-scheduler-section">
      {/* Contact Form card */}
      <div className="bg-white dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-900 rounded-2xl p-6 flex flex-col justify-between" id="message-form-card">
        <div>
          <h4 className="text-sm font-bold flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            <span>Send a Direct Message</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 mb-4">
            Have a project or platform role? Fill out details, and I will get back to you within 24 hours.
          </p>

          {showFormSuccess ? (
            <div className="p-6 bg-emerald-50/25 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/30 rounded-xl text-center flex flex-col items-center justify-center gap-2 py-10" id="form-success-feedback">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
              <h5 className="text-xs font-bold text-slate-800 dark:text-zinc-200">Opening your email client…</h5>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 max-w-[220px]">
                A message to {email} has been pre-filled. Hit send in your mail app to actually deliver it.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="flex flex-col gap-3.5" id="contact-form">
              <div>
                <label className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-zinc-500">Your Name</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full mt-1 border dark:border-zinc-800 rounded p-2 text-xs bg-slate-50/50 dark:bg-zinc-950/30 outline-none focus:border-indigo-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-zinc-500">Your Email Address</label>
                <input
                  type="email"
                  required
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className="w-full mt-1 border dark:border-zinc-800 rounded p-2 text-xs bg-slate-50/50 dark:bg-zinc-950/30 outline-none focus:border-indigo-500"
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-zinc-500">Your Message / Requirements</label>
                <textarea
                  required
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  rows={4}
                  className="w-full mt-1 border dark:border-zinc-800 rounded p-2 text-xs bg-slate-50/50 dark:bg-zinc-950/30 outline-none focus:border-indigo-500"
                  placeholder="Describe your architecture requirements or scheduling details..."
                />
              </div>

              <button
                type="submit"
                id="submit-message-btn"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-zinc-950 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Secure Message</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Interactive Booking Calendar Simulation */}
      <div className="bg-white dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-900 rounded-2xl p-6 flex flex-col justify-between" id="scheduler-card">
        <div>
          <h4 className="text-sm font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span>Interactive 1:1 Mentoring Scheduler</span>
          </h4>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 mb-4">
            Book a complimentary 15-minute quick technical review or career advice slot with Akhilesh.
          </p>

          {bookedSlot ? (
            <div className="p-6 bg-emerald-50/25 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900/30 rounded-xl text-center flex flex-col items-center justify-center gap-2 py-12" id="booking-success-feedback">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 animate-bounce" />
              <h5 className="text-xs font-bold text-slate-800 dark:text-zinc-200">Opening Topmate to confirm…</h5>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 max-w-[210px] mt-1">
                This preference isn't booked yet — finish picking a real slot on the Topmate calendar that just opened.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {/* Day selection */}
              <div>
                <span className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-zinc-500 block mb-2">
                  Select Calendar Day (July 2026)
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {availableDays.map((d) => (
                    <button
                      key={d.num}
                      type="button"
                      onClick={() => setSelectedDay(d.num)}
                      className={`py-2 rounded-lg border flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                        selectedDay === d.num
                          ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700 dark:border-emerald-500 dark:bg-emerald-950/20 dark:text-emerald-400 font-bold'
                          : 'border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-zinc-950 dark:border-zinc-850 dark:text-zinc-400'
                      }`}
                    >
                      <span className="text-[9px] uppercase tracking-wider opacity-60 font-medium">{d.label}</span>
                      <span className="text-xs font-bold">{d.num}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time selection */}
              <div className={selectedDay === null ? 'opacity-30 pointer-events-none transition-opacity' : 'transition-opacity'}>
                <span className="text-[10px] uppercase font-extrabold text-slate-400 dark:text-zinc-500 block mb-2">
                  Select Available Slot (IST)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {availableTimes.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 rounded-lg border text-[10px] font-bold text-center transition-all cursor-pointer ${
                        selectedTime === time
                          ? 'border-indigo-600 bg-indigo-50/20 text-indigo-700 dark:border-emerald-500 dark:bg-emerald-950/20 dark:text-emerald-400'
                          : 'border-slate-100 bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-zinc-950 dark:border-zinc-850 dark:text-zinc-400'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                id="book-slot-btn"
                disabled={selectedDay === null || !selectedTime}
                onClick={handleBookSlot}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-950 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-40 disabled:pointer-events-none"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Confirm Slot Reservation</span>
              </button>
            </div>
          )}
        </div>

        {/* Third-party profile shortcuts */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <a
            href={topmateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-slate-700 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-emerald-400 flex items-center gap-1 transition-all"
            referrerPolicy="no-referrer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Extended Topmate Mentoring Calendar</span>
          </a>

          <a
            href={coffeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-bold text-slate-700 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-emerald-400 flex items-center gap-1 transition-all"
            referrerPolicy="no-referrer"
          >
            <span>☕ Buy Me a Coffee support</span>
          </a>
        </div>
      </div>
    </div>
  );
};

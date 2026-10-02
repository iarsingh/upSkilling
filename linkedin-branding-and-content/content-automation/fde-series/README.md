# FDE interview series

LinkedIn drafts and spoken interview drills for a Forward Deployed Engineer profile.

These ten posts are on the live calendar in `content-calendar.json` for 5–9 October and 12–16 October 2026. The daily publisher sends one of them at 08:00 Asia/Kolkata on each of those dates, with its PNG. 10 and 11 October stay on the previous series.

The story underneath the posts is the Harborline Freight engagement in `fde-harborline-engagement`: a night desk, a banned external model, a written score, and a metric you refuse to claim.

## Use it this way

1. Read one question in [drill-questions.md](interview/drill-questions.md). Close it.
2. Answer out loud in 90 seconds using the six-beat structure in [how to practice](interview/how-to-practice.md).
3. Check yourself against [scenario-answers.md](interview/scenario-answers.md).
4. Post the matching draft only after the spoken answer is clean.

## Files

| Path | What it is |
| --- | --- |
| [interview/how-to-practice.md](interview/how-to-practice.md) | The six beats every FDE answer should hit |
| [interview/drill-questions.md](interview/drill-questions.md) | 12 scenarios and follow-ups, no answers |
| [interview/scenario-answers.md](interview/scenario-answers.md) | Spoken answers tied to Harborline |
| [fde-content-calendar.json](fde-content-calendar.json) | 10 drafts, weekdays from 2026-10-05 |
| [posts/](posts/) | The LinkedIn text for those 10 days |
| [../assets/](../assets/) | PNG and SVG for each draft, named `*-doodle` |

Regenerate the images after a diagram change:

```bash
cd linkedin-branding-and-content/content-automation
node scripts/render-fde-doodles.js
```

## Draft calendar

| Date | Post | Drill |
| --- | --- | --- |
| 2026-10-05 | Start from the workflow, not the model | Q1 |
| 2026-10-06 | A constraint has to delete a design | Q2 |
| 2026-10-07 | Security bans the model API | Q3 |
| 2026-10-08 | Do not invent the ROI | Q4 |
| 2026-10-09 | The operator overturns the score | Q5 |
| 2026-10-12 | Two stakeholders, one week | Q6 |
| 2026-10-13 | The export is missing a column | Q7 |
| 2026-10-14 | What the audit log refuses to store | Q8 |
| 2026-10-15 | Do not write back to the system of record | Q9 |
| 2026-10-16 | Rollout, rollback, and the stop condition | Q12 |

Q10 (scope cut) and Q11 (they still use the binder) are in the drill and the answer key. They are practice rounds, not posts.

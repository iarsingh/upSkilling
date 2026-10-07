# Carousel calendar

48 seven-page LinkedIn document carousels, published Tuesday and Thursday at 08:00 Asia/Kolkata from 2026-10-08 to 2027-03-23. They replaced the 515 upcoming daily and FDE posts, many of which repeated the same topics.

| Series | Carousels | Accent |
| --- | --- | --- |
| Platform AI Transformation Playbook | 6 | indigo |
| FDE Field Notes | 10 | amber |
| Kubernetes in Production | 8 | cyan |
| DevSecOps & Platform | 8 | green |
| MLOps in Production | 8 | violet |
| Python for Platform Engineers | 4 | yellow |
| Lab Notes (public GitHub labs) | 4 | coral |

Each carousel is a cover, five content slides and a closing slide with the takeaway, a question and the next issue.

## Layout

- `content/<series>.js` holds slide content. Each entry has a title, subtitle, post hook, five slides, a takeaway, three points and a question.
- `plan.js` holds series metadata, spreads series evenly across the calendar and assigns dates.
- `build.js` renders `output/<date>-<series>-<issue>-<slug>.html`, `.pdf` and `-cover.png`, plus `output/index.html`, a contact sheet of every cover.
- `schedule.js` writes `posts/*.md` and replaces upcoming unpublished entries in `../content-calendar.json`.

Slide types: `list`, `flow`, `compare`, `dodont`, `table`, `grid`, `checklist`, `code`, `stats`, `quote`.

## Editing

```bash
cd linkedin-branding-and-content/content-automation/carousels
node build.js --only=requests-limits-and-qos   # re-render one carousel
node build.js                                  # re-render everything (~3 minutes)
node schedule.js                               # dry run
node schedule.js --apply                       # update calendar and posts/
```

Rendering needs Google Chrome; set `CHROME_PATH` if it is not in `/Applications`. Preview a single slide with `output/<file>.html?s=3`.

Re-run `schedule.js --apply` after changing titles, post hooks or the order. It only replaces unpublished entries from the first carousel date onward.

## Publishing

The daily workflow (`.github/workflows/linkedin-daily.yml`) runs `src/publish-calendar-date.js`. Calendar entries with a `documentPath` are uploaded through the LinkedIn Documents API and attached to the post as a swipeable document. Days without a carousel publish nothing.

## Archive

Replaced calendar entries are in `../archive/carousel-consolidation/content-calendar-entries.json`. Their drafts were moved to `../archive/carousel-consolidation/posts/` and `../archive/carousel-consolidation/fde-series/posts/`. The ten hand-written FDE posts stay in `../fde-series/posts/`.

Lab Notes carousels describe public GitHub labs and synthetic datasets. They are labelled as labs, not customer deployments.

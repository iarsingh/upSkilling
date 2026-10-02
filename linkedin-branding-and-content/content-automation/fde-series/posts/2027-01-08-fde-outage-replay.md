---
date: 2027-04-13
slot: 08:00
series: FDE Interview Series
topic: Cedar Grid: the same file run twice
status: scheduled
publish: true
image: ../../assets/2027-01-08-fde-outage-replay-doodle.png
---

Before Cedar Grid trusts the output, I run the same drop twice. OUT-1 scores 112 and ranks above OUT-2, even though OUT-2 affects 400 customers and OUT-1 affects 40.

The second run must not create a second decision, a second count, or a second write. The stop condition is any path that can message a customer.

A tool that only looks right on a fresh file is not ready for their operator.

What must stay identical when the Cedar Grid file is run twice?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep

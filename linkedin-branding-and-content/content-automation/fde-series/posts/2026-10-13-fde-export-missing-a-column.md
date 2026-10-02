---
date: 2026-10-21
slot: 08:00
series: FDE Interview Series
topic: The export is missing a column
drill: Q7
image: ../../assets/2026-10-13-fde-export-missing-a-column-doodle.png
status: scheduled
publish: true
---

The demo is tomorrow. Their nightly file has event timestamps, not the hours-since-checkpoint column the sample scorer expected. One status value has never shown up in the sample: held.

I do not compute the hours quietly and hope nobody asks. Derived is fine. Hidden is not. The formula goes into the readout.

held is not low risk just because I need a demo. Until the lead says whether it behaves like an exception or a normal dwell, those rows stay unscored and visible. A confident wrong band is the failure mode. A named gap is the work.

What do you show when the customer's file does not match the sample?

#ForwardDeployedEngineer #DataEngineering #MLOps #CustomerEngineering #InterviewPrep

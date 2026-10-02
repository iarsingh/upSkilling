---
date: 2027-06-12
slot: 08:00
series: FDE Interview Series
topic: Reloading the storm list must not page anyone
status: scheduled
publish: true
image: ../../assets/2027-01-08-fde-outage-replay-doodle.png
---

Cedar Grid's ranker reloads every few minutes as outages update. OUT-1 staying first is fine. A reload that sent a customer message would be a pager storm.

There is no message path, so reload is safe. I still sat with their network owner and reloaded OUT-1 ten times, watching for an outbound call. The rank changed only when the input changed. The host stayed quiet.

A poll is a retry you did not mean to write. It still counts.

What loop in your design runs often enough to multiply a side effect?

#ForwardDeployedEngineer #Utilities #SRE #IncidentResponse #InterviewPrep

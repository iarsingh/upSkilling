---
date: 2027-01-13
slot: 08:00
series: FDE Interview Series
topic: Reading the note file twice does not double the queue
status: scheduled
publish: true
image: ../../assets/2027-01-05-fde-clinic-replay-doodle.png
---

![Reading the note file twice does not double the queue](../../assets/2027-01-05-fde-clinic-replay-doodle.png)

Northshore's overnight job was restarted and processed the file again. NT-11 must still be one urgent callback, not two phone calls. NT-12 must still be one blocked row.

The route is a function of the note, not of how many times the job woke up. A second run replaces the decision. It does not append. I tested that before she used it at 7am, because a double callback is how a pilot becomes noise.

Idempotent here means one note, one route, however many retries the scheduler needs.

What user-visible action would fire twice if your job retried?

#ForwardDeployedEngineer #Privacy #Healthcare #SRE #InterviewPrep

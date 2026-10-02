---
date: 2027-07-14
slot: 08:00
series: FDE Interview Series
topic: Resubmitting a packet must not accept it
status: scheduled
publish: true
image: ../../assets/2027-01-09-fde-vendor-replay-doodle.png
---

Northline's analyst hit submit twice because the first click spun. V-2 was manual review both times. It did not become ready, and it did not create two review tasks that a tired approver could split.

V-5 stayed blocked on both submits. There is no path where the second click is the override. I want that to be true even if the service times out and the browser retries.

The double click is the test. A state machine that treats the second submit as "they insisted" is an approval you did not design on purpose.

What does a retry mean in your workflow, if the user only meant to check?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep

---
date: 2027-05-23
slot: 08:00
series: FDE Interview Series
topic: Insurance dates arrived as Excel serials
status: scheduled
publish: true
image: ../../assets/2026-11-13-fde-vendor-export-doodle.png
---

Northline's packet dump stored insurance expiry as an Excel serial. Rendered badly, V-4's expired policy looked like it ended in 2027. The analyst would have called it complete.

I showed the raw value, the converted date, and the as-of date of 2 October 2026. V-4 stayed blocked. I did not ship a converter that "looked right" on the two rows I had checked by hand.

A date parse is a control, not a convenience. The eval file now includes the serial that used to look valid.

What conversion in your pipeline can make an expired fact look current?

#ForwardDeployedEngineer #Procurement #Security #SRE #InterviewPrep

---
date: 2027-03-08
slot: 08:00
series: FDE Interview Series
topic: The depot does not call a parts marketplace
status: scheduled
publish: true
image: ../../assets/2027-01-18-fde-parts-egress-doodle.png
---

Helios's night network cannot call a vendor. My first design asked a catalog API for a substitute when B-14 was empty. That call is the thing they will not approve, and a substitute is a part the lead has not signed.

E42 returns the signed SKU and the local bin, or a stockout. E99 returns nothing. I removed the client and had their admin confirm a lookup of AST-7 opened no outside connection. The empty bin stays a stockout a buyer can see in the morning, on their own process.

A substitute from the internet is not a signed part that happened to be online.

What fallback would require a network your customer has already refused?

#ForwardDeployedEngineer #FieldService #SupplyChain #SRE #InterviewPrep

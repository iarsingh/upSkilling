# Duplicate capture refunds

A duplicate capture is a second successful card charge for one order. Refund it from the payments console. This page does not cover ordinary returns.

## Nightly batch close

The card batch closes at 18:00 UTC. A duplicate capture noticed before that close can be voided in the same batch. After 18:00 UTC the capture has settled, so a void is rejected and you must submit a refund. The refund lands in the next batch and posts to the shopper the following business day. Record the order id, both capture ids, and the batch-close time in the ticket.

## Steps

Open the order in the payments console. Select the later capture, not the original. If the console clock is before 18:00 UTC, choose Void. If it is 18:00 UTC or later, choose Refund and use reason code DUP-CAPTURE. Do not edit the amount. Confirm the refund id appears on the order timeline before you close the ticket.

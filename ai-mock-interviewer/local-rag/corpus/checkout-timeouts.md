# Checkout gateway timeouts

Northwind shoppers pay on the checkout page. When the payment gateway is unhealthy, the page keeps a spinner up and the order is not created. This runbook is the first stop for that symptom.

## ERR-4401 on pay-gw-03

ERR-4401 means the checkout service timed out waiting for pay-gw-03, the primary card gateway. The shopper sees a spinner that never finishes, and the edge log shows HTTP 504 from the gateway hop. Do not retry the capture in a loop. Confirm pay-gw-03 health in the gateway console, then fail traffic over to pay-gw-04 if the primary has been failing for more than five minutes. Captures that never received a gateway response are not duplicates. Leave them for the payments on-call to reconcile. A facilities request about badges or parking is unrelated to this code.

## What to tell the shopper

Tell the shopper the payment did not complete and that they should not see a charge. If a charge did appear, follow the duplicate-capture refund runbook instead of this one. Quote the error code ERR-4401 and the host pay-gw-03 in the incident note so the next search can find this page by the exact token.

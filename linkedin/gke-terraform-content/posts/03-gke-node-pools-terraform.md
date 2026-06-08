# Design GKE Node Pools Intentionally

A common GKE mistake:

Putting every workload on one default node pool.

It works at the beginning.

Then production arrives.

Different workloads need different tradeoffs:

- APIs need reliability
- batch jobs need cheaper compute
- system components need isolation
- GPU workloads need special machines
- critical services may need stronger availability rules

Terraform makes this easier to model.

Instead of one generic pool, define node pools by workload intent:

```text
system-pool   -> platform add-ons
app-pool      -> customer-facing services
batch-pool    -> async and scheduled jobs
gpu-pool      -> ML inference or training
```

That gives you cleaner control over:

- machine type
- min and max nodes
- taints and labels
- autoscaling limits
- upgrade strategy
- cost ownership

The goal is not to create too many node pools.

The goal is to avoid pretending all workloads behave the same.

Good platform design starts when infrastructure reflects workload reality.

#GKE #Terraform #Kubernetes #GCP #PlatformEngineering #CloudEngineering


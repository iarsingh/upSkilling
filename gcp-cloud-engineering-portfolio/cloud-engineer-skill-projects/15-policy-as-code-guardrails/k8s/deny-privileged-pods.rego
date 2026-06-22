package kubernetes.admission

deny[msg] {
  input.request.kind.kind == "Pod"
  container := input.request.object.spec.containers[_]
  container.securityContext.privileged == true
  msg := sprintf("Privileged container is not allowed: %s", [container.name])
}


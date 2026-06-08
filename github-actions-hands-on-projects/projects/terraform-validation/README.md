# Terraform Validation Project

## Goal

Practice GitHub Actions checks for Terraform formatting and validation.

## Local Run

```bash
cd terraform
terraform init -backend=false
terraform fmt -check -recursive
terraform validate
```


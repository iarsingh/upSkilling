{{- define "incident-copilot.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "incident-copilot.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "incident-copilot.name" .) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

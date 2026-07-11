# Jenkins controller pre-loaded with every CLI the pipeline needs, so the
# Jenkinsfile doesn't have to install tooling mid-build. Docker access is
# "Docker-outside-of-Docker": docker.sock is bind-mounted at runtime
# (see docker-compose.yml) rather than running a nested Docker daemon.
FROM jenkins/jenkins:lts-jdk17

USER root

ARG TARGETARCH
ENV KUBECTL_VERSION=v1.30.2 \
    ISTIO_VERSION=1.30.2 \
    TERRAFORM_VERSION=1.9.5

RUN apt-get update && apt-get install -y --no-install-recommends \
      curl ca-certificates gnupg unzip python3 python3-pip python3-venv \
    && install -m 0755 -d /etc/apt/keyrings \
    && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian bookworm stable" \
         > /etc/apt/sources.list.d/docker.list \
    && apt-get update && apt-get install -y --no-install-recommends docker-ce-cli \
    && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL -o /usr/local/bin/kubectl \
      "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/${TARGETARCH}/kubectl" \
    && chmod +x /usr/local/bin/kubectl

RUN curl -fsSL -o /usr/local/bin/minikube \
      "https://storage.googleapis.com/minikube/releases/latest/minikube-linux-${TARGETARCH}" \
    && chmod +x /usr/local/bin/minikube

RUN curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

RUN curl -fsSL https://istio.io/downloadIstio | ISTIO_VERSION=${ISTIO_VERSION} sh - \
    && mv istio-${ISTIO_VERSION}/bin/istioctl /usr/local/bin/istioctl \
    && rm -rf istio-${ISTIO_VERSION}

RUN TF_ARCH=${TARGETARCH} && \
    curl -fsSL -o /tmp/terraform.zip \
      "https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_${TF_ARCH}.zip" \
    && unzip -o /tmp/terraform.zip -d /usr/local/bin && rm /tmp/terraform.zip

RUN pip3 install --break-system-packages --no-cache-dir ansible kubernetes \
    && ansible-galaxy collection install kubernetes.core

# Pre-install the Jenkins plugins the Jenkinsfile/JCasC config needs
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

# JCasC seed config: defines the quiz-pipeline job automatically on first boot
COPY casc.yaml /var/jenkins_home/casc.yaml
ENV CASC_JENKINS_CONFIG=/var/jenkins_home/casc.yaml
ENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"

USER jenkins

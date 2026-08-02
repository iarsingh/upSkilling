FROM jenkins/jenkins:lts-jdk21

ARG TARGETARCH
ARG KUBECTL_VERSION=v1.36.1

USER root

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl git \
    && rm -rf /var/lib/apt/lists/* \
    && curl -fL --retry 5 --connect-timeout 15 --max-time 180 \
        -o kubectl "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/${TARGETARCH}/kubectl" \
    && curl -fL --retry 5 --connect-timeout 15 --max-time 60 \
        -o kubectl.sha256 "https://dl.k8s.io/release/${KUBECTL_VERSION}/bin/linux/${TARGETARCH}/kubectl.sha256" \
    && echo "$(cat kubectl.sha256)  kubectl" | sha256sum --check \
    && install -m 0755 kubectl /usr/local/bin/kubectl \
    && rm -f kubectl kubectl.sha256

USER jenkins

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

COPY docker-jenkins-init.groovy /usr/share/jenkins/ref/init.groovy.d/10-multibranch.groovy

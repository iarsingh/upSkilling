import hudson.security.FullControlOnceLoggedInAuthorizationStrategy
import hudson.security.HudsonPrivateSecurityRealm
import jenkins.branch.BranchSource
import jenkins.model.Jenkins
import jenkins.plugins.git.GitSCMSource
import org.jenkinsci.plugins.workflow.multibranch.WorkflowBranchProjectFactory
import org.jenkinsci.plugins.workflow.multibranch.WorkflowMultiBranchProject

def jenkins = Jenkins.get()
def adminUser = System.getenv("JENKINS_ADMIN_USER") ?: "admin"
def adminPassword = System.getenv("JENKINS_ADMIN_PASSWORD")

if (!adminPassword) {
    throw new IllegalStateException("JENKINS_ADMIN_PASSWORD must be configured")
}

if (!(jenkins.securityRealm instanceof HudsonPrivateSecurityRealm)) {
    def realm = new HudsonPrivateSecurityRealm(false)
    realm.createAccount(adminUser, adminPassword)
    jenkins.securityRealm = realm

    def authorization = new FullControlOnceLoggedInAuthorizationStrategy()
    authorization.setAllowAnonymousRead(false)
    jenkins.authorizationStrategy = authorization
    jenkins.save()
}

def jobName = "docker-multibranch"
if (jenkins.getItem(jobName) == null) {
    def project = jenkins.createProject(WorkflowMultiBranchProject, jobName)
    project.description = "Docker-hosted Jenkins multibranch pipeline"

    def source = new GitSCMSource(
        "github-upskilling-source",
        "https://github.com/iarsingh/upSkilling.git",
        "",
        "*",
        "",
        false
    )
    project.sourcesList.add(new BranchSource(source))

    def factory = new WorkflowBranchProjectFactory()
    factory.scriptPath = "cicd-pipeline-jenkins-terraform-ansible-k8s/Jenkinsfile"
    project.projectFactory = factory
    project.save()
    project.scheduleBuild2(0)
}

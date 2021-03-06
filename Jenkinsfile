
pipeline {
  environment {
    dockerImage = ''
      registry = "hieu1501/demo"
      registryCredential = 'dockerhub-id-password'
      githubCredential = 'github-credential'
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        checkout scm
      }
    }
    stage('Gradle build') {
        steps {
            sh 'gradle build'
        }
    }
    stage('Build Image') {
        when {
            branch 'master'
        }
        steps{
            script {
                dockerImage = docker.build registry + ":$BUILD_NUMBER"
            }
        }
    }
    stage('Deploy Image') {
        when { branch 'master' }
        steps {
            script {
                docker.withRegistry( '', registryCredential ) {
                    dockerImage.push("latest")
                }
            }
        }
    }
    stage('Remove Unused docker image') {
        when { branch 'master' }
        steps {
            sh "docker rmi $registry:$BUILD_NUMBER"
        }
    }
  }
}


pipeline {
  environment {
    dockerImage = ''
      registry = "hieu1501/demo"
      registryCredential = 'dockerhub'
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/hieunguyenbbr1501/Demo.git'
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
                    dockerImage.push()
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
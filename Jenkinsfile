
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
    stage('Build Image') {
            if (env.BRANCH_NAME == "master") {
                dockerImage = docker.build("demo")
            }
    }
    stage('Deploy Image') {
              if (env.BRANCH_NAME == "master") {
                  docker.withRegistry(registryCredential) {
                          dockerImage.push()
                  }
              }
    }
    stage('Remove Unused docker image') {
        if (env.BRANCH_NAME == "master") {
            sh "docker rmi $registry:$BUILD_NUMBER"
        }
    }
  }
}
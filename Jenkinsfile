environment {
  dockerImage = ''
  registry = "hieu1501/demo"
  registryCredential = 'dockerhub'

}

node {
  stage('SCM checkout') {
    git 'https://github.com/hieunguyenbbr1501/Demo.git'
  }
  
  stage('Gradle Build') {
    if (isUnix()) {
        sh 'gradle build'
    } else {
        bat 'gradlew.bat clean build'
    }
  }

  stage('Build Image') {
    if (env.BRANCH_NAME == "master") {
        dockerImage = docker.build registry + ":$BUILD_NUMBER"
        dockerImage.push()
    }
  }

  stage('Remove Unused docker image') {
    steps{
      sh "docker rmi $registry:$BUILD_NUMBER"
    }
  }

}

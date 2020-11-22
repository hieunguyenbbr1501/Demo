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
    steps {
        if (env.BRANCH_NAME == "master") {
            script {
            dockerImage = docker.build registry + ":$BUILD_NUMBER"
            }
        }
    }
  }

  stage('Deploy Image') {
      steps {
          if (env.BRANCH_NAME == "master") {
              script {
              docker.withRegistry( '', registryCredential ) {
                      dockerImage.push()
                    }
              }
          }
      }
    }

  stage('Remove Unused docker image') {
    steps{
      sh "docker rmi $registry:$BUILD_NUMBER"
    }
  }

}

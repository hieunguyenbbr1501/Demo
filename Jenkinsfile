node{
  stage('SCM checkout') {
    git 'https://github.com/hieunguyenbbr1501/Demo.git'
  }
  
  stage('Gradle Build') {
    if (isUnix()) {
        sh './gradlew clean build'
    } else {
        bat 'gradlew.bat clean build'
    }
  }
  
}
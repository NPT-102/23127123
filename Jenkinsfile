pipeline {
  agent any

  stages {
    stage('Install & Build') {
      steps {
        npm install
        npm run build
      }
    }

    stage('Build Docker Image') {
      steps {
        docker build -t npt102/23127123 .
      }
    }

    stage('Push Docker Hub') {
      steps {
        docker push npt102/23127123
      }
    }

    stage('Deploy to Server') {
      steps {
        docker run -d -p 3000:3000 npt102/23127123
      }
    }
  }
}

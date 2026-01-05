pipeline {
    agent any

    environment {
        NEXT_PUBLIC_GIT_COMMIT = "${env.GIT_COMMIT}"
    }

    stages {
        stage('Install & Build') {
           steps {
                dir('web') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t npt102/23127123 .'
            }
        }

        stage('Push Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat 'docker login -u %DOCKER_USER% -p %DOCKER_PASS%'
                    bat 'docker push npt102/23127123'
                }
            }
        }

        stage('Deploy to Container') {
            steps {
                bat 'docker rm -f ci-cd-app || exit 0'
                bat 'docker run -d -p 3000:3000 --name ci-cd-app npt102/23127123'
            }
        }
    }
}

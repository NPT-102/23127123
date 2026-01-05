pipeline {
    agent any

    environment {
        DOCKER_USER = "23127123"
        IMAGE_NAME = "23127123"
    }

    stages {
        stage('Clone') {
            steps {
                git 'https://github.com/NPT-102/23127123.git'
            }
        }

        stage('Install & Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_USER/$IMAGE_NAME .'
            }
        }

        stage('Push Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push $DOCKER_USER/$IMAGE_NAME'
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                sshagent(['deploy-server-credentials']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no user@server '
                            docker pull $DOCKER_USER/$IMAGE_NAME &&
                            docker stop app || true &&
                            docker rm app || true &&
                            docker run -d --name app -p 80:3000 $DOCKER_USER/$IMAGE_NAME
                        '
                    '''
                }
            }
        }
    }
}

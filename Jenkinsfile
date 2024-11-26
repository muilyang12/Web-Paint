pipeline {
    agent any

    stages {
        stage("Checkout") {
            steps {
                git url: "git://github.com/muilyang12/Web-Paint.git", branch: "main"
            }
        }

        stage("Set Gradle Wrapper Permissions") {
            steps {
                dir("webpaint-be") {
                    sh "chmod +x gradlew"
                }
            }
        }


        stage("Build") {
            steps {
                dir("webpaint-be") {
                    sh "./gradlew clean build"
                }
            }
        }

        stage("Docker Build") {
            steps {
                dir("webpaint-be") {
                    sh "docker build -t webpaint-be ."
                }
            }
        }

        stage("Deploy") {
            steps {
                sh "docker run -d -p 8080:8080 webpaint-be"
            }
        }
    }
}
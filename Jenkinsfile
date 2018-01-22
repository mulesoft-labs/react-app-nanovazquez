#!/usr/bin/env groovy

def name                = 'react-app'
def usePrivateRegistry  = true
def packagePath         = 'dist'

node {
  stage('Set NPM configuration') {
    env.NPM_CONFIG_PRODUCTION = false
    env.NODE_ENV = 'dev'
  }

  buildpackBuild(
    name: name,
    usePrivateRegistry: usePrivateRegistry,
    packagePath: packagePath
  ) {

    stage('Validate syntax') {
      sh 'bash run.sh npm run lint'
    }

    stage('Run tests') {
      sh 'bash run.sh npm run coverage'
    }

    stage('Report coverage') {
      // Replace absolute paths in lcov file with relative paths
      sh 'bash run.sh sed -i "s|SF:${PWD}/|SF:|g" coverage/lcov.info'

      // Report coverage to Sonar
      sonarScan{ }
    }

    stage('Build artifact') {
      sh 'bash run.sh npm run build'
    }
  }
}

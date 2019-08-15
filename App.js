/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import httpBridge from 'react-native-http-bridge'

const startServer = () => {
  httpBridge.stop()
  httpBridge.start(5432, 'Service', request => {
    console.log('bridge', request)
    if (request.type === 'GET' && request.url.split('/')[1] === 'users') {
      console.log('GET OK')
      httpBridge.respond(request.requestId, 200, 'application/json', '{"message": "OK"}');
    } else {
      console.log('GET BAD')
      httpBridge.respond(request.requestId, 400, 'application/json', '{"message": "Bad Request"}');
    }
  })
}

export default class App extends Component<Props> {
  constructor(props) {
  super(props)
  }

  componentWillMount() {
    startServer()
  }
  
  componentWillUnmount() {
    httpBridge.stop();
  }

  render() {

    return (
      <View>
        <Text>
          test
        </Text>
      </View>
    )
  }
}

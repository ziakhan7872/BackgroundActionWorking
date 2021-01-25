import React, {Component} from 'react';
import {Platform, TouchableOpacity, Text, View, Linking} from 'react-native';
import BackgroundJob from 'react-native-background-job';
import SmsRead from './src/SmsRead';
import axios from 'axios';

const backgroundJob = {
  jobKey: 'myJob',
  job: async () => {
    try {
      let res = await axios.get('http://192.168.10.6:3300/AllStudents');
      console.log(res.data[0].message);
      if (res.data[0].message == 'Close') {
        Linking.openURL('www.youtube.com');
        console.log('openApp');
      }
    } catch (e) {
      console.log(e);
    }
  },
};

BackgroundJob.register(backgroundJob);

export default function App() {
  const startJob = () => {
    BackgroundJob.schedule({
      jobKey: 'myJob',
      period: 500,
      exact: true,
      allowExecutionInForeground: true,
    });
  };

  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={startJob}>
        <Text style={{margin: 30}}>Start</Text>
        <SmsRead />
      </TouchableOpacity>
    </View>
  );
}

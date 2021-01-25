import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  BackHandler,
  Linking,
} from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

async function requestReadSmsPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      {
        title: 'Auto Verification OTP',
        message: 'need access to read sms, to verify OTP',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('sms read permissions granted', granted);
    } else {
      console.log('sms read permissions denied', denied);
    }
  } catch (err) {
    console.warn(err);
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.SMSReadSubscription = {};
  }

  componentDidMount() {
    requestReadSmsPermission();
    console.log('sup dude');
    this.SMSReadSubscription = SmsListener.addListener((message) => {
      console.log('Message:', message);
      console.log('Messagebody:', message.body);
      if (message.body == 'Close') {
        BackHandler.exitApp();
      }
      //   else if (message.body == 'Open') {
      //     Linking.openURL('com.backgroundaction');
      //     console.log('zia testing');
      //   }
      //message.body will have the message.
      //message.originatingAddress will be the address.
    });
  }

  componentWillUnmount() {
    //remove listener
    this.SMSReadSubscription.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello There</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

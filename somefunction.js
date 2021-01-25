import {StyleSheet, View, Text, BackHandler, Linking} from 'react-native';
export default function performTask() {
  fetch('http://192.168.10.6:3300/AllStudents')
    .then((response) => response.json())
    .then(async (data) => {
      console.log('ZZ =', data[0].message);
      if (data[0].message == 'open') {
        console.log('zia');
        // Linking.openURL('https://google.com');
      }
    });
}

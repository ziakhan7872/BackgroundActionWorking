import React from 'react';
import {StyleSheet, View, Text, Linking, TouchableOpacity} from 'react-native';
import BackgroundService from 'react-native-background-actions';
import performTask from './somefunction';
import SmsRead from './src/SmsRead';

const veryIntensiveTask = async (taskDataArguments) => {
  // Example of an infinite loop task
  const {delay} = taskDataArguments;
  await new Promise((resolve) => {
    console.log('This is 1');
    window.setTimeout(() => {
      console.log('This is 2');
    }, 1000);
    console.log('This is 3');
    window.setTimeout(() => {
      performTask();
    }, 1000);
  });
};

const options = {
  taskName: 'Background',
  taskTitle: 'Service Running...!',
  taskDesc: 'Background Job...!',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  //linkingURI: Linking.openURL('com.backgroundaction'),
  parameters: {
    delay: 1000,
  },
};

class App extends React.Component {
  componentDidMount() {
    this.startService();
  }

  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
    };
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={[
            styles.touchStyle,
            {
              backgroundColor: this.state.isCheck ? '#DC7633' : 'skyblue',
              width: this.state.isCheck ? 130 : 100,
            },
          ]}
          onPress={() => this.startService()}>
          <Text>Start Service</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.touchStyle,
            {marginTop: 10, backgroundColor: 'lightgreen'},
          ]}
          onPress={() => this.stopService()}>
          <Text>Stop Service</Text>
        </TouchableOpacity>

        <SmsRead />
      </View>
    );
  }

  startService = async () => {
    this.setState({isCheck: true});
    await BackgroundService.start(veryIntensiveTask, options);
    await BackgroundService.updateNotification({
      taskDesc: 'Define your task hear',
    }); // Only Android, iOS will ignore this call
  };

  stopService = async () => {
    this.setState({isCheck: false});
    await BackgroundService.stop();
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchStyle: {
    width: 100,
    height: 50,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;

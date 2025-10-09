import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import InCallManager from 'react-native-incall-manager';

export default function App() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);

  const startCall = () => {
    try {
      InCallManager.start({ media: 'audio' });
      setIsCallActive(true);
      Alert.alert('Call Started', 'InCall Manager has been activated');
    } catch (error) {
      Alert.alert('Error', 'Failed to start call: ' + error.message);
    }
  };

  const stopCall = () => {
    try {
      InCallManager.stop();
      setIsCallActive(false);
      setIsSpeakerOn(false);
      Alert.alert('Call Ended', 'InCall Manager has been deactivated');
    } catch (error) {
      Alert.alert('Error', 'Failed to stop call: ' + error.message);
    }
  };

  const toggleSpeaker = () => {
    try {
      const newSpeakerState = !isSpeakerOn;
      InCallManager.setSpeakerphoneOn(newSpeakerState);
      setIsSpeakerOn(newSpeakerState);
      Alert.alert('Speaker', newSpeakerState ? 'Speaker ON' : 'Speaker OFF');
    } catch (error) {
      Alert.alert('Error', 'Failed to toggle speaker: ' + error.message);
    }
  };

  const turnScreenOn = () => {
    try {
      InCallManager.turnScreenOn();
      Alert.alert('Screen', 'Screen turned ON');
    } catch (error) {
      Alert.alert('Error', 'Failed to turn screen on: ' + error.message);
    }
  };

  const turnScreenOff = () => {
    try {
      InCallManager.turnScreenOff();
      Alert.alert('Screen', 'Screen turned OFF');
    } catch (error) {
      Alert.alert('Error', 'Failed to turn screen off: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>InCall Manager Example</Text>
      <Text style={styles.subtitle}>
        Test the react-native-incall-manager integration
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isCallActive ? styles.activeButton : styles.inactiveButton]}
          onPress={isCallActive ? stopCall : startCall}
        >
          <Text style={styles.buttonText}>
            {isCallActive ? 'Stop Call' : 'Start Call'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, isSpeakerOn ? styles.activeButton : styles.inactiveButton]}
          onPress={toggleSpeaker}
          disabled={!isCallActive}
        >
          <Text style={[styles.buttonText, !isCallActive && styles.disabledText]}>
            {isSpeakerOn ? 'Speaker ON' : 'Speaker OFF'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.screenButton]}
          onPress={turnScreenOn}
        >
          <Text style={styles.buttonText}>Turn Screen ON</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.screenButton]}
          onPress={turnScreenOff}
        >
          <Text style={styles.buttonText}>Turn Screen OFF</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Call Status: {isCallActive ? 'Active' : 'Inactive'}
        </Text>
        <Text style={styles.statusText}>
          Speaker: {isSpeakerOn ? 'ON' : 'OFF'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#34C759',
  },
  inactiveButton: {
    backgroundColor: '#007AFF',
  },
  screenButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0.5,
  },
  statusContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    width: '100%',
    maxWidth: 300,
  },
  statusText: {
    fontSize: 16,
    marginVertical: 2,
    textAlign: 'center',
  },
});
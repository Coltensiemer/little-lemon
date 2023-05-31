import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, Avatar, TextInput, Switch } from 'react-native-paper';
import FullName from '../Atoms/FullName';
import LastName from '../Atoms/LastName';

export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={[styles.imageContainer, { flex: 1 }]}>
        <Avatar.Image source={null} />
        <Button
          style={{ width: 200, height: 50 }}
          icon='camera'
          mode='contained'
          onPress={() => console.log('Pressed')}
        >
          Change Picture
        </Button>
      </View>
      <View style={{ flex: 1, columnGap: 10 }}>
        <TextInput label='First Name' value={null} onChangeText={null} />
        <TextInput label='Last Name' value={null} onChangeText={null} />
      </View>
      <View style={styles.notificationContainer}>
        <Text> Notifications </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}> Order Statues
            <Switch
              style={styles.switch}
              value={false}
              onValueChange={null}
            ></Switch>
          </Text>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}> Special Offers
            <Switch
              style={styles.switch}
              value={false}
              onValueChange={null}
            ></Switch>
          </Text>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}> News Letter 
            <Switch
              style={styles.switch}
              value={false}
              onValueChange={null}
            ></Switch>
          </Text>
        </View>
      </View>
      <Button  mode='contained' onPress={() => console.log('Pressed')}>
        Log Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },

  imageContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  notificationContainer: {
    flex: 3,
	justifyContent: 'center',
	alignItems: 'center'
  },
  switchContainer: { 


	
  },
  switchText: {
paddingRight: 50,

	
  },
  switch: {
	
    
  },
});

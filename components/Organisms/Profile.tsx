import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button, Avatar, TextInput, Switch, Divider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {

  const [imageUri, setImageUri] = useState<null>(null);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containContainer}
    >
      <View style={[styles.imageContainer, {}]}>
        <Avatar.Image
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            width: 128,
            height: 128,
          }}
          source={{ uri: imageUri }}
        />
        <Button
          style={{
            width: 200,
            height: 50,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 20,
          }}
          icon='camera'
          mode='contained'
          onPress={pickImage}
        >
          Change Picture
        </Button>
      </View>
      <View>
        <TextInput style={{margin: 5, height: 40}} label='First Name' value={null} onChangeText={null} />
        <TextInput style={{margin: 5, height: 40}} label='Last Name' value={null} onChangeText={null} />
        <TextInput style={{margin: 5, height: 40}} label='Email' value={null} onChangeText={null} />
      </View>
      <View style={styles.notificationContainer}>
        <Text> Notifications </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {' '}
            Order Statues
            <Switch
              style={styles.switch}
              value={false}
              onValueChange={null}
            ></Switch>
          </Text>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {' '}
            Special Offers
            <Switch
              style={styles.switch}
              value={false}
              onValueChange={null}
            ></Switch>
          </Text>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {' '}
            News Letter
            <Switch
              style={styles.switch}
              value={false}
              onValueChange={null}
            ></Switch>
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <Button mode='elevated' onPress={() => console.log('Pressed')}>
          Discard Changes
        </Button>
        <Button mode='contained-tonal' onPress={() => console.log('Pressed')}>
          Save Changes
        </Button>
      </View>

      <Divider />
      <Button
        style={{
          flex: 1,
          margin: 10,
          width: 200,
          height: 50,
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        mode='contained'
        onPress={() => console.log('Pressed')}
      >
        Log Out
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '20%',
    width: '80%',
    alignSelf: 'center',
  },
  containContainer: {
    justifyContent: 'center',
  },

  imageContainer: {
    flexDirection: 'column',
    alignItems: null,
    margin: 20,
  },
  notificationContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 48,
  },
  switchContainer: {
    // Adjust the space for Notifications
  },
  switchText: {
    paddingRight: 50,
  },
  switch: {},
});

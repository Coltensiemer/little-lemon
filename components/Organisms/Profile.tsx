import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { Button, Avatar, TextInput, Switch, Divider } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';


export default function Profile({ navigation }) {
    //@ts-ignore
  const { logOut, isUserData } = useContext(AuthContext);

  const [imageUri, setImageUri] = useState<any>(null);
  const [imageBoolean, setImageBoolean] = useState<boolean>(false);

  const [editedFirstName, setEditedFirstName] = useState(isUserData?.user?.first_name);
  const [editedLastName, setEditedLastName] = useState(isUserData?.user?.last_name);
  
  



  useEffect(() => {
    const requestMediaLibraryPermissionsAsync = async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission Denied');
        }
      }
    };
    requestMediaLibraryPermissionsAsync();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    //@ts-ignore
    if (!result.cancelled) {
      //@ts-expect-error
      setImageUri(result.uri);
      setImageBoolean(true);
    } else {
      alert('You did not select any image.');
    }
  };


  //store all changes into a new state. 

  //On save changes, all change inputs are updated
//text input will update

const handleChanges = async () => { 

  try {
    const formData = { 
      first_name: editedFirstName,
      last_name: editedLastName,
      email: isUserData?.user?.email
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const response = await fetch('http://localhost:3100/updateUserfirstandlastname', options)
    console.log("changes updated")
  } catch (error) {
    console.log("error trying to update first and last name:", error)
    
  }

}



// Discards any changes 
const handleDiscardChanges = () => { 
  setEditedFirstName(isUserData?.user?.first_name)
  setEditedLastName(isUserData?.user?.last_name)
}



  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containContainer}
    >
      <View style={[styles.imageContainer, {}]}>
        <Image
          source={
            imageBoolean
              ? { uri: imageUri }
              : require('../../assets/account.png')
          }
          style={{ width: 120, height: 120, alignSelf: 'center' }}
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
        <TextInput
          style={{ margin: 5, height: 40 }}
          value={editedFirstName}
          onChangeText={setEditedFirstName}
        />
        <TextInput
          style={{ margin: 5, height: 40 }}
          value={editedLastName}
          onChangeText={null}
        />
     
      </View>
      <View style={styles.notificationContainer}>
        <Text> Notifications </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {' '}
           Dark Mode
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
        <Button mode='elevated' onPress={() => handleDiscardChanges()}>
          Discard Changes
        </Button>
        <Button mode='contained-tonal' onPress={() => handleChanges()}>
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
        onPress={() => {
          logOut();
          navigation.navigate('HomeScreen');
        }}
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

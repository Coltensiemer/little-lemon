import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Image,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { Button, Avatar, TextInput, Switch, Divider, useTheme, Text} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';



export default function Profile({ navigation }) {
    //@ts-ignore
  const { logOut, isUserData, userSettings } = useContext(AuthContext);

  const [imageUri, setImageUri] = useState<any>(null);
  const [imageBoolean, setImageBoolean] = useState<boolean>(false);
  const [disableChanges, setDisableChanges] = useState<boolean>(true)

  const [editedFirstName, setEditedFirstName] = useState(isUserData?.isUserData?.first_name);
  const [editedLastName, setEditedLastName] = useState(isUserData?.isUserData?.last_name);

  const [editDarkMode, setEditDarkMode] = useState(isUserData?.isUserData.darkmode)
  const [editSpecialOffers, setSpecialOffers] = useState(isUserData?.isUserData.specialOffers)
  const [editNewsLetter, setNewsLetter] = useState(isUserData?.isUserData.newsletters)
  
  const theme = useTheme();



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
      email: isUserData?.user?.email,
      dark_mode: editDarkMode,
      special_offer: editSpecialOffers,
      newsletters: editNewsLetter,

    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    const response = await fetch('http://localhost:3100/updateUserfirstandlastname', options)
    console.log("First name and last name updated")


    const notificationsResponse = await fetch('http://localhost:3100/post_user_settings', options)
    console.log("Notifications updated")
    
try {
  console.log("Getting update user info successful")
} catch (error) {
 console.log("error with GET updated user info") 
}
  } catch (error) {
    console.log("error trying to update first and last name:", error)
    
  }

}



// Discards any changes 
const handleDiscardChanges = () => { 
  setEditedFirstName(isUserData?.user?.first_name)
  setEditedLastName(isUserData?.user?.last_name)
  setEditDarkMode(isUserData?.user?.dark_mode)
  setNewsLetter(isUserData?.user?.editNewsLetter)
  setSpecialOffers(isUserData?.user?.editSpecialOffers)
}



  return (
    <ScrollView
      style={{  
       flex: 1,
        backgroundColor: theme.colors.background
    }}
      contentContainerStyle={null}
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
      <View style={{padding: 10}}>
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
         
        <Text style={{padding: 10}}> Notifications </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {' '}
           Dark Mode
           </Text>
            <Switch
              style={styles.switch}
              value={editDarkMode}
              onValueChange={() => {setEditDarkMode(!editDarkMode)}}
            ></Switch>
      
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {' '}
            Special Offers
            </Text>
            <Switch
              style={styles.switch}
              value={editSpecialOffers}
              onValueChange={() => {setSpecialOffers(!editSpecialOffers)}}
            ></Switch>
         
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>
            {' '}
            News Letter
            </Text>
            <Switch
              style={styles.switch}
              value={editNewsLetter}
              onValueChange={() => {setNewsLetter(!editNewsLetter)}}
            ></Switch>
     
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 10 }}>
        <Button mode='outlined' style={{backgroundColor: theme.colors.onSecondaryContainer}} onPress={() => handleDiscardChanges()}>
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


  containContainer: {
    justifyContent: 'center',
  },

  imageContainer: {
    flexDirection: 'column',
    alignItems: null,
  
  },
  notificationContainer: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,

  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '80%',
    marginBottom: 20
  },
  switchText: {
    paddingRight: 50,
  },
  switch: {},
});

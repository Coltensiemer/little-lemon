import { ScrollView, StyleSheet, View, Platform, Image } from 'react-native';
import React, { useEffect, useState, useContext, useReducer } from 'react';
import {
  Button,
  Avatar,
  TextInput,
  Switch,
  Divider,
  useTheme,
  Text,
} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../../context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import {
  ProfileState,
  ProfileReducer,
  ReducerAction,
  init,
} from '../../context/ProfileReducer';

export default function Profile({ navigation }) {
  //@ts-ignore
  const { logOut, isUserData, updateUser } = useContext(AuthContext);

  const INITIAL_StateProfile: ProfileState = {
    first_name: isUserData?.isUserData?.first_name,
    last_name: isUserData?.isUserData?.last_name,
    dark_mode: isUserData?.isUserData?.dark_mode,
    special_offers: isUserData?.isUserData?.special_offers,
    news_letters: isUserData?.isUserData?.newsletters,
  };

  const [stateProfile, dispatchProfile] = useReducer(
    ProfileReducer,
    INITIAL_StateProfile,
    init
  );

  const [imageUri, setImageUri] = useState<any>(null);
  const [imageBoolean, setImageBoolean] = useState<boolean>(false);
  const [disableChanges, setDisableChanges] = useState<boolean>(true);

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

  const handleChanges = async () => {
    try {
      const formData = {
        first_name: stateProfile.first_name,
        last_name: stateProfile.last_name,
        email: isUserData?.isUserData?.email,
        dark_mode: stateProfile.dark_mode,
        special_offer: stateProfile.special_offers,
        newsletters: stateProfile.special_offers,
      };
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      };

      const response = await fetch(
        'http://localhost:3100/updateUserfirstandlastname',
        options
      );
      console.log('First name and last name updated');

      const notificationsResponse = await fetch(
        'http://localhost:3100/post_user_settings',
        options
      );
      console.log('Notifications updated');

      await updateUser(formData);

      try {
        console.log('Getting update user info successful');
      } catch (error) {
        console.log('error with GET updated user info');
      }
    } catch (error) {
      console.log('error trying to update first and last name:', error);
    }
  };

  // Discards any changes
  const handleDiscardChanges = () => {
    dispatchProfile({
      type: ReducerAction.resetProfile,
      payload: INITIAL_StateProfile,
    });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
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
      <View style={{ padding: 10 }}>
        <TextInput
          style={{ margin: 5, height: 40 }}
          value={stateProfile.first_name}
          onChangeText={(e) => {
            dispatchProfile({ type: ReducerAction.setFirstName, payload: e });
          }}
        />
        <TextInput
          style={{ margin: 5, height: 40 }}
          value={stateProfile.last_name}
          onChangeText={(e) => {
            dispatchProfile({ type: ReducerAction.setLastName, payload: e });
          }}
        />
      </View>
      <View style={styles.notificationContainer}>
        <Text style={{ padding: 10 }}> Notifications </Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}> Dark Mode</Text>
          <Switch
            style={styles.switch}
            value={stateProfile.dark_mode}
            onValueChange={(e) => {
              dispatchProfile({
                type: ReducerAction.setDarkMode,
                payload: !stateProfile.dark_mode,
              });
              handleChanges();
            }}
          ></Switch>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}> Special Offers</Text>
          <Switch
            style={styles.switch}
            value={stateProfile.special_offers}
            onValueChange={(e) =>
              dispatchProfile({
                type: ReducerAction.setSpecialOffers,
                payload: !stateProfile.special_offers,
              })
            }
          ></Switch>
        </View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}> News Letter</Text>
          <Switch
            style={styles.switch}
            value={stateProfile.news_letters}
            onValueChange={(e) =>
              dispatchProfile({
                type: ReducerAction.setNewsLetters,
                payload: !stateProfile.news_letters,
              })
            }
          ></Switch>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}
      >
        <Button mode='outlined' onPress={() => handleDiscardChanges()}>
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
    marginBottom: 20,
  },
  switchText: {
    paddingRight: 50,
  },
  switch: {},
});

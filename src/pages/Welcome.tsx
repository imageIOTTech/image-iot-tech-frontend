import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/MainNavigator';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/Store';
import { loginSuccess } from '../store/authSlice';

type WelcomeScreenProp = StackNavigationProp<MainStackParamList, "Login">;

type WelcomeProps = {
  navigation: WelcomeScreenProp;
}

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {

  const dispatch = useDispatch<AppDispatch>();

  const handleGuest = () => {
    navigation.navigate('Edit');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxLogo}>
        <Text style={styles.txtLogo}>IOTTech</Text>
      </View>
      <View style={styles.boxTitle}>
        <Text style={styles.txtTitle}>Sign In</Text>
        <Text style={styles.txtSubTitle}>It's easier to sign in now</Text>
      </View>
      <View style={styles.boxButton}>
        <TouchableOpacity
          onPress={handleLogin}
          style={[
            styles.btn,
            {
              height: 60,
              width: '100%',
            }
          ]}>
          <Text style={styles.textBtn}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleGuest}
          style={[
            styles.btn,
            {
              height: 50,
              width: '80%',
            }
          ]}>
          <Text style={styles.textBtn}>Guest</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.boxOtherLogin}>
        <View style={styles.boxLine}>
          <View style={styles.line}></View>
          <Text style={styles.textOr}></Text>
          <View style={styles.line}></View>
        </View>
        <View style= {styles.boxBtnOtherLogin}>
            <TouchableOpacity style={styles.btnOtherLogin}>
                <Image source={} style = {styles.imgLogo} />
            </TouchableOpacity>
        </View>
      </View> */}
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  boxLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 100
  },
  txtLogo: {
    fontFamily: 'Audiowide-Regular',
    fontSize: 50,
  },
  boxTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50
  },
  txtTitle: {
    fontSize: 40,
    fontWeight: '600',
  },
  txtSubTitle: {
    fontSize: 20,
    fontWeight: '400',

  },
  boxButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30
  },
  btn: {
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  textBtn: {
    fontFamily: 'Roboto',
    fontSize: 16,

  },
})
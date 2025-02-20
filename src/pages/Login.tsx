import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamList } from '../navigation/MainNavigator';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/Store';
import { loginSuccess } from '../store/authSlice';
import { colors } from '../styles';
import AntIcon from 'react-native-vector-icons/AntDesign'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import { OtpInput } from 'react-native-otp-entry';

type LoginScreenProp = StackNavigationProp<MainStackParamList, "Login">;

type LoginProps = {
  navigation: LoginScreenProp;
}

const Login: React.FC<LoginProps> = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async () => {
    try {
      if (email && password) {
        const response = await fetch('http://10.0.2.2:9090/api/user/login',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password: password,
            })
          });
        const json = response.json();
        if (response.status === 200) {
          //Save user and token
          json.then((data) => {
            console.log(data)
            navigation.navigate('Otp', { email });
          })
        }
        else {
          Alert.alert('Login fail', 'Email or password incorrect');
        }
      }
      else {
        Alert.alert('Login fail', 'Do not leave information blank');
      }
    } catch (error) {
      console.log('Error:' + error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  }

  const handleForgotPass = () => { };

  const handleLoginGoogle = () => { };

  const handleLoginFacebook = () => { };

  return (
    <View style={styles.container}>
      <View style={styles.boxWelcome}>
        <Text style={styles.txtWelcome}>Hello!</Text>
        <Text style={styles.txtSubWelcome}>Welcome to IOTTech</Text>
      </View>
      <View style={styles.boxContent}>
        <View style={styles.boxTitle}>
          <Text style={styles.txtTitle}>Login</Text>
        </View>
        <View style={styles.boxInputLogin}>
          <TextInput placeholder='Email' style={styles.inputData} value={email} onChangeText={(text) => { setEmail(text) }} />
          <TextInput placeholder='Password' style={styles.inputData} value={password} onChangeText={(text) => { setPassword(text) }} />
          <Text onPress={handleForgotPass} style={styles.txtForgot}>Forgot Password</Text>
        </View>
        <View style={styles.boxButton}>
          <TouchableOpacity
            onPress={handleLogin}
            style={[
              styles.btn,
              {
                height: 50,
                width: '90%',
              }
            ]}>
            <Text style={styles.textBtn}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.boxOtherLogin}>
          <View style={styles.boxLine}>
            <View style={styles.line}></View>
            <Text style={styles.txtOr}>Or login with</Text>
            <View style={styles.line}></View>
          </View>
          <View style={styles.boxBtnOtherLogin}>
            <TouchableOpacity style={styles.btnOtherLogin} onPress={handleLoginGoogle}>
              <AntIcon name='google' size={24} color={colors.black} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOtherLogin} onPress={handleLoginFacebook}>
              <FontIcon name='facebook' size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
          <View style={styles.boxRegister}>
            <Text style={styles.txtNoAcc}>Don't have account?
              <Text onPress={handleRegister} style={styles.txtRegister}>Register</Text></Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  boxWelcome: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 24,
  },
  txtWelcome: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  txtSubWelcome: {
    fontSize: 16,

  },
  boxTitle: {
    justifyContent: 'center',
    marginLeft: 24,
    marginBottom: 24,
    marginTop: 24,
  },
  txtTitle: {
    fontSize: 40,
    fontWeight: '600',
  },
  txtSubTitle: {
    fontSize: 20,
    fontWeight: '400',
  },

  boxContent: {
    backgroundColor: colors.white,
    width: '100%',
    flex: 2,
    padding: 24,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
  boxInputLogin: {
    width: '100%',
    gap: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputData: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 24,
  },
  txtForgot: {
    fontSize: 16,
    color: colors.blue,
    textDecorationLine: 'underline',
  },
  boxButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    marginTop: 24,
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
  boxOtherLogin: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxLine: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 24,
  },
  txtOr: {
    fontSize: 16,
  },
  line: {
    width: '30%',
    borderWidth: 0.5
  },
  boxBtnOtherLogin: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
    marginTop: 24,
  },
  btnOtherLogin: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  boxRegister: {
    marginTop: 24,
  },
  txtNoAcc: {},
  txtRegister: {
    fontSize: 16,
    color: colors.blue,
    textDecorationLine: 'underline',
  },

})
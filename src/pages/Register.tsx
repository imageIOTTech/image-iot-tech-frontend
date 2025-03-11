import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParamList } from '../navigation/MainNavigator'
import Font5Icon from 'react-native-vector-icons/FontAwesome5'
import { colors } from '../styles'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store/Store'
import UserModel from '../models/User'
import { fetchRegister } from '../hooks/fetchUser'
import { resetStatus } from '../store/authSlice'

type RegisterScreenProp = StackNavigationProp<MainStackParamList, 'Register'>;

type RegisterProps = {
    navigation: RegisterScreenProp;
}

const Register: React.FC<RegisterProps> = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: RootState) => state.auth.status);

    const handleLogin = () => {
        navigation.navigate('Login')
    };

    useEffect(() => {
        if (status === "Register done") {
            Alert.alert('Register successful', 'Register successful, Please login again')
            navigation.navigate('Login');
            dispatch(resetStatus(""));
        }
    }, [status]);

    const handleSignUp = async () => {
        try {
            if (rePassword != password) {
                Alert.alert('Password is incorrect', 'Please enter your confirm password ')
            }
            else if (!email || !password || !rePassword || !phonenumber) {
                Alert.alert('Do not leave information blank');
            }
            else {
                const user: UserModel = {
                    name,
                    email,
                    password,
                    phonenumber,
                };
                dispatch(fetchRegister(user));
            }
        } catch (error) {
            console.log('Error: ' + error)
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}></View>
            <View style={styles.boxRegister}>
                <View style={styles.boxBackLogin}>
                    <TouchableOpacity onPress={handleLogin} style={{
                        flexDirection: 'row', gap: 10, justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}>
                        <Font5Icon name='chevron-left' size={18} color={colors.black} />
                        <Text style={styles.txtBack}>Back to login</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.txtRegister}>Register</Text>
                <View style={styles.boxInputLogin}>
                    <TextInput placeholder='Name' style={styles.inputData} value={name} onChangeText={(text) => { setName(text) }} />
                    <TextInput placeholder='Email' style={styles.inputData} value={email} onChangeText={(text) => { setEmail(text) }} />
                    <TextInput placeholder='Password' style={styles.inputData} value={password} onChangeText={(text) => { setPassword(text) }} />
                    <TextInput placeholder='Confirm Password' style={styles.inputData} value={rePassword} onChangeText={(text) => { setRePassword(text) }} />
                    <TextInput placeholder='Phone Number' style={styles.inputData} value={phonenumber} onChangeText={(text) => { setPhoneNumber(text) }} />
                </View>
                <View style={styles.boxBtnRegister}>
                    <TouchableOpacity style={styles.btnRegister} onPress={handleSignUp}>
                        <Text style={styles.txtBtnRegister}> Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    boxRegister: {
        flex: 9,
        backgroundColor: colors.white,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 24
    },
    boxBackLogin: {
        justifyContent: 'center',
        padding: 24
    },
    txtBack: {
        fontSize: 16,
        color: colors.black
    },
    txtRegister: {
        fontSize: 35,
        fontWeight: 'bold',
        marginLeft: 24,
    },
    boxInputLogin: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        marginTop: 24,
    },
    inputData: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        paddingLeft: 24,
    },
    boxBtnRegister: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    btnRegister: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 20,
    },
    txtBtnRegister: {
        fontSize: 24,
    },
})
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack'
import { MainStackParamList } from '../navigation/MainNavigator'
import { OtpInput } from 'react-native-otp-entry';
import { colors } from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { RouteProp } from '@react-navigation/native';
import Font5Icon from 'react-native-vector-icons/FontAwesome5'
import OtpModel from '../models/Otp';
import { fetchOtp } from '../hooks/fetchUser';
import { resetStatus } from '../store/authSlice';

type OtpScreenProp = StackNavigationProp<MainStackParamList, 'Otp'>;
type OtpScreenRouterProp = RouteProp<MainStackParamList, 'Otp'>;

type OtpProps = {
    navigation: OtpScreenProp;
    route: OtpScreenRouterProp;
}
const Otp: React.FC<OtpProps> = ({ navigation, route }) => {

    const [optValue, setOtpValue] = useState<string>('');
    const { email } = route.params;

    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    
    const handleVerify = async () => {
        try {
            if (optValue.length == 6 && optValue) {
                const otp: OtpModel = {
                    email: email,
                    otp: optValue
                }
                dispatch(fetchOtp(otp));
                if (isAuthenticated) {
                    navigation.navigate('Home');
                }
            }
            else {
                Alert.alert('Code is too short', 'Please enter code 6 numbers');
            }
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    const handleResendCode = () => { };

    const handleBackLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxBackLogin}>
                <TouchableOpacity onPress={handleBackLogin} style={{
                    flexDirection: 'row', gap: 10, justifyContent: 'flex-start',
                    alignItems: 'center',
                }}>
                    <Font5Icon name='chevron-left' size={18} color={colors.black} />
                    <Text style={styles.txtBack}>Back to login</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.txtTitleOpt}>Verify Your Email</Text>
            <Text style={styles.txtSubTitleOpt}>Enter the verification code send to your email:</Text>
            <OtpInput
                numberOfDigits={6}
                onTextChange={(text) => setOtpValue(text)} />
            <View style={styles.boxResendCode}>
                <Text style={styles.txtDidNotReceive}>Didn't receive the code?
                    <Text style={styles.txtResendCode} onPress={handleResendCode}>Resend code</Text></Text>
            </View>
            <TouchableOpacity style={styles.btnVerify} onPress={handleVerify}>
                <Text style={styles.txtVerify}>Confirm</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Otp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 24,
        backgroundColor: colors.white,
    },
    boxBackLogin: {
        width: '100%',
        justifyContent: 'center',
    },
    txtBack: {
        fontSize: 16,
        color: colors.black,
    },
    txtTitleOpt: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 24
    },
    txtSubTitleOpt: {
        fontSize: 16,
        marginVertical: 24,
    },
    boxResendCode: {
        width: '100%',
        marginTop: 24,
    },
    txtDidNotReceive: {
        textAlign: 'right',
        fontSize: 16,
    },
    txtResendCode: {
        color: colors.blue,
        textDecorationLine: 'underline',
    },
    btnVerify: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 24,
    },
    txtVerify: {},
})
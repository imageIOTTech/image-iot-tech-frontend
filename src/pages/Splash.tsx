import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { colors } from '../styles'
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/MainNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

type SplashScreenRouteProp = StackNavigationProp<MainStackParamList, 'Splash'>;

type SplashProps = {
    navigation : SplashScreenRouteProp;
};


const Splash: React.FC<SplashProps> = ({navigation}) => {
    useEffect(() => {
        const splash = setTimeout(() => {
            //
            console.log("Splash");
            navigation.navigate("Welcome");
        }, 2000);
    }, [])


    return (
        <View style={styles.container}>
            <Text style={styles.textLogo}>
                IOTTech
            </Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white
    },
    textLogo: {
        fontFamily: 'PlayfairDisplay-SemiBold',
        fontSize: 35,
    },
})
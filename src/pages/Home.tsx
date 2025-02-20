import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/MainNavigator';
import { useNavigation } from '@react-navigation/native';

type HomeScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Home Screen</Text>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile', { userId: '12345' })}
      />
      <Button
        title="Go to Edit"
        onPress={() => navigation.navigate('Edit')}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default Home;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/MainNavigator';

type ProfileScreenRouteProp = RouteProp<MainStackParamList, 'Profile'>;

type ProfileProps = {
  route: ProfileScreenRouteProp;
};

const Profile: React.FC<ProfileProps> = ({ route }) => {
  const { userId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
      <Text>User ID: {userId}</Text>
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

export default Profile;

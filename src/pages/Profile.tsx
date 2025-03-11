import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, StatusBar, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../navigation/MainNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import Font5Icon from 'react-native-vector-icons/FontAwesome5'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import { colors } from '../styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/Store';
import { logout } from '../store/authSlice';

type ProfileScreenProps = StackNavigationProp<MainStackParamList, 'Profile'>;

type ProfileProps = {
  navigation: ProfileScreenProps;
};

const Profile: React.FC<ProfileProps> = ({ navigation }) => {

  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);

  const hanleEditScreen = () => {
    navigation.navigate("Edit");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate("Edit");
  };

  const handleProjectFolder = () => {
    navigation.navigate('Folder');
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.header}>
        <TouchableOpacity onPress={hanleEditScreen} style={{
          flexDirection: 'row', gap: 10, justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          <Font5Icon name='chevron-left' size={18} color={colors.black} />
          <Text style={styles.txtBack}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boxAvatar}>
        <TouchableOpacity style = {styles.btnAvatar}>
          <Image source={require('../assets/imgs/a.jpg')} style={styles.imgAvatar} />
        </TouchableOpacity>
        <Text style={styles.textUsername}>{user.name}</Text>
      </View>
      <View style={styles.boxTool}>
        <TouchableOpacity style={styles.btnTool}>
          <View style={styles.leftBtn}>
            <View style={styles.boxIconTool}>
              <Font5Icon name='user-edit' size={18} color={colors.black} />
            </View>
            <Text style={styles.txtTitle}>Edit Profile</Text>
          </View>
          <Font5Icon name='chevron-right' size={18} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTool} onPress={handleProjectFolder}>
          <View style={styles.leftBtn}>
            <View style={styles.boxIconTool}>
              <EntypoIcon name='folder' size={18} color={colors.black} />
            </View>
            <Text style={styles.txtTitle}>Project Folder</Text>
          </View>
          <Font5Icon name='chevron-right' size={18} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTool}>
          <View style={styles.leftBtn}>
            <View style={styles.boxIconTool}>
              <EntypoIcon name='bell' size={18} color={colors.black} />
            </View>
            <Text style={styles.txtTitle}>Notification</Text>
          </View>
          <Font5Icon name='chevron-right' size={18} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTool}>
          <View style={styles.leftBtn}>
            <View style={styles.boxIconTool}>
              <EntypoIcon name='help' size={18} color={colors.black} />
            </View>
            <Text style={styles.txtTitle}>Help & Feedback</Text>
          </View>
          <Font5Icon name='chevron-right' size={18} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnTool}>
          <View style={styles.leftBtn}>
            <View style={styles.boxIconTool}>
              <Font5Icon name='info' size={18} color={colors.black} />
            </View>
            <Text style={styles.txtTitle}>About</Text>
          </View>
          <Font5Icon name='chevron-right' size={18} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.boxLogout}>
          <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
            <Text style={styles.txtLogout}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 24,
  },
  header: {
    margin: 12,
  },
  txtBack: {
    fontSize: 20,
    color: colors.black
  },
  boxAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  btnAvatar: {
    width: 155,
    height: 155,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: colors.white,
    borderRadius: 90,
  },
  imgAvatar: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 90,
  },
  textUsername: {
    fontSize: 24,
    fontWeight: '600',
    margin: 10,
  },
  boxListImage: {
  },
  btnImage: {
    borderWidth: 1,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10
  },
  imgListImage: {
    width: 100,
    height: 100,
  },
  boxTool: {
    flex: 1,
    alignItems: 'center',
    gap: 15,
    backgroundColor: colors.white,
    padding: 24,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  btnTool: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxIconTool: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: colors.black
  },
  boxLogout: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  btnLogout: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtLogout: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 10,
    color: colors.black,
  },
});

export default Profile;

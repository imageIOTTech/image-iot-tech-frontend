import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Constants } from '../utils'
import { colors } from '../styles'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';

type HeaderProps = {
  saveImage: () => void,
  shareImage: () => void,
  undo: () => void,
  redo: () => void,
  profile: () => void,
  edit: boolean,
}

const Header: React.FC<HeaderProps> = (props) => {

  const { saveImage, shareImage, undo, redo, profile, edit } = props;

  const [isEdit, setIsEdit] = useState<Boolean>(edit);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <View style={styles.container}>
      <View style={styles.leftHeader}>
        <TouchableOpacity style = { styles.btnUser} onPress={profile}>
          <Image source={
            isAuthenticated ?
              require('../assets/imgs/a.jpg') :
              require('../assets/imgs/User-Avatar.png')
          } style={styles.imgAvatar} />
        </TouchableOpacity>
      </View>
      <View style={styles.rightHeader}>
        {
          isEdit ?
            <View style={styles.step}>
              <TouchableOpacity style={[styles.btn, styles.btnUndone]} onPress={undo}>
                <MaterialIcon name="undo" size={24} color={colors.black} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnRecover]} onPress={redo}>
                <MaterialIcon name="redo" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
            : null
        }
        <TouchableOpacity style={[styles.btn, styles.btnShare]} onPress={shareImage}>
          <EntypoIcon name="share" size={24} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnSave]} onPress={saveImage}>
          <MaterialIcon name="save-alt" size={24} color={colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: Constants.WIDTH_DEVICE,
    height: 50,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  leftHeader: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  btnUser: {

  },
  rightHeader: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  btn: {
    width: 32,
    height: 32,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
  },
  btnShare: {
    marginRight: 24,
  },
  btnSave: {
    marginRight: 12,
  },
  step: {
    flexDirection: 'row',
  },
  btnUndone: {
    marginRight: 24,
  },
  btnRecover: {
    marginRight: 24,
  },
  imgAvatar: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    borderRadius: 50,
  }

})
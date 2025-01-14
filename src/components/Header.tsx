import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Constants } from '../utils'
import { colors } from '../styles'
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Header = () => {

  const [isEdit, setIsEdit] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.leftHeader}></View>
      <View style={styles.rightHeader}>
        {
          isEdit ?
            <View style={styles.step}>
              <TouchableOpacity style={[styles.btn, styles.btnUndone]}>
                <MaterialIcon name="undo" size={24} color={colors.black} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btnRecover]}>
                <MaterialIcon name="redo" size={24} color={colors.black} />
              </TouchableOpacity>
            </View>
            : null
        }
        <TouchableOpacity style={[styles.btn, styles.btnShare]}>
          <EntypoIcon name="share" size={24} color={colors.black} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnSave]}>
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
    backgroundColor: 'red',
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
    marginRight: 12,},
  step: {
    flexDirection: 'row',
  },
  btnUndone: {
    marginRight: 24,
  },
  btnRecover:{
    marginRight: 24,
  },

})
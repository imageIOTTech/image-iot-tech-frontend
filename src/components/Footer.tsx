import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../styles'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Font5Icon from 'react-native-vector-icons/FontAwesome5'

type FooterProps = {
  onPressHome: () => void,
  onPressEdit: () => void,
  onPressPro: () => void,
}

const Footer: React.FC<FooterProps> = (props) => {

  const {onPressEdit, onPressHome, onPressPro} = props;

  return (
    <View style={styles.container}>
      <Pressable style={styles.btn} onPress={onPressHome}>
        <Font5Icon name='folder-open' size={24} color={colors.black} />
        <Text style={styles.txtTitle}>
          Project
        </Text>
      </Pressable>
      <Pressable style={styles.btnEdit} onPress={onPressEdit}>
        <IonIcon name='add' size={24} color={colors.black} />
      </Pressable>
      <Pressable style={styles.btn} onPress={onPressPro}>
        <Font5Icon name='crown' size={24} color={colors.black} />
        <Text style={styles.txtTitle}>
          Pro
        </Text>
      </Pressable>

    </View>
  )
}

export default Footer

const styles = StyleSheet.create({
  container: {
    width: '70%',
    height: 60,
    paddingHorizontal: 12,
    paddingVertical: 6,
    // borderWidth: 1,
    position: 'absolute',
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // gap: 24,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {},
  btnEdit: {
    width: 70,
    height: 70,
    backgroundColor: colors.silver,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
})
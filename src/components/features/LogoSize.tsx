import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles'
import Slider from '@react-native-community/slider'
import FontIcon from 'react-native-vector-icons/FontAwesome'

type LogoSizeProps = {
    minValue: number,
    maxValue: number,
    step: number,
    value: number,
    onChangeValue: (value: number) => void,
}

const LogoSize: React.FC<LogoSizeProps> = (props) => {

    const {maxValue, minValue, value, step, onChangeValue} = props;

  return (
    <View style={styles.boxLogoSize}>
            <FontIcon name='text-height' size={30} color={colors.gray} />
            <Slider
                style={styles.sliderLogoSize}
                minimumValue={minValue}
                maximumValue={maxValue}
                step={step}
                value={value}
                onValueChange={onChangeValue}
                minimumTrackTintColor={colors.gray}
                maximumTrackTintColor={colors.silver}
                thumbTintColor={colors.gray}
            />
        </View>
  )
}

export default LogoSize

const styles = StyleSheet.create({
    boxLogoSize: {
        position: 'absolute',
        top: 0,
        marginTop: -75,
        width: '100%',
        height: 75,
        flexDirection: 'row',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      sliderLogoSize: {
        width: '90%'
      },
})
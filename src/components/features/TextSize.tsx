import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FontIcon from 'react-native-vector-icons/FontAwesome'
import Slider from '@react-native-community/slider'
import { colors } from '../../styles'

type TextSizeProps = {
    value: number,
    maxValue: number,
    minValue: number,
    step: number,
    onChangeValue: (value: number) => void,
}

const TextSize: React.FC<TextSizeProps> = (props) => {

    const {value, maxValue, minValue, step, onChangeValue} = props;

    return (
        <View style={styles.boxTextSize}>
            <FontIcon name='text-height' size={30} color={colors.gray} />
            <Slider
                style={styles.sliderTextSize}
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

export default TextSize

const styles = StyleSheet.create({
    boxTextSize: {
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
      sliderTextSize: {
        width: '90%'
      },

})
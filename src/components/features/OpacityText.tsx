import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../styles'
import Slider from '@react-native-community/slider'

type OpacityTextProps= {
    minValue: number,
    maxValue: number,
    step: number,
    value: number,
    onChangeValue: (value: number) => void,
}
const OpacityText: React.FC<OpacityTextProps> = (props) => {

    const {minValue, maxValue, step, value, onChangeValue} = props;

    return (
        <View style={styles.boxOpacityText}>
            <MaterialIcon name='opacity' size={30} color={colors.gray} />
            <Slider
                style={styles.sliderOpacityText}
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

export default OpacityText

const styles = StyleSheet.create({
    boxOpacityText: {
        position: 'absolute',
        top: 0,
        marginTop: -140,
        width: '100%',
        height: 75,
        flexDirection: 'row',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      sliderOpacityText: {
        width: '90%',
      },
})
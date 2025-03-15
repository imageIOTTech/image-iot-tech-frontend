import { Button, PanResponder, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Svg, { Path } from 'react-native-svg';
import ComponentModel from '../../models/Component';

type DrawProps = {
    width: number | undefined,
    height: number | undefined,
    offerY: number,
    clearDraw: () => void, //Delete last stroke
    isDraw: boolean,

    component: ComponentModel[],
    addStroke: (path: string) => void,

    //Element pen
    sizePen?: number,
    colorPen?: string,
};

const Draw: React.FC<DrawProps> = (props) => {

    const { width, height, offerY, clearDraw, isDraw, sizePen, colorPen , addStroke, component} = props;
    const [currentPath, setCurrentPath] = useState('');
    const [paths, setPaths] = useState<ComponentModel[]>(component);
    
    useEffect(() => {
        setPaths(component);
    },[component])

    const panResponder = PanResponder.create({

        onStartShouldSetPanResponder: () => isDraw,

        onMoveShouldSetPanResponder: () => isDraw,

        onPanResponderGrant: (evt, gestureState) => {

            let newX = gestureState.x0;
            let newY = gestureState.y0 - offerY;

            const newPath = `M${newX},${newY}`;
            setCurrentPath(newPath);

        },
        onPanResponderMove: (evt, gestureState) => {

            let newX = gestureState.moveX;
            let newY = gestureState.moveY - offerY;
            const newPath = currentPath + `L${newX},${newY}`;

            setCurrentPath(newPath);
        },

        onPanResponderRelease: () => {
            addStroke(currentPath);
            setCurrentPath('');
        },
    });

    return (
        <View style={{
            width: width,
            height: height,
            position: 'absolute',
            zIndex: 10,
        }}
            {...panResponder.panHandlers}
        >
            <Svg style={{ flex: 1 }}>
                {paths.map((item) => (
                    <Path key={item.id} d={item.component?.path} stroke="black" strokeWidth={10} fill="none" />
                ))}
                <Path d={currentPath} stroke="black" strokeWidth={10} fill="none" />
            </Svg>
        </View>
    )
}

export default Draw

const styles = StyleSheet.create({})
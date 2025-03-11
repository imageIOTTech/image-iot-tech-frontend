import { findNodeHandle, Image, Pressable, StyleSheet, Text, UIManager, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Draggable } from '.';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles';
import ComponentModel from '../models/Component';

type ComponentImageProps = {
    onDown: () => void,
    onRemove: () => void,
    component: ComponentModel,
    newPosition: (x: number, y: number) => void,
    itemFocus: string,
    unItemFocus: () => void,
    styleEdit: any,
}

const ComponentImage: React.FC<ComponentImageProps> = (props) => {

    const { onDown, onRemove, component, newPosition, styleEdit, itemFocus, unItemFocus } = props;
    const item = component.component;
    const componentRef = useRef(null);

    const getPosition = () => {
        if (componentRef.current || componentRef.current != null) {
            UIManager.measure(findNodeHandle(componentRef.current), (x, y, w, h, pageX, pageY) => {
                newPosition(pageX, pageY);
            });
        }
    }

    const downComponent = () => {
        onDown();
        getPosition();
    };



    return (
        <Draggable
            onDown={downComponent}
            initialX={item.positionX}
            initialY={item.positionY}
            key={component.id}>
            <View
                ref={componentRef}
                style={{ 
                    marginBottom: 10, 
                    borderWidth: component.id == itemFocus ? 1 : 0, 
                    zIndex: 10,
                    // transform: [{ rotate: `${45}deg` }]
                     }}>
                {
                    component.id == itemFocus ?
                        <Pressable style={styles.btnDeleteLogo}
                            onPress={() =>
                                onRemove()
                            }>
                            <IonIcon name="close-outline" size={24} color={colors.black} />
                        </Pressable>
                        : null
                }
                {
                    component.id == itemFocus ?
                        <Pressable style={styles.btnHideFocus}
                            onPress={() => {
                                unItemFocus()
                            }}>
                            <IonIcon name="eye-off" size={20} color={colors.black} />
                        </Pressable>
                        : null
                }
                <Image source={{ uri: item.uri }}
                    style={[
                        component.style,
                        component.id === itemFocus ? {
                            width: styleEdit.width,
                            height: styleEdit.height,
                        } : {},]}
                />
            </View>
        </Draggable>
    )
}

export default ComponentImage

const styles = StyleSheet.create({
    btnDeleteLogo: {
        width: 24,
        height: 24,
        borderRadius: 90,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: -15,
        left: -15,
        backgroundColor: colors.white,
        zIndex: 100
    },
    btnHideFocus: {
        width: 24,
        height: 24,
        borderRadius: 90,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: -15,
        right: -15,
        backgroundColor: colors.white,
        zIndex: 100
    },
})
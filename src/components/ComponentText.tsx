import { findNodeHandle, Pressable, StyleSheet, Text, UIManager, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Draggable } from '.';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { colors } from '../styles';
import ViewShot, { CaptureOptions } from 'react-native-view-shot';
import ComponentModel from '../models/Component';

type ComponentTextProps = {
    onDown: () => void;
    onRemove: () => void;
    component: ComponentModel,
    newPosition: (x: number, y: number) => void,
    itemFocus: string,
    unItemFocus: () => void;
    styleEdit: any,
}

const ComponentText: React.FC<ComponentTextProps> = (props) => {

    const { onDown, component, styleEdit, onRemove , newPosition, itemFocus, unItemFocus} = props;
    const item = component.component;

    const componentRef = useRef(null);
    const viewTextShot = useRef<ViewShot>(null);

    const [value, setValue] = useState(item?.value);

    const getPosition = () => {
        if (componentRef.current || componentRef.current != null) {
            UIManager.measure(findNodeHandle(componentRef.current), (x, y, w, h, pageX, pageY) => {
                newPosition(pageX, pageY);
            });
        }
    }

    useEffect(() => {
        if (!item) return;
        setValue(item.value)
    }, [item])
    

    const options: CaptureOptions = {
        format: 'png',
        quality: 0.9
    }

    const downComponent = () => {
        onDown();
        getPosition();
    };

    return (
        <Draggable
            onDown={() => { downComponent() }}
            initialX={item.positionX}
            initialY={item.positionY}
            key={component.id}
        >
            <View
                ref={componentRef}
                style={{ marginBottom: 10, borderWidth: component.id == itemFocus ? 1 : 0, zIndex: 1 }}>
                {
                    component.id == itemFocus ?
                        <Pressable style={styles.btnDeleteLogo}
                            onPress={() => onRemove()}>
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
                <ViewShot ref={viewTextShot} options={options} >
                    <Text style={[
                        component.style,
                        component.id === itemFocus ? {
                            fontSize: styleEdit.fontSize,
                            fontFamily: styleEdit.fontFamily,
                            color: styleEdit.color,
                            opacity: styleEdit.opacity,
                        } : {},]}
                    >
                        {value}
                    </Text>
                </ViewShot>
            </View>
        </Draggable>
    )
}

export default ComponentText

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
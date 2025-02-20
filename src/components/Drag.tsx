import React, { Component } from "react";
import { StyleSheet, View, Animated, PanResponder, GestureResponderEvent, PanResponderGestureState, PanResponderInstance } from "react-native";

interface DraggableItemProps {
    children: React.ReactNode; // Nhận vào một node component khác
    onDown: () => void; // Để bỏ funtion vào khi thả phần tử ra
}

interface DraggableItemState {
    pan: Animated.ValueXY; // Để theo dõi vị trí của phần tử kéo
    opacity: Animated.Value; // Để điều chỉnh độ mờ của phần tử
    showItem: boolean; // Để điều khiển việc hiển thị phần tử
}

class DraggableItem extends Component<DraggableItemProps, DraggableItemState> {
    private _val: { x: number, y: number };
    private panResponder?: PanResponderInstance; // Để quản lý sự kiện kéo

    constructor(props: DraggableItemProps) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            opacity: new Animated.Value(1),
            showItem: true,
        };
        this._val = { x: 0, y: 0 };
    }

    componentDidMount() {
        this.state.pan.addListener((value) => this._val = value);

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this.state.pan.setOffset({
                    x: this._val.x,
                    y: this._val.y,
                });
                this.state.pan.setValue({ x: 0, y: 0 });
            },
            onPanResponderMove: Animated.event(
                [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                // Bạn có thể thêm logic khi thả phần tử (ví dụ, vào vùng drop area)
                this.props.onDown()
            }
        });


    }

    render() {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        };
        return (
            <Animated.View
                {...(this.panResponder ? this.panResponder.panHandlers : {})}
                style={[panStyle, styles.item, { opacity: this.state.opacity }]}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        zIndex: 10,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default DraggableItem;

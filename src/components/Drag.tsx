import React, { Component } from "react";
import { StyleSheet, Animated, PanResponder, PanResponderInstance } from "react-native";
interface DraggableItemProps {
    children: React.ReactNode; // Add children node
    onDown: () => void; // Funtion when drop down 
    initialX?: number;
    initialY?: number;
}

interface DraggableItemState {
    pan: Animated.ValueXY; // To track the position of the drag element
    opacity: Animated.Value; // Adjust element opacity
    showItem: boolean; // Controls the display of elements
}

class DraggableItem extends Component<DraggableItemProps, DraggableItemState> {
    private _val: { x: number, y: number };
    private panResponder?: PanResponderInstance; // Drag event management
    private panListenerId?: string;

    constructor(props: DraggableItemProps) {

        super(props);
        this.state = {
            pan: new Animated.ValueXY({ x: this.props.initialX || 0, y: this.props.initialY || 0 }),
            opacity: new Animated.Value(1),
            showItem: true,
        };
        this._val = { x: this.props.initialX || 0, y: this.props.initialY || 0 };

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
                { useNativeDriver: false },
            ),
            onPanResponderRelease: () => {
                // Logic when dropping an element (e.g. into a drop area)
                this.state.pan.flattenOffset();
                this.props.onDown()
            }
        });
    }

    componentDidMount() {
        this.state.pan.setValue({ x: this.props.initialX || 0, y: this.props.initialY || 0 });
        this.state.pan.addListener((value) => this._val = value);

        // this.panResponder = PanResponder.create({
        //     onStartShouldSetPanResponder: () => true,
        //     onPanResponderGrant: () => {
        //         this.state.pan.setOffset({
        //             x: this._val.x,
        //             y: this._val.y,
        //         });
        //         this.state.pan.setValue({ x: 0, y: 0 });
        //     },
        //     onPanResponderMove: Animated.event(
        //         [null, { dx: this.state.pan.x, dy: this.state.pan.y }],
        //         { useNativeDriver: false },
        //     ),
        //     onPanResponderRelease: () => {
        //         // Logic when dropping an element (e.g. into a drop area)
        //         this.state.pan.flattenOffset();
        //         this.props.onDown()
        //     }
        // });

    }

    componentWillUnmount() {
        if (this.panListenerId) {
            this.state.pan.removeListener(this.panListenerId);
        }
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

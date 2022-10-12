import { useRef, useEffect } from 'react';
import { Animated, Pressable } from 'react-native';
import { useSelector } from "react-redux"

import { SIZES } from '../../constants/theme';


const Modal = ({
    children,
    isOpen,
    setIsOpen,
    onClose,
    modalHeight
}) => {
    const { theme } = useSelector(state => state.local);
    const animation = useRef(new Animated.Value(0)).current;


    useEffect(() => {
        if(isOpen){
            Animated.timing(animation, {
                toValue: 1,
                duration: SIZES.animationDuration,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: SIZES.animationDuration,
                useNativeDriver: true
            }).start();
        }
    }, [isOpen]);

    const handleClose = () => {
        onClose && onClose();
        setIsOpen(false);
    }

    return (
    <>
        {/* Darken background */}
        {isOpen && (
            <Animated.View 
                style={{
                    position: 'absolute',
                    bottom: 0,
                    height: '100%',
                    width: SIZES.width,
                }}
                opacity={animation}
            >
                {/* Background container */}
                <Pressable
                    style={{
                        flex: 1,
                        height: '100%',
                        width: SIZES.width,
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                    onPress={handleClose}
                />
            </Animated.View>
        )}

        {/* Content Container */}
        <Animated.View
            style={{
                position: 'absolute',
                height: '100%',
                flex: 1,
                width: SIZES.width,
                backgroundColor: theme.main,
                borderTopLeftRadius: SIZES.radius,
                borderTopRightRadius: SIZES.radius,
                transform: [
                    {
                        translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [SIZES.height + 150, SIZES.height - modalHeight]
                        })
                    }
                ]
            }}
            opacity={animation}
        >
            {children}
        </Animated.View>
        </>
    )
}

export default Modal;
import { useEffect, useState, useRef } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"
import { useSelector } from "react-redux"
import { SIZES, FONTS } from "../../constants/theme";

const Alert = ({message, color, setAlertMsg}) => {
    const { theme } = useSelector(state => state.local);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let timeout = null;
        let timeout2 = null;
        if (message !== "") {
            Animated.timing(animation, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }).start();

            timeout = setTimeout(() => {
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }).start();
                timeout2 = setTimeout(() => {
                    setAlertMsg("");
                }, 250);
            }, 2000);
        }
        return () => {
            clearTimeout(timeout);
            clearTimeout(timeout2);
        }
    }, [message]);


    const style = StyleSheet.create({
        container: {
            position: 'absolute',
            height: '100%',
            width: SIZES.width,
            flex: 1,
            padding: SIZES.padding,
        },
        alert: {
            backgroundColor: color || theme.primary,
            borderColor: theme.border,
            borderWidth: 1,
            borderRadius: SIZES.radius,
            padding: SIZES.padding,
        },
        message: {
            color: theme.textLight,
            textAlign: 'center',
            ...FONTS.body4,
        },
    });

    return (
        <Animated.View
            style={[style.container, {
                transform: [
                    {
                        translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [SIZES.height + 150, SIZES.height - 100]
                        })
                    }
                ]
            }]}
            opacity={animation}
        >
            <View style={style.alert}>
                <Text style={style.message}>
                    {message}
                </Text>
            </View>
        </Animated.View>
    )
}

export default Alert
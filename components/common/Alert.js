import { useEffect, useState, useRef } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"
import { useSelector } from "react-redux"
import { SIZES, FONTS } from "../../constants/theme";

const Alert = ({message, color, setAlertMsg}) => {
    const { theme } = useSelector(state => state.local);
    const [showAlert, setShowAlert] = useState(true);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let timeout = null;
        if (showAlert && message !== "") {
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
                setTimeout(() => {
                    setAlertMsg("");
                    setShowAlert(false);
                }, 250);
            }, 2000);
        }
        return () => {
            clearTimeout(timeout);
        }
    }, [message]);


    const style = StyleSheet.create({
        container: {
            position: 'absolute',
            height: '100%',
            width: SIZES.width,
            zIndex: 100,
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
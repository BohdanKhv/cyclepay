import { Image, TouchableOpacity, TouchableNativeFeedback, View } from 'react-native';
import { useSelector } from "react-redux"

const IconButton = ({
    containerStyle,
    onPress,
    iconStyle,
    color,
    icon,
    width,
    height,
    padding
}) => {
    const { theme } = useSelector(state => state.local);

    return (
        <View
            style={{
                ...containerStyle,
                borderRadius: width ? width : 50,
                overflow: 'hidden',
            }}
        >
            <TouchableNativeFeedback
                onPress={() => {
                    onPress ? onPress() : null;
                }}
                style={{
                    padding: 8
                }}
                background={TouchableNativeFeedback.Ripple(theme.tertiary, false)}
            >
                <View
                    style={{
                        padding: padding || 8,
                    }}
                >
                <Image
                    resizeMode='contain'
                    style={{
                        width: width || 25,
                        height: height || 25,
                        tintColor: color || theme.textDark,
                        overlayColor: theme.textDark,
                        ...iconStyle,
                        padding: 8
                    }}
                    source={icon}
                />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default IconButton;
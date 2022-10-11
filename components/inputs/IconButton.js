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
                }}
                background={TouchableNativeFeedback.Ripple(theme.tertiary, false)}
            >
                <View
                    style={{
                        padding: padding ? padding : 8,
                    }}>
                <View
                    style={{
                        width: width || 20,
                        height: height || 20,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                <Image
                    resizeMode='contain'
                    style={{
                        width: '100%',
                        height: '100%',
                        tintColor: color || theme.textDark,
                        overlayColor: theme.textDark,
                        ...iconStyle,
                        padding: 8
                    }}
                    source={icon}
                />
                </View>
                    
                    </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default IconButton;
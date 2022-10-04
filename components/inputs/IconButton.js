import { Image, TouchableOpacity, TouchableNativeFeedback, View } from 'react-native';
import { COLORS } from '../../constants/theme';

const IconButton = ({ containerStyle, onPress, iconStyle, icon, width, height, padding }) => {
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
                background={TouchableNativeFeedback.Ripple(COLORS.tertiary, false)}
            >
                <View
                    style={{
                        padding: padding || 4,
                    }}
                >
                <Image
                    resizeMode='contain'
                    style={{
                        width: width || 25,
                        height: height || 25,
                        tintColor: 'black',
                        overlayColor: COLORS.textDark,
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
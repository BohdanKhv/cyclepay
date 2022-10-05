import { Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS, SIZES } from '../../constants/theme';

const TextButton = ({
    containerStyle,
    label,
    labelStyle,
    onPress,
    disabled,
    color,
    borderColor
}) => {

    return (
        <LinearGradient
            colors={color ? [color, color, color] : [COLORS.gradientMain1, COLORS.gradientMain2, COLORS.gradientMain3]}
            start={{ x: 0.3, y: 0 }}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                color: COLORS.textLight,
                overflow: 'hidden',
                ...containerStyle,
            }}
        >
            <TouchableNativeFeedback
                disabled={disabled}
                onPress={() => {
                    onPress ? onPress() : null;
                }}
                background={TouchableNativeFeedback.Ripple(COLORS.tertiary, false)}
            >
                <View style={{
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    borderRadius: SIZES.radius,
                    backgroundColor: color || COLORS.textDark,
                    borderWidth: 1,
                    borderColor: borderColor || 'transparent',
                    color: COLORS.textLight,
                    width: '100%',
                }}>
                    <Text
                        style={{
                            color: COLORS.textLight,
                            fontSize: SIZES.h3,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            ...labelStyle
                        }}
                    >
                        {label}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        </LinearGradient>
    )
}

export default TextButton;
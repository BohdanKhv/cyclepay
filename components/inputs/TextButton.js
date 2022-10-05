import { Text, TouchableNativeFeedback, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS, SIZES } from '../../constants/theme';

const TextButton = ({
    containerStyle,
    label,
    labelStyle,
    onPress,
    disabled,
    color,
    icon,
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
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {icon &&
                            <Image
                                source={icon}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 8,
                                    tintColor: labelStyle && labelStyle.color ? labelStyle.color : COLORS.textDark,
                                }}
                            />
                        }
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
                </View>
            </TouchableNativeFeedback>
        </LinearGradient>
    )
}

export default TextButton;
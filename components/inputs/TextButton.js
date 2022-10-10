import { Text, TouchableNativeFeedback, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from "react-redux"

import { FONTS, SIZES } from '../../constants/theme';

const TextButton = ({
    containerStyle,
    height,
    label,
    labelStyle,
    onPress,
    disabled,
    color,
    icon,
    borderColor
}) => {
    const { theme } = useSelector(state => state.local);

    return (
        <LinearGradient
            colors={color ? [color, color, color] : [theme.gradientMain1, theme.gradientMain2, theme.gradientMain3]}
            start={{ x: 0.3, y: 0 }}
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                color: theme.textLight,
                overflow: 'hidden',
                ...containerStyle,
            }}
        >
            <TouchableNativeFeedback
                disabled={disabled}
                onPress={() => {
                    onPress ? onPress() : null;
                }}
                background={TouchableNativeFeedback.Ripple(theme.tertiary, false)}
            >
                <View style={{
                    paddingVertical: 6,
                    paddingHorizontal: 16,
                    borderRadius: SIZES.radius,
                    backgroundColor: color || theme.textDark,
                    borderWidth: 1,
                    borderColor: borderColor || 'transparent',
                    color: theme.textLight,
                    width: '100%',
                }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: height || 'auto',
                        }}
                    >
                        {icon &&
                            <Image
                                source={icon}
                                style={{
                                    width: 20,
                                    height: 20,
                                    marginRight: 8,
                                    tintColor: labelStyle && labelStyle.color ? labelStyle.color : theme.textDark,
                                }}
                            />
                        }
                        <Text
                            style={{
                                color: theme.textLight,
                                ...FONTS.h3,
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
import { Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

import { COLORS, SIZES } from '../../constants/theme';

const TextButton = ({ containerStyle, label, labelStyle, onPress, disabled, color, borderColor }) => {

    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: SIZES.radius,
                backgroundColor: color || COLORS.textDark,
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
        </View>
    )
}

export default TextButton;
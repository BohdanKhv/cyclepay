import { View, Text, Switch, StyleSheet, TouchableNativeFeedback } from "react-native"
import { COLORS, FONTS, SIZES } from "../../constants/theme"

export const SettingsItem = ({ value, onChange, label }) => {

    const style = StyleSheet.create({
        container: {
            position: 'relative',
            overflow: 'hidden',
        },
        label: {
            color: COLORS.textDark,
            ...FONTS.body3
        },
        alignCenter: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        justifyBetween: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        py: {
            paddingVertical: 8,
        },
        px: {
            paddingHorizontal: SIZES.padding,
        },
        borderBottom: {
            borderBottomWidth: 1,
            borderBottomColor: COLORS.secondary,
        },
    })

    return (
        <View
            style={style.container}
        >
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(COLORS.tertiary, false)}
                onPress={() => {
                    onChange(!value)
                }}
            >
                <View style={[style.justifyBetween, style.borderBottom, style.py, style.px]}>
                    <View style={[style.alignCenter, style.py]}>
                        <Text style={style.label}>
                            {label}
                        </Text>
                    </View>
                    <Switch
                        value={value}
                        style={{margin: 0, padding: 0}}
                        trackColor={{ false: COLORS.secondary, true: COLORS.primary }}
                        thumbColor={ value ? COLORS.primary : COLORS.secondary }
                        onValueChange={() => {
                            onChange(!value)
                        }}
                    />
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default SettingsItem
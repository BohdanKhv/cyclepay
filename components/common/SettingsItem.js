import { View, Text, Switch, StyleSheet, TouchableNativeFeedback } from "react-native"
import { FONTS, SIZES } from "../../constants/theme"
import { useSelector } from "react-redux"

export const SettingsItem = ({ value, onChange, label }) => {
    const { theme } = useSelector(state => state.local);

    const style = StyleSheet.create({
        container: {
            position: 'relative',
            overflow: 'hidden',
        },
        label: {
            color: theme.textDark,
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
            borderBottomColor: theme.secondary,
        },
    })

    return (
        <View
            style={style.container}
        >
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(theme.tertiary, false)}
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
                        trackColor={{ false: theme.secondary, true: theme.primary }}
                        thumbColor={ value ? theme.primary : theme.secondary }
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
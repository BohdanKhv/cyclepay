import { useState } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native"
import { COLORS, SIZES } from '../../constants/theme';

const ModelItem = ({value, label, disabled}) => {

    const style = StyleSheet.create({
        container: {
            position: 'relative',
            overflow: 'hidden',
        },
        textSecondary: {
            color: COLORS.textDark,
            fontSize: SIZES.h6,
            opacity: 0.5,
        },
        textMain: {
            color: COLORS.textDark,
            fontSize: SIZES.h4,
            fontWeight: 'bold',
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
        borderBottom: {
            borderBottomWidth: 1,
            borderBottomColor: COLORS.secondary,
        }
    })

    return (
        value ? (
            <View
                style={style.container}
            >
                <TouchableNativeFeedback
                    disabled={disabled}
                    background={TouchableNativeFeedback.Ripple(COLORS.tertiary, false)}
                >
                    <View style={[style.justifyBetween, style.borderBottom, {paddingHorizontal: SIZES.padding}]}>
                        <View style={[style.alignCenter, style.py]}>
                            <Text style={style.textSecondary}>
                                {label}
                            </Text>
                        </View>
                        <View style={[style.alignCenter, style.py]}>
                            <Text style={style.textMain}>
                                {value || `Enter ${label}`}
                            </Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        ) : null
    )
}

export default ModelItem
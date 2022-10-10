import { useState } from "react"
import { View, Text, Image, StyleSheet, TouchableNativeFeedback, Modal } from "react-native"
import { useSelector } from "react-redux"
import { FONTS, SIZES } from "../../constants/theme"
import { TextButton } from "../"
import icons from "../../constants/icons"

export const SettingsItemLabel = ({ onPress, label, value, confirm }) => {
    const { theme } = useSelector(state => state.local);
    const [showModal, setShowModal] = useState(false);

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
        <>
        <View
            style={style.container}
        >
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(theme.tertiary, false)}
                onPress={confirm ? () => setShowModal(true) : onPress}
            >
                <View style={[style.justifyBetween, style.borderBottom, style.py, style.px]}>
                    <View style={[style.alignCenter, style.py]}>
                        <Text style={style.label}>
                            {label}
                        </Text>
                    </View>
                    {value ? (
                        <Text style={{
                            color: theme.textDark,
                            ...FONTS.body3
                        }}>
                            {value}
                        </Text>
                    ) : (
                        <Image
                            source={icons.arrowRight}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: theme.textDark,
                            }}
                        />
                    )}
                </View>
            </TouchableNativeFeedback>
        </View>
        {confirm && (
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >   
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme.main
                    }}
                >
                    <View
                        style={{
                            width: '80%',
                            backgroundColor: theme.background,
                            borderRadius: 8,
                            padding: SIZES.padding,
                        }}
                    >
                        <Text style={{
                            color: theme.textDark,
                            ...FONTS.body3,
                            textAlign: 'center',
                        }}>
                            {confirm}
                        </Text>
                        <View
                            style={{    
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: SIZES.padding,
                            }}
                        >
                                <TextButton
                                    labelStyle={{
                                        color: theme.textDark,
                                    }}
                                    containerStyle={{
                                        flex: 1,
                                        marginRight: 4,
                                    }}
                                    color="transparent"
                                    label='Cancel'
                                    onPress={() => {
                                        setShowModal(false)
                                    }}
                                />
                                <TextButton
                                    labelStyle={{
                                        color: theme.textLight,
                                    }}
                                    containerStyle={{
                                        flex: 1,
                                        marginLeft: 4,
                                    }}
                                    color={theme.danger}
                                    onPress={() => {
                                        setShowModal(false)
                                        onPress()
                                    }}
                                    label='Confirm'
                                />
                        </View>
                    </View>
                </View>
            </Modal>
        )}
        </>
    )
}

export default SettingsItemLabel
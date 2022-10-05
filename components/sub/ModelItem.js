import { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Switch } from "react-native"
import { COLORS, SIZES } from '../../constants/theme';
import { IconButton } from '../'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import icons from "../../constants/icons";

const ModelItem = ({
    value,
    state,
    onChange,
    label,
    disabled,
    keyboardType,
    date,
    reminder,
}) => {
    const [displayInput, setDisplayInput] = useState(false);
    const inputRef = useRef(null);

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
        },
        input: {
            color: COLORS.textDark,
            backgroundColor: 'transparent',
            margin: 0,
            padding: 4,
            fontSize: SIZES.h4,
            fontWeight: '400',
            width: '100%',
            outline: 'none',
        },
        inputContainer: {
            justifyContent: 'flex-end',
            width: '65%',
        },
        centeredView: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.15)',
            width: '100%',
            height: '100%',
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
        },
        modalContainer: {
            width: '100%',
        },
        modalView: {
            backgroundColor: COLORS.main,
            borderRadius: SIZES.radius,
            padding: SIZES.padding,
            width: '100%',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        },
        modalText: {
            fontSize: SIZES.h3,
            color: COLORS.textDark,
            fontWeight: 'bold',
        },
    })

    return (
        value ? (
            <View
                style={style.container}
            >
                <TouchableNativeFeedback
                    disabled={disabled}
                    background={TouchableNativeFeedback.Ripple(COLORS.tertiary, false)}
                    onPress={() => {
                        !disabled && setDisplayInput(true);
                        reminder && onChange(!state);
                    }}
                >
                    <View style={[style.justifyBetween, style.borderBottom, {paddingHorizontal: SIZES.padding}]}>
                        <View style={[style.alignCenter, style.py]}>
                            <Text style={style.textSecondary}>
                                {label}
                            </Text>
                        </View>
                        <View style={[style.alignCenter, style.py, style.inputContainer]}>
                            {reminder ? (
                                <Switch
                                    value={state}
                                    style={{margin: 0, padding: 0}}
                                    onValueChange={onChange}
                                    trackColor={{ false: COLORS.secondary, true: COLORS.primary }}
                                    thumbColor={state ? COLORS.primary : COLORS.secondary}
                                    />
                            ) : (
                                <Text style={style.textMain}>
                                    {value || `Enter ${label}`}
                                </Text>
                            )}
                        </View>
                    </View>
                </TouchableNativeFeedback>
                {date ? (
                    <DateTimePickerModal
                        isVisible={displayInput}
                        style={{
                            borderRadius: SIZES.radius,
                        }}
                        mode="date"
                        onConfirm={(date) => {
                            onChange(date.getFullYear() + '-' +  (date.getMonth() + 1) + '-' + date.getDate() );
                            setDisplayInput(false);
                        }}
                        onCancel={() => {
                            setDisplayInput(false);
                        }}
                    />
                ) : !reminder && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={displayInput}
                    onShow={() => {
                        setTimeout(() => inputRef.current.focus(), 1)
                    }}
                    onRequestClose={() => {
                        setDisplayInput(false);
                    }}
                >
                    <TouchableOpacity
                        style={style.centeredView}
                        activeOpacity={1}
                        onPress={() => {
                            displayInput && setDisplayInput(false);
                        }}
                    >
                        <TouchableWithoutFeedback
                            style={style.modalContainer}
                        >
                            <View
                                style={style.modalView}
                            >
                                <View style={[
                                    {marginBottom: SIZES.padding},
                                    style.justifyBetween
                                ]}>
                                    <Text
                                        style={style.modalText}
                                    >
                                        {label}
                                    </Text>
                                    <IconButton
                                        icon={icons.close}
                                        width={SIZES.h3}
                                        height={SIZES.h3}
                                        onPress={() => {
                                            setDisplayInput(false);
                                        }}
                                    />
                                </View>
                                {displayInput && (
                                <TextInput
                                    ref={inputRef}
                                    keyboardType={keyboardType || 'default'}
                                    value={state}
                                    placeholder={value}
                                    placeholderTextColor={COLORS.gray50}
                                    onChangeText={onChange}
                                    style={style.input}
                                    onSubmitEditing={() => {
                                        setDisplayInput(false);
                                    }}
                                    onBlur={() => setDisplayInput(false)}
                                />
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
                )}
            </View>
        ) : null
    )
}

export default ModelItem
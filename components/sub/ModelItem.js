import { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Switch } from "react-native"
import { COLORS, FONTS, SIZES } from '../../constants/theme';
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
    maxLength,
    reminder,
}) => {
    const [displayInput, setDisplayInput] = useState(false);
    const inputRef = useRef(null);
    const [isInputFocused, setIsInputFocused] = useState(false);

    const style = StyleSheet.create({
        container: {
            position: 'relative',
            overflow: 'hidden',
        },
        textSecondary: {
            color: COLORS.textDark,
            opacity: 0.5,
            ...FONTS.body5,
        },
        textMain: {
            color: COLORS.textDark,
            fontWeight: 'bold',
            ...FONTS.h4,
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
            paddingHorizontal: 4,
            paddingVertical: 0,
            fontSize: SIZES.h4,
            fontWeight: '400',
            width: '100%',
            outline: 'none',
            borderBottomColor: isInputFocused ? COLORS.primary : COLORS.border,
            borderBottomWidth: 1,
        },
        inputContainer: {
            justifyContent: 'flex-end',
            width: '65%',
        },
        centeredView: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.35)',
            width: '100%',
            height: '100%',
            alignItems: "center",
        },
        modalContainer: {
            width: '100%',
        },
        modalView: {
            backgroundColor: COLORS.main,
            borderBottomLeftRadius: SIZES.radius,
            borderBottomRightRadius: SIZES.radius,
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
        modalHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: SIZES.padding,
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
                                <View 
                                    style={style.modalHeader}
                                >
                                    <Text
                                        style={style.modalText}
                                    >
                                        {label}
                                    </Text>
                                    <IconButton
                                        icon={icons.check}
                                        width={SIZES.h2}
                                        height={SIZES.h2}
                                        color={COLORS.primary}
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
                                    maxLength={maxLength || 100}
                                    placeholderTextColor={COLORS.gray50}
                                    onChangeText={onChange}
                                    style={style.input}
                                    onSubmitEditing={() => {
                                        setDisplayInput(false);
                                    }}
                                    onFocus={(e) => {
                                        setIsInputFocused(true);
                                        e.target.setSelection(0, state ? state.length : 0);
                                    }}
                                    onBlur={() => {
                                        setIsInputFocused(false);
                                        setDisplayInput(false);
                                    }}
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
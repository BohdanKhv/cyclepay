import { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Switch, StatusBar } from "react-native"
import { FONTS, SIZES } from '../../constants/theme';
import { IconButton, LineButton } from '../'
import DatePicker from 'react-native-date-picker'
import icons from "../../constants/icons";
import utils from "../../constants/utils";
import { useSelector } from "react-redux"

const SubInfoItem = ({
    stateLabel,
    state,
    onChange,
    label,
    disabled,
    keyboardType,
    date,
    maxLength,
    reminder,
    cycleBy,
    setCycleBy,
    isError
}) => {
    const { theme } = useSelector(state => state.local);
    const [displayInput, setDisplayInput] = useState(false);
    const inputRef = useRef(null);
    const [currDate, setCurrDate] = useState(state ? new Date(state) : new Date());
    const [isInputFocused, setIsInputFocused] = useState(false);

    const style = StyleSheet.create({
        container: {
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: isError ? '#ff5e5910' : 'transparent',
        },
        textSecondary: {
            color: theme.textDark,
            opacity: 0.5,
            ...FONTS.body5,
        },
        textMain: {
            color: theme.textDark,
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
            borderBottomWidth: 0.5,
            borderBottomColor: isError ? theme.danger : theme.secondary,
        },
        input: {
            color: theme.textDark,
            backgroundColor: 'transparent',
            margin: 0,
            paddingHorizontal: 4,
            paddingVertical: 0,
            fontSize: SIZES.h4,
            fontWeight: '400',
            width: '100%',
            outline: 'none',
            borderBottomColor: isInputFocused ? theme.primary : theme.border,
            borderBottomWidth: 1,
        },
        inputContainer: {
            justifyContent: 'flex-end',
            width: '65%',
        },
        centeredView: {
            flex: 1,
            backgroundColor: 'white',
            width: '100%',
            height: '100%',
            alignItems: "center",
        },
        modalContainer: {
            width: '100%',
        },
        modalView: {
            backgroundColor: theme.main,
            padding: SIZES.padding,
            width: '100%',
            height: '100%',
        },
        modalText: {
            fontSize: SIZES.h3,
            color: theme.textDark,
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
        <>
        {displayInput && (
            <StatusBar
                backgroundColor={'#202020'}
                translucent={true}
                barStyle='light-content'
            />
        )}
        <View
            style={style.container}
        >
            <TouchableNativeFeedback
                disabled={disabled}
                background={TouchableNativeFeedback.Ripple(theme.tertiary, false)}
                onPress={() => {
                    !disabled && !reminder && setDisplayInput(true);
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
                                trackColor={{ false: theme.secondary, true: theme.primary }}
                                thumbColor={state ? theme.primary : theme.secondary}
                                />
                        ) : (
                            <Text style={style.textMain}>
                                {stateLabel || 'Empty'}
                            </Text>
                        )}
                    </View>
                </View>
            </TouchableNativeFeedback>
            {!reminder && (
            <Modal
                animationType="fade"
                transparent={true}
                visible={displayInput}
                onShow={() => {
                    date && setCurrDate(new Date(state));
                    !date && inputRef && setTimeout(() => inputRef?.current?.focus(), 100);
                }}
                onRequestClose={() => {
                    setDisplayInput(false);
                }}
            >
                <TouchableOpacity
                    style={style.centeredView}
                    activeOpacity={1}
                    onPress={() => {
                        // displayInput && setDisplayInput(false);
                    }}
                >
                    <TouchableWithoutFeedback
                        style={style.modalContainer}>
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
                                    color={theme.primary}
                                    onPress={() => {
                                        setDisplayInput(false);
                                        date && onChange(utils.dateFormat(currDate));
                                    }}
                                />
                            </View>
                            {date ? (
                                <View style={{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                }}>
                                    <DatePicker
                                        open={displayInput}
                                        date={currDate}
                                        mode="date"
                                        maximumDate={new Date()}
                                        textColor={theme.textDark}
                                        androidVariant="iosClone"
                                        fadeToColor={theme.main}
                                        onDateChange={(date) => {
                                            setCurrDate(date);
                                        }}
                                        onCancel={() => {
                                            setDisplayInput(false);
                                        }}
                                    />
                                </View>
                            ) : 
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <View
                                        style={{
                                            flexGrow: 3,
                                        }}
                                    >
                                        <TextInput
                                            ref={inputRef}
                                            keyboardType={keyboardType || 'default'}
                                            value={state}
                                            placeholder={stateLabel}
                                            maxLength={maxLength || 100}
                                            placeholderTextColor={theme.gray50}
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
                                    </View>
                                    {setCycleBy && (
                                        <View
                                            style={{
                                                flexGrow: 0,
                                                marginLeft: SIZES.padding,
                                            }}
                                        >
                                        <View
                                            style={{
                                                alignSelf: 'flex-end',
                                            }}
                                        >
                                            <LineButton
                                                label={cycleBy === 'm' ? 'months' : 'days'}
                                                onPress={() => {
                                                    setCycleBy(cycleBy === 'm' ? 'd' : 'm');
                                                }}
                                            />
                                        </View>
                                    </View>
                                    )}
                                </View>
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
            )}
        </View>
        </>
    )
}

export default SubInfoItem
import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Animated, Pressable, StyleSheet, KeyboardAwareScrollView } from 'react-native';

import { TextButton, ModelItem } from '../';
import { COLORS, FONTS, SIZES } from '../../constants/theme';


const SubModelAdd = ({ item, isOpen, setIsOpen }) => {
    const animation = useRef(new Animated.Value(0)).current;

    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [cycle, setCycle] = useState("");
    const [firstBill, setFirstBill] = useState("");
    const [reminder, setReminder] = useState(false);

    useEffect(() => {
        if(item) {
            item.description && setDescription(item.description);
            item.price && setPrice(item.price.toString());
            item.cycle && setCycle(item.cycle.toString());
        }
    }, [item])

    useEffect(() => {
        if(isOpen){
            Animated.timing(animation, {
                toValue: 1,
                duration: SIZES.animationDuration,
                useNativeDriver: true
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: SIZES.animationDuration,
                useNativeDriver: true,
            }).start();
        }

        return () => {
            setDescription("");
            setPrice("");
            setCycle("");
            setFirstBill("");
            setReminder(false);
        }
    }, [isOpen]);

    const style = StyleSheet.create({
        justifyBetween: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    })

    return (
    <>
        {/* Darken background */}
        {isOpen && (
            <Animated.View 
                style={{
                    position: 'absolute',
                    bottom: 0,
                    height: '100%',
                    width: SIZES.width,
                }}
                opacity={animation}
            >
                {/* Background container */}
                <Pressable
                    style={{
                        flex: 1,
                        height: '100%',
                        width: SIZES.width,
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                    onPress={() => setIsOpen(false)}
                />
            </Animated.View>
        )}

        {/* Content Container */}
        <Animated.View
            style={{
                position: 'absolute',
                height: '100%',
                flex: 1,
                width: SIZES.width,
                backgroundColor: COLORS.main,
                borderTopLeftRadius: SIZES.radius,
                borderTopRightRadius: SIZES.radius,
                transform: [
                    {
                        translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                                SIZES.height + 150,
                                SIZES.height - 360
                            ]
                        })
                    }
                ]
            }}
        >
            <View>
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    paddingHorizontal: SIZES.padding,
                    borderBottomWidth: 1,
                    paddingVertical: SIZES.padding,
                    borderBottomColor: COLORS.secondary,
                }}
            >
                <View style={style.alignCenter}>
                    <Text
                        style={{
                            color: COLORS.textDark,
                            ...FONTS.h2,
                        }}
                    >
                        {item?.name}
                    </Text>
                </View>
                <TextButton
                    label='Close'
                    containerStyle={{
                        backgroundColor: 'transparent',
                    }}
                    labelStyle={{
                        color: COLORS.textDark,
                    }}
                    color={'transparent'}
                    onPress={() => {
                        setIsOpen(false);
                    }}
                />
            </View>

            {/* Body */}
            <View
                style={{
                    paddingVertical: SIZES.padding,
                }}
            >
                <ModelItem
                    label='Description'
                    value={description || "Enter a description"}
                    state={description}
                    maxLength={50}
                    onChange={setDescription}
                />
                <ModelItem
                    label='First Bill'
                    value={
                        firstBill ? new Date(firstBill).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric' || "yyyy-mm-dd"})
                            : "Enter a date"
                        }
                    state={firstBill}
                    onChange={setFirstBill}
                    date
                />
                <ModelItem
                    label='Price'
                    value={price || "$ 0.00"}
                    state={price}
                    maxLength={6}
                    keyboardType='numeric'
                    onChange={setPrice}
                />
                <ModelItem
                    label='Cycle'
                    value={cycle || "1 month"}
                    maxLength={2}
                    state={cycle}
                    keyboardType='numeric'
                    onChange={setCycle}
                />
                <ModelItem
                    label='Reminder'
                    value={reminder || "Off"}
                    state={reminder}
                    onChange={setReminder}
                    reminder
                />
            </View>
            {/* Actions */}
            <View 
                style={{
                    paddingTop: 12,
                    paddingHorizontal: SIZES.padding,
                }}>
                <TextButton
                    labelStyle={{
                        color: COLORS.textLight,
                    }}
                    containerStyle={{
                        borderColor: COLORS.primary,
                        borderWidth: 1,
                        marginLeft: 4,
                    }}
                    color={COLORS.primary}
                    borderColor="transparent"
                    label='Add subscription'
                />
            </View>
            </View>
        </Animated.View>
        </>
    )
}

export default SubModelAdd;
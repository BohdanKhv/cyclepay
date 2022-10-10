import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, Animated, Pressable, StyleSheet, KeyboardAwareScrollView } from 'react-native';
import { useSelector, useDispatch } from "react-redux"

import { TextButton, ModelItem } from '../';
import { FONTS, SIZES } from '../../constants/theme';
import { addSub } from "../../store/features/sub/subSlice"
import utils from '../../constants/utils';


const SubModelAdd = ({ item, isOpen, setIsOpen, setAlertMsg }) => {
    const { theme } = useSelector(state => state.local);
    const dispatch = useDispatch();
    const animation = useRef(new Animated.Value(0)).current;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [cycle, setCycle] = useState("");
    const [firstBill, setFirstBill] = useState(utils.dateFormat(new Date()));
    const [reminder, setReminder] = useState(false);

    useEffect(() => {
        if(item) {
            item.name && setName(item.name);
            item.description && setDescription(item.description);
            item.price && setPrice(item.price.toString());
            item.cycle && setCycle(item.cycle.toString());
            item.firstBill && setFirstBill(utils.dateFormat(new Date()));
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

    const handleAdd = () => {
        const newItem = {
            ...item,
            name,
            description,
            price: parseFloat(price),
            cycle: parseInt(cycle),
            firstBill,
            nextBill: utils.dateFormat(utils.calcNewBill(firstBill, parseInt(cycle))),
            reminder,
        }
        dispatch(addSub(newItem));
        setIsOpen(false);
        setAlertMsg("Subscription added");
    }

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
                backgroundColor: theme.main,
                borderTopLeftRadius: SIZES.radius,
                borderTopRightRadius: SIZES.radius,
                transform: [
                    {
                        translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                                SIZES.height + 150,
                                SIZES.height - 366
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
                        borderBottomColor: theme.secondary,
                    }}
                >
                    <View style={style.alignCenter}>
                        <Text
                            style={{
                                color: theme.textDark,
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
                            color: theme.textDark,
                        }}
                        color={'transparent'}
                        onPress={() => {
                            setIsOpen(false);
                        }}
                    />
                </View>

                {/* Body */}
                <View>
                    <ModelItem
                        label='Name'
                        stateLabel={name || 'Enter name'}
                        state={name}
                        maxLength={20}
                        onChange={setName}
                    />
                    <ModelItem
                        label='Description'
                        stateLabel={description || 'Enter description'}
                        state={description}
                        maxLength={50}
                        onChange={setDescription}
                    />
                    <ModelItem
                        label='First Bill'
                        stateLabel={firstBill ? utils.dateConverter(firstBill) : 'Enter first bill'}
                        state={firstBill ? firstBill : new Date()}
                        onChange={setFirstBill}
                        date
                    />
                    <ModelItem
                        label='Price'
                        stateLabel={price ? `$ ${price}` : 'Enter price'}
                        state={price}
                        maxLength={6}
                        keyboardType='numeric'
                        onChange={setPrice}
                    />
                    <ModelItem
                        label='Cycle'
                        stateLabel={cycle ? `${cycle} months` : 'Enter cycle'}
                        maxLength={2}
                        state={cycle}
                        keyboardType='numeric'
                        onChange={setCycle}
                    />
                    <ModelItem
                        label='Reminder'
                        state={reminder}
                        onChange={setReminder}
                        reminder
                    />
                </View>
                {/* Actions */}
                <View 
                    style={{
                        padding: SIZES.padding,
                    }}>
                    <TextButton
                        labelStyle={{
                            color: theme.textLight,
                        }}
                        containerStyle={{
                            borderColor: theme.primary,
                            borderWidth: 1,
                            marginLeft: 4,
                        }}
                        onPress={handleAdd}
                        color={theme.primary}
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
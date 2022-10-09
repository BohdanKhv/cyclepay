import { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, Pressable, StyleSheet } from 'react-native';

import { TextButton, ModelItem } from '../';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import utils from '../../constants/utils';


const SubModel = ({ item, isOpen, setIsOpen }) => {
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
            item.firstBill && setFirstBill(item.firstBill);
            item.reminder && setReminder(item.reminder);
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
                useNativeDriver: true
            }).start();
        }
    }, [isOpen]);

    const countAmountOfCycles = (cycle, firstBill) => {
        if(cycle && firstBill){
            const today = new Date();
            const startDate = new Date(firstBill);
            const diff = today.getTime() - startDate.getTime();
            const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
            const cycles = Math.floor((months / cycle) + 1); // +1 because we want to include the current cycle
            return cycles || 0;
        }
    }

    const countTotalPaid = (cycle, firstBill) => {
        if(cycle && firstBill){
            const today = new Date();
            const startDate = new Date(firstBill);
            const diff = +today - +startDate;
            const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
            const cycles = Math.floor(months / cycle);
            const totalPaid = (cycles + 1) * item.price; // +1 because we want to include the current cycle
            return totalPaid;
        }
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
                backgroundColor: COLORS.main,
                borderTopLeftRadius: SIZES.radius,
                borderTopRightRadius: SIZES.radius,
                transform: [
                    {
                        translateY: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [SIZES.height + 150, SIZES.height - 470]
                        })
                    }
                ]
            }}
        >
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    paddingHorizontal: SIZES.padding,
                    paddingVertical: SIZES.padding,
                    borderBottomWidth: 1,
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
                    label='Delete'
                    containerStyle={{
                        backgroundColor: 'transparent',
                    }}
                    labelStyle={{
                        color: COLORS.danger,
                        ...SIZES.h3
                    }}
                    color={'transparent'}
                    onPress={() => {
                        setIsOpen(false);
                    }}
                />
            </View>

            {/* Body */}
            <View style={{
                paddingVertical: SIZES.padding,
            }}>
                <ModelItem
                    label='Description'
                    stateLabel={description || 'No description'}
                    maxLength={20}
                    state={description}
                    onChange={setDescription}
                />
                <ModelItem
                    label='First Bill'
                    stateLabel={firstBill ? utils.dateConverter(firstBill) : "Enter a date"}
                    state={firstBill}
                    onChange={setFirstBill}
                    date
                />
                <ModelItem
                    label='Price'
                    stateLabel={price ? `$ ${price}` : "Enter a price"}
                    maxLength={6}
                    state={price}
                    keyboardType='numeric'
                    onChange={setPrice}
                />
                <ModelItem
                    label='Cycle'
                    stateLabel={cycle ? `${cycle} months` : "Enter a cycle"}
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
                <ModelItem
                    label='Next Bill'
                    stateLabel={item && item.nextBill ? utils.dateConverter(item.nextBill) : "No date"}
                    disabled
                />
                <ModelItem
                    label='Total Paid'
                    stateLabel={`$${countTotalPaid(item?.cycle, item?.firstBill)}`}
                    disabled
                />
                <ModelItem
                    label='Cycles'
                    stateLabel={`${countAmountOfCycles(item?.cycle, item?.firstBill)} cycles`}
                    disabled
                />
            </View>

            {/* Actions */}
            <View style={[
                {
                    paddingTop: 12,
                    paddingHorizontal: SIZES.padding,
                }, style.justifyBetween]}>
                <TextButton
                    labelStyle={{
                        color: COLORS.textDark,
                    }}
                    containerStyle={{
                        flex: 1,
                        marginRight: 4,
                    }}
                    color="transparent"
                    label='Close'
                    onPress={() => {
                        setIsOpen(false);
                    }}
                />
                <TextButton
                    labelStyle={{
                        color: COLORS.textLight,
                    }}
                    containerStyle={{
                        backgroundColor: COLORS.textDark,
                        flex: 1,
                        marginLeft: 4,
                    }}
                    label='Save'
                />
            </View>
        </Animated.View>
        </>
    )
}

export default SubModel;
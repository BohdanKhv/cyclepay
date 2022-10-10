import { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, Pressable, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux"

import { TextButton, ModelItem, TotalInfo } from '../';
import { FONTS, SIZES } from '../../constants/theme';
import { updateSub, deleteSub } from "../../store/features/sub/subSlice"
import utils from '../../constants/utils';
import icons from '../../constants/icons';


const SubModel = ({ item, isOpen, setIsOpen, setAlertMsg }) => {
    const { theme } = useSelector(state => state.local);
    const dispatch = useDispatch();
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

    const handleUpdate = () => {
        const newItem = {
            ...item,
            description,
            price: parseFloat(price),
            cycle: parseInt(cycle),
            firstBill,
            nextBill: utils.dateFormat(utils.calcNewBill(firstBill, parseInt(cycle))),
            reminder,
        }
        dispatch(updateSub(newItem));
        setIsOpen(false);
        setAlertMsg("Subscription updated");
    }

    const handleDelete = () => {
        dispatch(deleteSub(item));
        setIsOpen(false);
        setAlertMsg("Subscription deleted");
    }

    const style = StyleSheet.create({
        justifyBetween: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        totalInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
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
                            outputRange: [SIZES.height + 150, SIZES.height - 396]
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
                    label='Delete'
                    containerStyle={{
                        backgroundColor: 'transparent',
                    }}
                    labelStyle={{
                        color: theme.danger,
                        ...SIZES.h3
                    }}
                    color={'transparent'}
                    onPress={handleDelete}
                />
            </View>

            {/* Body */}
            <View>
                <View style={style.totalInfo}>
                    <TotalInfo
                        label={`$${item && utils.countTotalPaid(item.cycle, item.firstBill, item.price)}`}
                        secondaryLabel='Paid'
                        icon={icons.total}
                    />
                    <TotalInfo
                        label={item && item.nextBill ? utils.dateConverter(item.nextBill) : "N/A"}
                        secondaryLabel='Next Bill'
                        icon={icons.date}
                    />
                    <TotalInfo
                        label={`${item && utils.countAmountOfCycles(item.cycle, item.firstBill)}`}
                        secondaryLabel='Cycles'
                        icon={icons.cycle}
                    />
                    </View>
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
            </View>

            {/* Actions */}
            <View style={[
                {
                    padding: SIZES.padding,
                }, style.justifyBetween]}>
                <TextButton
                    labelStyle={{
                        color: theme.textDark,
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
                        color: theme.textLight,
                    }}
                    containerStyle={{
                        flex: 1,
                        marginLeft: 4,
                    }}
                    color={theme.primary}
                    label='Save'
                    onPress={handleUpdate}
                />
            </View>
        </Animated.View>
        </>
    )
}

export default SubModel;
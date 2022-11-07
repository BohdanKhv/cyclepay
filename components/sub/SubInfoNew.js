import { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet, BackHandler } from 'react-native';
import { useSelector, useDispatch } from "react-redux"
import notifee, { TriggerType } from '@notifee/react-native';

import { TextButton, SubInfoItem, Modal } from '../';
import { FONTS, SIZES } from '../../constants/theme';
import { addSub } from "../../store/features/sub/subSlice"
import utils from '../../constants/utils';


const SubInfoNew = ({ item, isOpen, setIsOpen, setAlertMsg, setSelectedItem }) => {
    const { theme, channelId } = useSelector(state => state.local);
    const dispatch = useDispatch();
    const animation = useRef(new Animated.Value(0)).current;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [cycle, setCycle] = useState("");
    const [cycleBy, setCycleBy] = useState("m");
    const [firstBill, setFirstBill] = useState(utils.dateFormat(new Date()));
    const [reminder, setReminder] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [cycleError, setCycleError] = useState(false);
    const [firstBillError, setFirstBillError] = useState(false);

    useEffect(() => {
        if(item) {
            item.name && setName(item.name);
            item.description && setDescription(item.description);
            item.price && setPrice(item.price.toString());
            item.cycle && setCycle(item.cycle.toString());
            item.cycleBy && setCycleBy(item.cycleBy);
            setFirstBill(utils.dateFormat(new Date()));
        }
    }, [item])

    const handleBackPress = () => {
        setIsOpen(false);
        return true;
    }

    useEffect(() => {
        if(isOpen) {
            BackHandler.addEventListener("hardwareBackPress", handleBackPress);
        } else {
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        }
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
        }
    }, [isOpen])

    const createNotification = async (date) => {
        const newDate = new Date(date);
        newDate.setHours(11);
        newDate.setMinutes(10);

        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: newDate.getTime(),
        };

        const onlyNumberFromId = `${item.id}`.replaceAll(/\D/g, '')+'42';

        await notifee.createTriggerNotification(
            {
                id: onlyNumberFromId,
                title: item.name, 
                subtitle: 'Reminder',
                body: `Your $${item.price} subscription is due today!`,
                android: {
                    channelId: channelId || 'reminder',
                },
            },
            trigger,
        );
    }

    const handleAdd = () => {
        const newDate = utils.calcNewBill(firstBill, parseInt(cycle), cycleBy);
        const newItem = {
            ...item,
            id: utils.generateId(),
            name,
            description,
            price: parseFloat(price),
            cycle: parseInt(cycle),
            cycleBy,
            firstBill,
            nextBill: utils.calcNewBill(firstBill, parseInt(cycle), cycleBy),
            reminder,
        }

        if(reminder) {
            createNotification(newDate);
        }

        if(newItem.name) setNameError(false);
        if(newItem.price) setPriceError(false);
        if(newItem.cycle) setCycleError(false);
        if(newItem.firstBill) setFirstBillError(false);

        // Check if name is empty
        if(newItem.name.replaceAll(/\s/g, '').length === 0) {
            setNameError(true);
            return;
        }

        // Check if price is empty
        if(newItem.price.toString().replaceAll(/\s/g, '').length === 0) {
            setPriceError(true);
            return;
        }

        // Check if cycle is empty
        if(newItem.cycle.toString().replaceAll(/\s/g, '').length === 0) {
            setCycleError(true);
            return;
        }

        if(newItem.name && newItem.price && newItem.cycle && newItem.firstBill) {
            dispatch(addSub({
                ...newItem,
                name: newItem.name.trim(),
                description: newItem.description.trim(),
            }));
            setIsOpen(false);
            setAlertMsg("Subscription added");
        } else {
            if(!newItem.name) setNameError(true);
            if(!newItem.price) setPriceError(true);
            if(!newItem.cycle) setCycleError(true);
            if(!newItem.firstBill) setFirstBillError(true);
        }
    }

    const style = StyleSheet.create({
        justifyBetween: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    })

    const handleClose = () => {
        setSelectedItem(null);
        setNameError(false);
        setPriceError(false);
        setCycleError(false);
        setFirstBillError(false);
        setDescription("");
        setPrice("");
        setCycle("");
        setCycleBy("m");
        setFirstBill("");
        setReminder(false);
    }

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClose={handleClose}
            modalHeight={363}
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
                    <SubInfoItem
                        label='Name'
                        stateLabel={name || 'Enter name'}
                        state={name}
                        maxLength={20}
                        onChange={setName}
                        isError={nameError}
                    />
                    <SubInfoItem
                        label='Description'
                        stateLabel={description || 'Enter description'}
                        state={description}
                        maxLength={50}
                        onChange={setDescription}
                    />
                    <SubInfoItem
                        label='First Bill'
                        stateLabel={firstBill ? utils.dateConverter(firstBill) : 'Enter first bill'}
                        state={firstBill ? firstBill : new Date()}
                        onChange={setFirstBill}
                        isError={firstBillError}
                        date
                    />
                    <SubInfoItem
                        label='Price'
                        stateLabel={price ? `$ ${price}` : 'Enter price'}
                        state={price}
                        maxLength={6}
                        keyboardType='numeric'
                        onChange={setPrice}
                        isError={priceError}
                    />
                    <SubInfoItem
                        label='Cycle'
                        stateLabel={cycle ? `${cycle} ${cycleBy === 'm' ? 'month' : 'day' }${cycle == 1 ? '' : 's'}` : "Enter a cycle"}
                        cycleBy={cycleBy}
                        setCycleBy={setCycleBy}
                        maxLength={2}
                        state={cycle}
                        keyboardType='numeric'
                        onChange={setCycle}
                        isError={cycleError}
                    />
                    <SubInfoItem
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
        </Modal>
    )
}

export default SubInfoNew;
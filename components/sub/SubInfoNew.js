import { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux"

import { TextButton, SubInfoItem, Modal } from '../';
import { FONTS, SIZES } from '../../constants/theme';
import { addSub } from "../../store/features/sub/subSlice"
import utils from '../../constants/utils';


const SubInfoNew = ({ item, isOpen, setIsOpen, setAlertMsg, setSelectedItem }) => {
    const { theme } = useSelector(state => state.local);
    const dispatch = useDispatch();
    const animation = useRef(new Animated.Value(0)).current;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [cycle, setCycle] = useState("");
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
            setFirstBill(utils.dateFormat(new Date()));
        }
    }, [item])

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

        if(newItem.name) setNameError(false);
        if(newItem.price) setPriceError(false);
        if(newItem.cycle) setCycleError(false);
        if(newItem.firstBill) setFirstBillError(false);

        if(newItem.name && newItem.price && newItem.cycle && newItem.firstBill) {
            dispatch(addSub(newItem));
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
                        stateLabel={cycle ? `${cycle} month${cycle == 1 ? '' : 's'}` : 'Enter cycle'}
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
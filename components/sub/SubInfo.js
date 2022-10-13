import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux"

import { TextButton, SubInfoItem, SubInfoItemTotal, Modal } from '../';
import { FONTS, SIZES } from '../../constants/theme';
import { updateSub, deleteSub } from "../../store/features/sub/subSlice"
import utils from '../../constants/utils';
import icons from '../../constants/icons';


const SubInfo = ({ item, isOpen, setIsOpen, setAlertMsg, setSelectedItem }) => {
    const { theme } = useSelector(state => state.local);
    const dispatch = useDispatch();

    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [cycle, setCycle] = useState("");
    const [firstBill, setFirstBill] = useState("");
    const [reminder, setReminder] = useState(false);

    const [priceError, setPriceError] = useState(false);
    const [cycleError, setCycleError] = useState(false);
    const [firstBillError, setFirstBillError] = useState(false);

    useEffect(() => {
        if(item) {
            item.description && setDescription(item.description);
            item.price && setPrice(item.price.toString());
            item.cycle && setCycle(item.cycle.toString());
            item.firstBill && setFirstBill(item.firstBill);
            item.reminder && setReminder(item.reminder);
        }
    }, [item])

    const handleUpdate = () => {
        const newItem = {
            ...item,
            description,
            price: parseFloat(price),
            cycle: parseInt(cycle),
            firstBill,
            nextBill: utils.calcNewBill(firstBill, parseInt(cycle)),
            reminder,
        }

        if(newItem.price) setPriceError(false);
        if(newItem.cycle) setCycleError(false);
        if(newItem.firstBill) setFirstBillError(false);

        if(newItem.name && newItem.price && newItem.cycle && newItem.firstBill) {
            dispatch(updateSub(newItem));
            setIsOpen(false);
            setAlertMsg("Subscription updated");
        } else {
            if(!newItem.price) setPriceError(true);
            if(!newItem.cycle) setCycleError(true);
            if(!newItem.firstBill) setFirstBillError(true);
        }
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

    const handleClose = () => {
        setSelectedItem(null);
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
        modalHeight={393}
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
                    <SubInfoItemTotal
                        label={`$${item && 
                            utils.addComaToNumber(
                                utils.countTotalPaid(item.cycle, item.firstBill, item.price)
                                )
                            }`}
                        secondaryLabel='Paid'
                        icon={icons.total}
                    />
                    <SubInfoItemTotal
                        label={item && item.nextBill ? utils.dateConverter(item.nextBill) : "N/A"}
                        secondaryLabel='Next Bill'
                        icon={icons.date}
                    />
                    <SubInfoItemTotal
                        label={`${item && utils.countAmountOfCycles(item.cycle, item.firstBill)}`}
                        secondaryLabel='Cycles'
                        icon={icons.cycle}
                    />
                    </View>
                <SubInfoItem
                    label='Description'
                    stateLabel={description || 'No description'}
                    maxLength={20}
                    state={description}
                    onChange={setDescription}
                />
                <SubInfoItem
                    label='First Bill'
                    stateLabel={firstBill ? utils.dateConverter(firstBill) : "Enter a date"}
                    state={firstBill}
                    onChange={setFirstBill}
                    isError={firstBillError}
                    date
                />
                <SubInfoItem
                    label='Price'
                    stateLabel={price ? `$ ${price}` : "Enter a price"}
                    maxLength={6}
                    state={price}
                    keyboardType='numeric'
                    isError={priceError}
                    onChange={setPrice}
                />
                <SubInfoItem
                    label='Cycle'
                    stateLabel={cycle ? `${cycle} months` : "Enter a cycle"}
                    maxLength={2}
                    state={cycle}
                    keyboardType='numeric'
                    isError={cycleError}
                    onChange={setCycle}
                />
                <SubInfoItem
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
        </Modal>
    )
}

export default SubInfo;
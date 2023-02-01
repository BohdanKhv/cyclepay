import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { FONTS, SIZES } from "../../constants/theme"
import { updateSub } from "../../store/features/sub/subSlice"
import utils from '../../constants/utils';
import notifee, { TriggerType } from '@notifee/react-native';


const SubCard = ({item, setSelectedItem, setModalOpen}) => {
    const { theme, infoNextBill, channelId } = useSelector(state => state.local);
    const [rippleOverflow, setRippleOverflow] = useState(false);
    const dispatch = useDispatch();

    const createNotification = async (date) => {
        const newDate = new Date(date);
        newDate.setHours(11);
        newDate.setMinutes(10);

        // Set date to 10 seconds from now to test
        // const newDate = new Date(Date.now() + 10000);

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

    const updateItem = async () => {
        const newDate = utils.calcNewBill(item.nextBill, item.cycle, item.cycleBy);
        if(item.reminder) {
            createNotification(newDate);
        }
        dispatch(updateSub({
            ...item,
            nextBill: newDate,
        }))
    }

    useEffect(() => {
        if (item) {
            if(new Date(item.nextBill) < new Date()) {
                updateItem();
            }
        }
    }, [item])

    const style = StyleSheet.create({
        container: {
            paddingHorizontal: SIZES.padding,
            paddingBottom: 8,
        },
        itemBody: {
            backgroundColor: theme.main,
            color: theme.textDark,
            borderRadius: SIZES.radius,
            borderColor: theme.border,
            overflow: 'hidden',
            borderWidth: 1,
        },
        itemWrapper: {
            paddingHorizontal: 10,
            paddingVertical: 12,
            borderRadius: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        textMain: {
            color: theme.textDark,
            ...FONTS.h3,
        },
        textSecondary: {
            color: theme.textDark,
            opacity: 0.5,
            ...FONTS.body5,
        },
        textTertiary: {
            color: theme.textDark,
            opacity: 0.5,
            ...FONTS.h5,
        },
        columnEmd: {
            flexDirection: 'column',
            alignItems: 'flex-end',
        },
        thumbnailWrapper: {
            width: 36,
            height: 36,
            padding: 4,
            borderRadius: 50,
            overflow: 'hidden',
            backgroundColor: "white",
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
        },
        thumbnail: {
            width: 25,
            height: 25,
            backgroundColor: "white",
            // tintColor: theme.textDark,
        },
    })

    return (
        <>
        <View
            style={style.container}
        >
            <View
                style={style.itemBody}
            >
                <TouchableNativeFeedback
                    onPress={() => {
                        setSelectedItem(item);
                        setModalOpen(true);
                        setRippleOverflow(!rippleOverflow);
                    }}
                    background={TouchableNativeFeedback.Ripple(theme.tertiary, rippleOverflow)}
                >
                    <View style={style.itemWrapper}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <View style={style.thumbnailWrapper}>
                                <Image
                                    source={item.thumbnail}
                                    style={style.thumbnail}
                                />
                            </View>
                            <View>
                                <Text style={style.textMain}>
                                    {item.name}
                                </Text>
                                <Text style={style.textSecondary}>
                                    {item.description}
                                </Text>
                            </View>
                        </View>
                        <View
                            style={style.columnEmd}
                        >
                            <Text style={style.textMain}>
                                $ {item.price}
                            </Text>
                            <Text style={style.textSecondary}>
                                {item.cycle} {item.cycleBy === 'm' ? 'Month' : 'Day'}{item.cycle == 1 ? '' : 's'}
                            </Text>
                            <Text style={style.textTertiary}>
                                {infoNextBill === 'date' ? (
                                    utils.dateConverter(item.nextBill)
                                ) : (
                                    '~' + utils.amountOfDaysBetweenTwoDates(new Date(), item.nextBill) + ' Days'
                                )}
                            </Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
        </>
    )
}

export default SubCard
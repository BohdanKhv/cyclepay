import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native'
import { FONTS, SIZES } from "../../constants/theme"
import { useSelector } from "react-redux"
import icons from '../../constants/icons';
import itemsImg from '../../constants/itemsImg';
import utils from '../../constants/utils';


const SubCardCustomNew = ({setSelectedItem, setModalOpen}) => {
    const { theme } = useSelector(state => state.local);
    const [rippleOverflow, setRippleOverflow] = useState(false);

    const style = StyleSheet.create({
        container: {
            paddingHorizontal: SIZES.padding,
            paddingBottom: 8,
        },
        itemBody: {
            backgroundColor: theme.textLight,
            color: theme.textDark,
            borderRadius: SIZES.radius,
            backgroundColor: theme.main,
            borderColor: theme.secondary,
            overflow: 'hidden',
            borderWidth: 1,
        },
        itemWrapper: {
            paddingHorizontal: 10,
            paddingVertical: 12,
            borderRadius: SIZES.radius,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        textMain: {
            color: theme.textDark,
            ...FONTS.h3,
        },
        textSecondary: {
            color: theme.textDark,
            ...FONTS.body5,
            opacity: 0.5,
        },
        columnEmd: {
            flexDirection: 'column',
            alignItems: 'flex-end',
            paddingRight: 10,
        },
        thumbnailWrapper: {
            width: 36,
            height: 36,
            padding: 4,
            borderRadius: 50,
            overflow: 'hidden',
            backgroundColor: "white",
            flexDirection: 'row',
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

    const selectItem = () => {
        setSelectedItem({
            id: 0,
            name: "Custom",
            description: "Custom service",
            firstBill: utils.dateFormat(new Date()),
            image: "",
            price: '9.99',
            cycle: 1,
            thumbnail: itemsImg.money,
            reminder: false
        });
        setModalOpen(true);
        setRippleOverflow(!rippleOverflow);
    }

    return (
        <>
        <View
            style={style.container}
        >
            <View
                style={style.itemBody}
            >
                <TouchableNativeFeedback
                    onPress={selectItem}
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
                                    source={itemsImg.money}
                                    style={style.thumbnail}
                                />
                            </View>
                            <View>
                                <Text style={style.textMain}>
                                    Custom Service
                                </Text>
                                <Text style={style.textSecondary}>
                                    Add a custom service
                                </Text>
                            </View>
                        </View>
                        <View
                            style={style.columnEmd}
                        >
                            <Image
                                source={icons.plus}
                                style={{
                                    width: 18,
                                    height: 18,
                                    tintColor: theme.textDark,
                                }}
                            />
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
        </>
    )
}

export default SubCardCustomNew
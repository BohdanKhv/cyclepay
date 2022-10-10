import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native'
import { FONTS, SIZES } from "../../constants/theme"
import { useSelector } from "react-redux"
import icons from '../../constants/icons';
import utils from '../../constants/utils';


const SubCustomAdd = ({setSelectedItem, setModelOpen}) => {
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
        thumbnail: {
            width: 36,
            height: 36,
            borderRadius: 18,
            marginRight: 10,
            backgroundColor: "white",
            resizeMode: 'contain',
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
            reminder: false
        });
        setModelOpen(true);
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
                            <Image
                                source={{
                                    uri: null,
                                    cache: 'only-if-cached',
                                }}
                                style={style.thumbnail}
                            />
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

export default SubCustomAdd
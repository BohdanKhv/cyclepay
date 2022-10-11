import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native'
import { FONTS, SIZES } from "../../constants/theme"
import utils from '../../constants/utils';
import { useSelector } from "react-redux"


const SubCard = ({item, setSelectedItem, setModalOpen}) => {
    const { theme } = useSelector(state => state.local);
    const [rippleOverflow, setRippleOverflow] = useState(false);

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
            alignItems: 'center',
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
            ...FONTS.body5,
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
                            <Text style={style.textTertiary}>
                                Next Bill:
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
                        <Text style={style.textTertiary}>
                            {utils.dateConverter(item.nextBill)}
                        </Text>
                        <Text style={style.textSecondary}>
                            {item.cycle} Month{item.cycle > 1 ? 's' : ''}
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
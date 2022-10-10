import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { FONTS, SIZES } from "../../constants/theme"
import { useSelector } from "react-redux"


const SubItem = ({item, setSelectedItem, setModelOpen}) => {
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
        thumbnail: {
            width: 36,
            height: 36,
            borderRadius: 18,
            marginRight: 10,
            backgroundColor: 'white',
            resizeMode: 'contain',
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
                        setModelOpen(true);
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
                        <Image
                            source={{
                                uri: item.thumbnail
                            }}
                            style={style.thumbnail}
                        />
                        <View>
                            <Text style={style.textMain}>
                                {item.name}
                            </Text>
                            <Text style={style.textSecondary}>
                                {item.description}
                            </Text>
                            <Text style={style.textTertiary}>
                                Next Bill:
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
                            {item.cycle} Month{item.cycle > 1 ? 's' : ''}
                        </Text>
                        <Text style={style.textTertiary}>
                            {new Date(item.nextBill).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: '2-digit'})}
                        </Text>
                    </View>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </View>
        </>
    )
}

export default SubItem
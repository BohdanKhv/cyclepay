import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { COLORS, SIZES } from "../../constants/theme"


const SubItem = ({item, setSelectedItem, setModelOpen}) => {
    const [rippleOverflow, setRippleOverflow] = useState(false);

    const style = StyleSheet.create({
        container: {
            paddingHorizontal: SIZES.padding,
            paddingBottom: 8,
        },
        itemBody: {
            backgroundColor: COLORS.textLight,
            color: COLORS.textDark,
            borderRadius: SIZES.radius,
            borderColor: COLORS.secondary,
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
            color: COLORS.textDark,
            fontSize: SIZES.h3,
            fontWeight: 'bold',
        },
        textSecondary: {
            color: COLORS.textDark,
            fontSize: SIZES.h5,
            opacity: 0.5,
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
            resizeMode: 'contain',
            // tintColor: COLORS.textDark,
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
                    background={TouchableNativeFeedback.Ripple(COLORS.tertiary, rippleOverflow)}
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
                            <Text style={style.textSecondary}>
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
                        <Text style={style.textSecondary}>
                            {new Date(item.nextBill).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
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
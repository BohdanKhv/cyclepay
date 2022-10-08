import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableNativeFeedback } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import data from "../../constants/dummyData";


const Info = () => {
    const [ totalPerMonth, setTotalPerMonth ] = useState(0)
    const [ totalType, setTotalType ] = useState('month')

    useEffect(() => {
        if(totalType === 'month')
            setTotalPerMonth(calcPerMonth(data));
        else if (totalType === 'year')
            setTotalPerMonth(calcPerYear(data));
        else if (totalType === 'day')
            setTotalPerMonth(calcPerDay(data));
    }, [totalType])

    const handleSwitch = () => {
        if(totalType === 'month')
            setTotalType('year');
        else if (totalType === 'year')
            setTotalType('day');
        else if (totalType === 'day')
            setTotalType('month');
    }

    const calcPerMonth = (data) => {
        const tpm = data.reduce((acc, item) => {
            return (+acc + item.price / item.cycle).toFixed(2)
        }, 0)
        return tpm;
    }

    const calcPerYear = (data) => {
        const tpy = calcPerMonth(data) * 12;
        return tpy;
    }

    const calcPerDay = (data) => {
        const tpy = calcPerMonth(data) / 30;
        return tpy.toFixed(2);
    }

    const style = StyleSheet.create({
        wrapper: {
            borderRadius: SIZES.radius,
            overflow: 'hidden',
            margin: SIZES.padding,
            // Shadow
            elevation: 12,
            shadowColor: '#000'
        },
        infoWrapper: {
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding,
            borderRadius: SIZES.radius,
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        textSecondary: {
            color: COLORS.textLight,
            opacity: 0.5,
            ...FONTS.body3
        },
        bill: {
            ...FONTS.title,
            color: COLORS.textLight,
        },
        justifyBetween: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
        },
    });

    return (
        <LinearGradient
            colors={[COLORS.gradientMain1, COLORS.gradientMain2, COLORS.gradientMain3]}
            start={{ x: 0.3, y: 0 }}
            style={style.wrapper}
        >
            <TouchableNativeFeedback
                onPress={handleSwitch}
                background={TouchableNativeFeedback.Ripple(COLORS.tertiary, false)}
            >
                <View style={style.infoWrapper}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <Text style={{
                            ...FONTS.body4,
                            color: COLORS.textLight,
                            opacity: 0.5,
                        }}>
                            Total Subscriptions
                        </Text>
                        <Text style={{
                            ...FONTS.h4,
                            color: COLORS.textLight,
                        }}>
                            {data.length}
                        </Text>
                    </View>
                    <View
                        style={[{
                            paddingTop: 24,
                        }, style.justifyBetween]}
                    >
                        <Text style={style.bill}>
                            $ {totalPerMonth}
                        </Text>
                        <Text style={style.textSecondary}>
                            / {totalType}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </LinearGradient>
    )
}

export default Info
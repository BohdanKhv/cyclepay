import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES } from "../../constants/theme";
import data from "../../constants/dummyData";


const Info = () => {
    const [ totalPerMonth, setTotalPerMonth ] = useState(0)

    useEffect(() => {
        const tpm = data.reduce((acc, item) => {
            return (+acc + item.amount / item.cycle).toFixed(2)
        }, 0)
        setTotalPerMonth(tpm)
    }, [])

    const style = StyleSheet.create({
        container: {
            paddingHorizontal: SIZES.padding,
        },
        infoWrapper: {
            padding: SIZES.padding,
            borderRadius: SIZES.radius,
        },
        textSecondary: {
            color: COLORS.textLight,
            fontSize: SIZES.h4,
            opacity: 0.5,
        },
        bill: {
            fontSize: SIZES.h1,
            fontWeight: 'bold',
            color: COLORS.textLight,
        }
    });

    return (
        <View style={style.container}>
            <LinearGradient
                colors={[COLORS.gradientMain2, COLORS.gradientMain2, COLORS.gradientMain3]}
                style={style.infoWrapper}
            >
                <Text style={{
                    fontSize: SIZES.h5,
                    color: COLORS.textLight,
                    fontWeight: 'bold',
                    opacity: 0.5,
                }}>
                    Total Subscriptions
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingVertical: 8,
                    }}
                >
                    <Text style={style.bill}>
                        $ {totalPerMonth}
                    </Text>
                    <Text style={style.textSecondary}>
                        monthly
                    </Text>
                </View>
            </LinearGradient>
        </View>
    )
}

export default Info
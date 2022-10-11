import { View, Image, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { FONTS, SIZES } from '../../constants/theme';

const SubInfoItemTotal = ({icon, label, secondaryLabel}) => {
    const { theme } = useSelector(state => state.local);

    const style = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: SIZES.padding,
            borderWidth: 0.5,
            borderColor: theme.secondary,
            flexGrow: 1,
        },
        icon: {
            width: 25,
            height: 25,
            tintColor: theme.textDark,
            opacity: 0.5,
        },
        label: {
            color: theme.textDark,
            ...FONTS.h4,
        },
        secondaryLabel: {
            color: theme.textDark,
            ...FONTS.body6,
            opacity: 0.5,
        },
        infoContainer: {
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: 'center',
        }
    });

    return (
        <View
            style={style.container}
        >
            <Image
                source={icon}
                style={style.icon}
            />
            <View style={style.infoContainer}>
                <Text
                    style={style.label}
                >
                    {label}
                </Text>
                <Text
                    style={style.secondaryLabel}
                >
                    {secondaryLabel}
                </Text>
            </View>
        </View>
    )
}

export default SubInfoItemTotal
import { Text, View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { FONTS, SIZES } from '../../constants/theme';
import { useSelector } from 'react-redux';

const LineButton = ({ label, onPress, icon, active, containerStyle }) => {
    const { theme } = useSelector(state => state.local);

    const style = StyleSheet.create({
        container: {
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
        },
        label: {
            color: active ? theme.textSecondary : theme.textDark,
            ...FONTS.body3
        },
        alignCenter: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        py: {
            paddingVertical: 8,
        },
        px: {
            paddingHorizontal: SIZES.padding,
        },
        icon: {
            width: 20,
            height: 20,
            marginRight: SIZES.padding,
            tintColor: active ? theme.textSecondary : theme.textDark
        },
        containerStyle: {
            ...containerStyle
        }
    })

    return (
        <View
            style={style.container}
        >
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(theme.tertiary, false)}
                onPress={() => {
                    onPress && onPress()
                }}
            >
                <View style={[style.py, style.px, style.containerStyle]}>
                    <View style={[style.alignCenter, style.py]}>
                        {icon && 
                        <Image
                            source={icon}
                            style={style.icon}
                        />
                        }
                        <Text style={style.label}>
                            {label}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default LineButton
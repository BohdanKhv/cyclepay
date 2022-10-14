import { IconButton } from '../'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import icons from "../../constants/icons"
import { FONTS, SIZES } from '../../constants/theme'
import { useSelector } from "react-redux"

const GoBack = ({navigation}) => {
    const { theme } = useSelector(state => state.local);

    return (
        navigation.canGoBack() ? (
        <View
            style={{
                marginTop: SIZES.top,
                paddingVertical: 12,
                paddingHorizontal: SIZES.padding,
                backgroundColor: theme.main,
                flexDirection: 'row',
                backgroundColor: theme.main,
                alignItems: 'center',
                // justifyContent: 'space-between',
            }}
        >
            <IconButton
                icon={icons.back}
                onPress={() => navigation.goBack()}
                width={25}
                height={25}
            />
            <TouchableWithoutFeedback
                // onPress={() => navigation.goBack()}
            >
                <Text
                    style={{
                        color: theme.textDark,
                        paddingLeft: SIZES.padding,
                        ...FONTS.body2
                    }}
                >
                    {navigation.getState().routes[navigation.getState().index].name}
                </Text>
            </TouchableWithoutFeedback>
        </View>
        ) : (
            <View
                style={{
                    paddingTop: SIZES.top,
                    backgroundColor: theme.main,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
            </View>
        )
    )
}

export default GoBack
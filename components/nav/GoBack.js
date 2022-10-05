import { IconButton } from '../'
import { View, Text } from 'react-native'
import icons from "../../constants/icons"
import { COLORS, SIZES } from '../../constants/theme'

const GoBack = ({navigation}) => {
    return (
        navigation.canGoBack() ? (
        <View
            style={{
                paddingTop: SIZES.top,
                paddingHorizontal: SIZES.padding,
                backgroundColor: COLORS.main,
                flexDirection: 'row',
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
            <Text
                style={{
                    color: COLORS.textDark,
                    fontSize: SIZES.h2,
                    marginLeft: SIZES.padding,
                    fontWeight: '400',
                }}
            >
                {navigation.getState().routes[navigation.getState().index].name}
            </Text>
        </View>
        ) : (
            <View
                style={{
                    paddingTop: SIZES.top,
                    backgroundColor: COLORS.main,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
            </View>
        )
    )
}

export default GoBack
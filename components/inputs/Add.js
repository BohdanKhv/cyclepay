import { View } from "react-native"
import { TextButton } from '../'
import icons from "../../constants/icons"
import { COLORS, SIZES } from "../../constants/theme"

const Add = ({navigation}) => {

    return (
        <View style={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: 40,
        }}>
            <TextButton
                onPress={() => navigation.navigate('Search')}
                color={'transparent'}
                labelStyle={{
                    color: COLORS.primary,
                }}
                label={'Add Subscription'}
                icon={icons.plus}
            />
        </View>
    )
}

export default Add
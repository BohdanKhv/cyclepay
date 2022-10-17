import { View } from "react-native"
import { TextButton } from '../'
import icons from "../../constants/icons"
import { SIZES } from "../../constants/theme"
import { useSelector } from "react-redux"

const Add = ({navigation}) => {
    const { theme } = useSelector(state => state.local);

    return (
        <View style={{
            paddingHorizontal: SIZES.padding,
            paddingBottom: SIZES.padding,
        }}>
            <TextButton
                onPress={() => navigation.navigate('Search')}
                color={'transparent'}
                labelStyle={{
                    color: theme.primary,
                }}
                height={70}
                label={'Add Cycle'}
                icon={icons.plus}
            />
        </View>
    )
}

export default Add
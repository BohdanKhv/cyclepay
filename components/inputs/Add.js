import { View } from "react-native"
import { IconButton } from '../'
import icons from "../../constants/icons"
import { COLORS } from "../../constants/theme"

const Add = ({navigation}) => {

    return (
        <View style={{
            position: "absolute",
            bottom: 16,
            right: 16,
        }}>
            <IconButton
                onPress={() => navigation.navigate('Search')}
                icon={icons.plus}
                width={25}
                height={25}
                padding={8}
                containerStyle={{
                    backgroundColor: 'white',
                    borderRadius: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderColor: COLORS.textDark,
                }}
            />
        </View>
    )
}

export default Add
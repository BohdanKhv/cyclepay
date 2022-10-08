import { ActivityIndicator, View } from 'react-native'
import { COLORS } from '../../constants/theme'

const LoadScreen = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: COLORS.primary,
        }}>
            <ActivityIndicator size="large" color={'white'} />
        </View>
    )
}

export default LoadScreen
import { ActivityIndicator, View } from 'react-native'
import { useSelector } from 'react-redux';

const LoadScreen = () => {
    const { theme } = useSelector(state => state.local);

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: theme.primary,
        }}>
            <ActivityIndicator size="large" color={'white'} />
        </View>
    )
}

export default LoadScreen
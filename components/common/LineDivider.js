import { View } from 'react-native';

import { useSelector } from 'react-redux';

const LiveDivider = ({ lineStyle }) => {
    const { theme } = useSelector(state => state.local);

    return (
        <View
            style={{
                height: 1,
                width: '100%',
                backgroundColor: theme.tertiary,
                ...lineStyle
            }}
        >

        </View>
    )
}

export default LiveDivider;
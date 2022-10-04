import React from 'react';
import { View } from 'react-native';

import { COLORS } from '../../constants/theme';

const LiveDivider = ({ lineStyle }) => {
    return (
        <View
            style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.tertiary,
                ...lineStyle
            }}
        >

        </View>
    )
}

export default LiveDivider;
import { useState } from "react";
import { View, Text, StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants/theme'
import { IconButton} from '../'
import icons from '../../constants/icons'

const Sort = ({items, setItems}) => {
    const [sortBy, setSortBy] = useState('name')

    const style = StyleSheet.create({
        container: {
            paddingHorizontal: SIZES.padding,
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: SIZES.padding,
            justifyContent: 'space-between',
        },
        wrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        text: {
            color: COLORS.textDark,
            fontSize: 14,
            marginRight: 8,
            fontWeight: 'bold',
        }
    });

    return (
        <View style={style.container}>
            <Text style={style.text}>
                Sort by {sortBy}
            </Text>
            <View style={style.wrapper}>
                <IconButton
                    icon={icons.sort}
                    onPress={() => {
                        if(sortBy === 'name') {
                            setSortBy('bill date')
                            items && items.length > 1 && setItems([...items].sort((a, b) => new Date(b.nextBill) - new Date(a.nextBill)))
                        } else if (sortBy === 'bill date') {
                            setSortBy('price')
                            items && items.length > 1 && setItems([...items].sort((a, b) => b.price - a.price))
                        } else if (sortBy === 'price') {
                            setSortBy('name')
                            items && items.length > 1 && setItems([...items].sort((a, b) => a.name.localeCompare(b.name)))
                        }
                    }}
                />
            </View>
        </View>
    )
}

export default Sort
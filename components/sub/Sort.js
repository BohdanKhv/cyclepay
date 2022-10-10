import { useState } from "react";
import { View, Text, StyleSheet } from 'react-native'
import { FONTS, SIZES } from '../../constants/theme'
import { IconButton} from '../'
import icons from '../../constants/icons'
import { useSelector } from "react-redux"

const Sort = ({items, setItems}) => {
    const { theme } = useSelector(state => state.local);
    const [sortBy, setSortBy] = useState('name')

    const style = StyleSheet.create({
        container: {
            paddingHorizontal: SIZES.padding,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        wrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        text: {
            color: theme.textDark,
            ...FONTS.h3,
        },
        info: {
            color: theme.textDark,
            marginRight: 4,
            ...FONTS.body4,
        }
    });

    return (
        <View style={style.container}>
            <Text style={style.text}>
                Sort by:
            </Text>
            <View style={style.wrapper}>
                <Text style={style.info}>
                    {sortBy}
                </Text>
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
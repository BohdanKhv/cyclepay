import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native'
import { FONTS, SIZES } from '../../constants/theme'
import { IconButton} from '../'
import icons from '../../constants/icons'
import { useSelector } from "react-redux"

const Sort = ({items, setItems}) => {
    const { theme, sort } = useSelector(state => state.local);
    const [sortBy, setSortBy] = useState(sort || 'name')

    useEffect(() => {
        setSortBy(sort)
    }, [sort])

    useEffect(() => {
        if(sortBy === 'name') {
            items && items.length > 1 && setItems([...items].sort((a, b) => new Date(b.nextBill) - new Date(a.nextBill)))
        } else if (sortBy === 'bill date') {
            items && items.length > 1 && setItems([...items].sort((a, b) => b.price - a.price))
        } else if (sortBy === 'price') {
            items && items.length > 1 && setItems([...items].sort((a, b) => a.name.localeCompare(b.name)))
        }
    }, [sortBy])

    const style = StyleSheet.create({
        container: {
            paddingHorizontal: SIZES.padding,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
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
            <View style={style.wrapper}>
                <Text style={style.info}>
                    {sortBy}
                </Text>
                <IconButton
                    icon={icons.sort}
                    padding={10}
                    onPress={() => {
                        if(sortBy === 'name') {
                            setSortBy('bill date')
                        } else if (sortBy === 'bill date') {
                            setSortBy('price')
                        } else if (sortBy === 'price') {
                            setSortBy('name')
                        }
                    }}
                />
            </View>
        </View>
    )
}

export default Sort
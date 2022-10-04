import { useState } from "react";
import { View, Text, StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constants/theme'
import { IconButton, Menu } from '../'
import icons from '../../constants/icons'

const Sort = ({items, setItems}) => {
    const [showMenu, setShowMenu] = useState(false);

    const menuItems = [
        {
            id: 1,
            name: 'Price',
            onClick: () => console.log('Price'),
        },
        {
            id: 2,
            name: 'Bill Date',
            onClick: () => console.log('Bill Date'),
        },
    ]

    const style = StyleSheet.create({
        container: {
            paddingHorizontal: SIZES.padding,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: SIZES.padding,
            justifyContent: 'space-between',
        },
        text: {
            color: COLORS.textDark,
            fontSize: 16,
        }
    });

    return (
        <View style={style.container}>
            <Text style={style.text}>
                Sort by:
            </Text>
            <Menu
                menuItems={menuItems}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
            >
            <IconButton
                icon={icons.sort}
                onPress={() => {
                    setShowMenu(!showMenu)
                }}/>
            </Menu>
        </View>
    )
}

export default Sort
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';
import icons from '../../constants/icons';
import { IconButton, Menu } from '../';

const Header = () => {
    const [currentTimeOfDay, setCurrentTimeOfDay] = useState('morning');
    const [showMenu, setShowMenu] = useState(false);


    useEffect(() => {
        const date = new Date();
        const hour = date.getHours();
        
        if (hour >= 6 && hour < 12) {
            setCurrentTimeOfDay('morning');
        } else if (hour >= 12 && hour < 18) {
            setCurrentTimeOfDay('afternoon');
        } else {
            setCurrentTimeOfDay('evening');
        }
    }, []);

    const style = StyleSheet.create({
        container: {
            backgroundColor: 'transparent',
            paddingHorizontal: SIZES.padding,
            paddingTop: SIZES.padding * 2,
            paddingBottom: SIZES.padding,
            position: 'relative',
            zIndex: 1,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        textSecondary: {
            color: COLORS.textDark,
            fontSize: 16,
            opacity: 0.5,
        },
        textMain: {
            color: COLORS.textDark,
            fontSize: 20,
            fontWeight: 'bold',
        },
    });

    const menuItems = [
        {
            id: 1,
            name: 'Settings',
            icon: icons.settings,
            onClick: () => console.log('Settings'),
        },
        {
            id: 2,
            name: 'About',
            icon: icons.about,
            onClick: () => console.log('About'),
        },
    ]

    return (
        <View style={style.container}>
            <View style={style.header}>
                <View>
                    <Text style={style.textMain}>
                        Good {currentTimeOfDay}!
                    </Text>
                    <Text style={style.textSecondary}>
                        {new Date().toDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </Text>
                </View>
                <Menu
                    menuItems={menuItems}
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                >
                    <IconButton
                        icon={icons.more}
                        onPress={() => {
                            setShowMenu(!showMenu)
                        }}
                    />
                </Menu>
            </View>
        </View>
    )
}

export default Header
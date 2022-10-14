import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTS, SIZES } from '../../constants/theme';
import { useSelector } from 'react-redux';
import icons from '../../constants/icons';
import { IconButton, Menu } from '../';

const Header = ({ navigation }) => {
    const [currentTimeOfDay, setCurrentTimeOfDay] = useState('morning');
    const [showMenu, setShowMenu] = useState(false);
    const { theme } = useSelector(state => state.local);


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
            paddingVertical: 12,
            marginTop: SIZES.top,
            backgroundColor: 'transparent',
            position: 'relative',
            zIndex: 1,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        textSecondary: {
            color: theme.textDark,
            opacity: 0.5,
            ...FONTS.body3,
        },
        textMain: {
            color: theme.textDark,
            ...FONTS.titleSm
        },
    });

    const menuItems = [
        {
            id: 1,
            name: 'Settings',
            icon: icons.settings,
            onClick: () => navigation.navigate('Settings'),
        },
        {
            id: 2,
            name: 'About',
            icon: icons.about,
            onClick: () => navigation.navigate('About'),
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
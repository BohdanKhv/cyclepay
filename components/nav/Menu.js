import { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableNativeFeedback, Animated, Pressable, Image } from "react-native"
import { FONTS, SIZES } from "../../constants/theme";
import { useSelector } from "react-redux"

const Menu = ({children, menuItems, showMenu, setShowMenu}) => {
    const { theme } = useSelector(state => state.local);
    const animation = useRef(new Animated.Value(0)).current;
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        let timeout = null;
        if(showMenu) {
            setDisplay(true);

            Animated.timing(animation, {
                toValue: 1,
                duration: SIZES.animationDuration,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: SIZES.animationDuration,
                useNativeDriver: true,
            }).start();

            timeout = setTimeout(() => {
                setDisplay(false);
            }, SIZES.animationDuration);
        }

        return () => timeout && clearTimeout(timeout);
    }, [showMenu])

    const style = StyleSheet.create({
        container: {
        },
        menu: {
            position: 'absolute',
            overflow: 'hidden',
            top: 0,
            width: 150,
            right: 0,
            backgroundColor: theme.main,
            elevation: 5,
            borderRadius: 10,
        },
        icon: {
            position: 'relative',
            width: 16,
            height: 16,
            marginRight: SIZES.padding,
            tintColor: theme.textDark,
        }
    });

    return (
        <>
        {/* Menu content */}
        <View style={{
            position: 'relative',
            zIndex: 40,
        }}>
            {children}
            {display && (
            <Animated.View
                style={{
                    transform: [{
                        scale: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 1]
                        }),
                    }],
                }}
                opacity={animation}
            >
                <View style={style.menu}>
                    <FlatList
                        data={menuItems}
                        renderItem={({item}) => {
                            return (
                                <View style={{
                                    backgroundColor: theme.main,
                                }}>
                                    <TouchableNativeFeedback
                                        onPress={() => {
                                            item.onClick();
                                            setShowMenu(false);
                                        }}
                                        background={TouchableNativeFeedback.Ripple(theme.tertiary, false)}
                                    >
                                        <View style={{
                                            padding: 12,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            {item.icon &&
                                                <Image
                                                    source={item.icon}
                                                    style={style.icon}
                                                />
                                            }
                                            <Text
                                                style={{
                                                    color: theme.textDark,
                                                    ...FONTS.body4
                                                }}
                                            >{item.name}</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            )
                        }
                    }
                        keyExtractor={item => item.id}
                    />
                </View>
            </Animated.View>
            )}
        </View>

        {/* Darken background and click outside */}
        {display && (
            <Animated.View
                style={{
                    position: 'absolute',
                    right: -100,
                    width: '150%',
                    height: 2400,
                    backgroundColor: 'black',
                }}
                opacity={animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.1]
                })}
            >
                <Pressable style={{
                    flex: 1,
                }}  
                onPress={() => setShowMenu(false)}
                />
            </Animated.View>
        )}
        </>
    )
}

export default Menu
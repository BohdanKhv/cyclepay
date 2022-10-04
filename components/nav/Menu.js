import { useRef, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableNativeFeedback, Animated, Pressable } from "react-native"
import { COLORS, SIZES } from "../../constants/theme";

const Menu = ({children, menuItems, showMenu, setShowMenu}) => {
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
            width: 100,
            right: 0,
            backgroundColor: COLORS.main,
            elevation: 5,
            borderRadius: 10,
        },
        menuItems: {
            flex: 1,
            position: 'relative',
            backgroundColor: 'blue',
        },
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
                                    backgroundColor: COLORS.main,
                                }}>
                                    <TouchableNativeFeedback
                                        onPress={() => {
                                            item.onClick();
                                            setShowMenu(false);
                                        }}
                                        background={TouchableNativeFeedback.Ripple(COLORS.tertiary, false)}
                                    >
                                        <View style={{
                                            padding: 10,
                                        }}>
                                            <Text
                                                style={{
                                                    color: COLORS.textDark,
                                                    fontWeight: 'bold',
                                                    fontSize: SIZES.h4,
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
                    zIndex: 30,
                    right: -100,
                    width: '150%',
                    height: 1400,
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
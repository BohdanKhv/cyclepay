import { useState, useRef, useEffect } from 'react';
import { View, Text, Animated, ScrollView, SafeAreaView, Pressable, StyleSheet } from 'react-native';

import { TextButton, ModelItem } from '../';
import { COLORS, SIZES } from '../../constants/theme';


const SubModel = ({ item, isOpen, setIsOpen }) => {
    const bounceValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if(isOpen){
            Animated.timing(bounceValue, {
                toValue: 1,
                duration: SIZES.animationDuration,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(bounceValue, {
                toValue: 0,
                duration: SIZES.animationDuration,
                useNativeDriver: false
            }).start();
        }
    }, [isOpen]);

    const modalY = bounceValue.interpolate({
        inputRange: [0, 1],
        outputRange: [SIZES.height, SIZES.height - 435]
    });

    const countAmountOfCycles = (cycle, firstBill) => {
        if(cycle && firstBill){
            const today = new Date();
            const startDate = new Date(firstBill);
            const diff = today.getTime() - startDate.getTime();
            const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
            const cycles = Math.floor(months / cycle);
            return cycles || 0;
        }
    }

    const countTotalPaid = (cycle, firstBill) => {
        if(cycle && firstBill){
            const today = new Date();
            const startDate = new Date(firstBill);
            const diff = +today - +startDate;
            const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
            const cycles = Math.floor(months / cycle);
            const totalPaid = cycles * item.amount;
            return totalPaid;
        }
    }

    const style = StyleSheet.create({
        justifyBetween: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
    })

    return (
    <>
        {/* Darken background */}
        {isOpen && (
            <Animated.View 
                style={{
                    position: 'absolute',
                    bottom: 0,
                    height: '100%',
                    width: SIZES.width,
                }}
                opacity={bounceValue}
            >
                {/* Background container */}
                <Pressable
                    style={{
                        flex: 1,
                        height: '100%',
                        width: SIZES.width,
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                    onPress={() => setIsOpen(false)}
                />
            </Animated.View>
        )}

        {/* Content Container */}
        <Animated.View
            style={{
                position: 'absolute',
                height: '90%',
                flex: 1,
                width: SIZES.width,
                backgroundColor: COLORS.main,
                borderTopLeftRadius: SIZES.radius,
                borderTopRightRadius: SIZES.radius,
                bottom: 0,
                top: modalY
            }}
        >
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    borderBottomWidth: 1,
                    paddingBottom: SIZES.padding,
                    borderBottomColor: COLORS.secondary,
                }}
            >
                <View style={style.alignCenter}>
                    <Text
                        style={{
                            color: COLORS.textDark,
                            fontSize: SIZES.h2,
                            fontWeight: 'bold',
                        }}
                    >
                        {item?.name}
                    </Text>
                </View>
                <TextButton
                    label='Delete'
                    containerStyle={{
                        backgroundColor: 'transparent',
                    }}
                    labelStyle={{
                        color: COLORS.danger,
                        ...SIZES.h3
                    }}
                    color={'transparent'}
                    onPress={() => {
                        setIsOpen(false);
                    }}
                />
            </View>

            {/* Body */}
            <View style={{
                paddingVertical: SIZES.padding,
            }}>
                <ModelItem
                    label='Description'
                    value={item?.description}
                />
                <ModelItem
                    label='Next Bill'
                    value={new Date(item?.nextBill).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                />
                <ModelItem
                    label='Reminder'
                    value={item?.reminder}
                />
                <ModelItem
                    label='Start Date'
                    value={new Date(item?.firstBill).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                />
                <ModelItem
                    label='Price'
                    value={`$ ${item?.amount}`}
                />
                <ModelItem
                    label='Cycle'
                    value={item?.cycle}
                />
                <ModelItem
                    label='Total Paid'
                    disabled
                    value={`$ ${countTotalPaid(item?.cycle, item?.firstBill)}`}
                />
                <ModelItem
                    label='Cycles'
                    disabled
                    value={`${countAmountOfCycles(item?.cycle, item?.firstBill)}`}
                />
                <View style={[
                    {
                        paddingTop: SIZES.padding,
                        paddingHorizontal: SIZES.padding,
                    }, style.justifyBetween]}>
                    <TextButton
                        labelStyle={{
                            color: COLORS.textDark,
                        }}
                        containerStyle={{
                            backgroundColor: 'transparent',
                            flex: 1,
                            marginRight: 4,
                        }}
                        color={'transparent'}
                        borderColor={COLORS.textDark}
                        label='Close'
                        onPress={() => {
                            setIsOpen(false);
                        }}
                    />
                    <TextButton
                        labelStyle={{
                            color: COLORS.textLight,
                        }}
                        containerStyle={{
                            backgroundColor: COLORS.textDark,
                            borderColor: COLORS.textDark,
                            flex: 1,
                            borderWidth: 1,
                            marginLeft: 4,
                        }}
                        label='Save'
                    />
                </View>
            </View>
        </Animated.View>
        </>
    )
}

export default SubModel;
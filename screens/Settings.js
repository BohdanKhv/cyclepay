import { useState } from "react"
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native"
import { SettingsItem, SettingsItemLabel, GoBack } from "../components"
import { SIZES } from "../constants/theme"
import { useDispatch, useSelector } from "react-redux"
import { darkTheme, lightTheme } from "../constants/theme"
import { setTheme, setSort, setInfoDisplay } from "../store/features/local/localSlice"
import { clearSub } from "../store/features/sub/subSlice"


const Settings = ({ navigation }) => {
    const dispatch = useDispatch();
    const { theme, sort, infoDisplay } = useSelector(state => state.local);

    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            paddingTop: SIZES.padding,
            backgroundColor: theme.main,
        },
        input: {
            paddingHorizontal: SIZES.padding,
        },
    })

    const handleThemeChange = () => {
        dispatch(setTheme(theme === lightTheme ? darkTheme : lightTheme));
    }

    const handleClearSub = () => {
        dispatch(clearSub());
    }

    const handleSetSort = () => {
        if(sort === 'name') {
            dispatch(setSort('bill date'))
        } else if (sort === 'bill date') {
            dispatch(setSort('price'))
        } else if (sort === 'price') {
            dispatch(setSort('name'))
        }
    }

    const handleInfoDisplay = () => {
        if(infoDisplay === 'monthly') {
            dispatch(setInfoDisplay('yearly'))
        } else if (infoDisplay === 'yearly') {
            dispatch(setInfoDisplay('daily'))
        } else if (infoDisplay === 'daily') {
            dispatch(setInfoDisplay('monthly'))
        }
    }

    return (
        <>
        <GoBack navigation={navigation} />
            <View style={style.container}>
                <ScrollView>
                    <SettingsItem
                        value={theme.name === 'dark'}
                        onChange={handleThemeChange}
                        label="Dark Theme"
                    />
                    <SettingsItemLabel
                        onPress={handleInfoDisplay}
                        label="Display total by"
                        value={infoDisplay}
                    />
                    <SettingsItemLabel
                        onPress={handleSetSort}
                        label="Sort Subscriptions"
                        value={sort}
                    />
                    <SettingsItemLabel
                        onPress={handleClearSub}
                        label="Clear Subscriptions"
                        confirm="Are you sure you want to clear all subscriptions?"
                    />
                </ScrollView>
            </View>
        </>
    )
}

export default Settings
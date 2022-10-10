import { useState } from "react"
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native"
import { SettingsItem, GoBack } from "../components"
import { SIZES } from "../constants/theme"
import { useDispatch, useSelector } from "react-redux"
import { darkTheme, lightTheme } from "../constants/theme"
import { setTheme } from "../store/features/local/localSlice"


const Settings = ({ navigation }) => {
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.local);

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
                </ScrollView>
            </View>
        </>
    )
}

export default Settings
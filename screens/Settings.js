import { useState } from "react"
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native"
import { SettingsItem, GoBack } from "../components"
import { SIZES } from "../constants/theme"

const Settings = ({ navigation }) => {
    const [darkMode, setDarkMode] = useState(false)

    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            paddingTop: SIZES.padding,
        },
        input: {
            paddingHorizontal: SIZES.padding,
        },
    })

    return (
        <>
        <GoBack navigation={navigation} />
            <View style={style.container}>
                <ScrollView>
                    <SettingsItem value={darkMode} onChange={setDarkMode} label="Dark Theme" />
                </ScrollView>
            </View>
        </>
    )
}

export default Settings
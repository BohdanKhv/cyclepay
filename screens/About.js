import { useState } from "react"
import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native"
import { Input, SubItemAdd, SubModelAdd, GoBack } from "../components"
import icons from "../constants/icons"
import { SIZES } from "../constants/theme"

const About = ({ navigation }) => {
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

                </ScrollView>
            </View>
        </>
    )
}

export default About
import { useState } from "react"
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native"
import { useSelector } from "react-redux"
import { Input, SubItemAdd, SubModelAdd, GoBack, SubCustomAdd, Alert } from "../components"
import { SIZES } from "../constants/theme"
import data from "../constants/dummyData"
import icons from "../constants/icons"

const Search = ({navigation}) => {
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [modelOpen, setModelOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const { theme } = useSelector(state => state.local);

    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.main,
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
            <View style={style.input}>
                <Input
                    icon={icons.search}
                    placeholder="Search by name or service"
                    value={search}
                    // autoFocus={true}
                    onChangeText={setSearch}
                />
            </View>
            <View
                style={{
                    paddingTop: SIZES.padding,
                }}
            >
                <SubCustomAdd
                    setSelectedItem={setSelectedItem}
                    setModelOpen={setModelOpen}
                />
                <FlatList
                    data={
                        data
                        .filter(i => search.length > 0 ? i.name.toLowerCase().includes(search.toLowerCase()) : true)
                        .slice(0, 5)
                    }
                    keyExtractor={(item) => `item-${item.id}`}
                    renderItem={({item}) => (
                        <SubItemAdd
                            item={item}
                            setSelectedItem={setSelectedItem}
                            setModelOpen={setModelOpen}
                        />
                    )}
                />
            </View>
        </View>
        <SubModelAdd
            item={selectedItem}
            isOpen={modelOpen}
            setIsOpen={setModelOpen}
            setAlertMsg={setAlertMsg}
        />
        <Alert
            message={alertMsg}
        />
    </>
    )
}

export default Search
import { useState } from "react"
import { View, Text, TextInput, StyleSheet, FlatList } from "react-native"
import { Input, SubItemAdd, SubModelAdd, GoBack } from "../components"
import { SIZES } from "../constants/theme"
import data from "../constants/dummyData"
import icons from "../constants/icons"

const Search = ({navigation}) => {
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [modelOpen, setModelOpen] = useState(false);

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
            <View style={style.input}>
                <Input
                    icon={icons.search}
                    placeholder="Search by name or service"
                    value={search}
                    onChangeText={setSearch}
                />
            </View>
            <View
                style={{
                    paddingTop: SIZES.padding,
                }}
            >
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
        <SubModelAdd item={selectedItem} isOpen={modelOpen} setIsOpen={setModelOpen} />
    </>
    )
}

export default Search
import { useState } from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { useSelector } from "react-redux"
import { Input, SubCardNew, SubInfoNew, GoBack, SubCardCustomNew, Alert } from "../components"
import { SIZES } from "../constants/theme"
import data from "../constants/data"
import icons from "../constants/icons"

const Search = ({navigation}) => {
    const [search, setSearch] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [ModalOpen, setModalOpen] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [itemsLimit, setItemsLimit] = useState(10);
    const { theme } = useSelector(state => state.local);

    const setMoreItems = () => {
        setItemsLimit(itemsLimit + 10);
    }

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
                <FlatList
                    data={
                        data
                        .filter(i => search.length > 0 ? i.name.toLowerCase().includes(search.toLowerCase()) : true)
                        .slice(0, itemsLimit)
                    }
                    ListHeaderComponent={
                        <SubCardCustomNew
                            setSelectedItem={setSelectedItem}
                            setModalOpen={setModalOpen}
                        />
                    }
                    ListFooterComponent={
                        <View style={{height: 60}} />
                    }
                    keyExtractor={(item) => `item-${item.id}`}
                    renderItem={({item, index}) => (
                        <SubCardNew
                            item={item}
                            setSelectedItem={setSelectedItem}
                            setModalOpen={setModalOpen}
                        />
                        )
                    }
                    onEndReached={setMoreItems}
                />
            </View>
        </View>
        <Alert
            message={alertMsg}
            setAlertMsg={setAlertMsg}
        />
        <SubInfoNew
            item={selectedItem}
            isOpen={ModalOpen}
            setIsOpen={setModalOpen}
            setAlertMsg={setAlertMsg}
            setSelectedItem={setSelectedItem}
        />
    </>
    )
}

export default Search
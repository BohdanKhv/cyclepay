import { useState, useEffect } from "react"
import { View, FlatList, ScrollView, StyleSheet } from "react-native"
import { COLORS, SIZES } from "../constants/theme"
import { useSelector } from "react-redux"
import data from "../constants/dummyData"
import { Sort, SubItem, Header, Add, Info, SubModel } from "../components"

const Home = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [items, setItems] = useState([]);
  const { theme } = useSelector(state => state.local);

  useEffect(() => {
    setItems(data);
  }, []);

  const style = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: theme.main,
    },
    container: {
      paddingHorizontal: 8,
    },
  });

  return (
    <>
      <View
          style={style.body}
        >
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: theme.primary,
            width: 180,
            height: 180,
            borderBottomLeftRadius: 180,
            // Shadow
            shadowColor: theme.primary,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        />
        <Header
          navigation={navigation}
        />
        <Info/>
        <Sort
          items={items}
          setItems={setItems}
        />
        <View
          style={{
            position: 'relative',
            zIndex: -1,
            flex: 1,
          }}
        >
          <ScrollView style={{
            paddingVertical: SIZES.padding,
          }}>
            {items && items.map((item, index) => (
              <SubItem
                key={`item-${index}`}
                item={item}
                setSelectedItem={setSelectedItem}
                setModelOpen={setModelOpen}
              />
            ))}
            <Add navigation={navigation}/>
          </ScrollView>
        </View>
      </View>
      <SubModel item={selectedItem} isOpen={modelOpen} setIsOpen={setModelOpen} />
      </>
  )
}

export default Home
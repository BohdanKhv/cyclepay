import { useState, useEffect } from "react"
import { View, FlatList, ScrollView } from "react-native"
import { COLORS, SIZES } from "../constants/theme"
import data from "../constants/dummyData"
import { Sort, SubItem, Header, Add, Info, SubModel } from "../components"


const style = {
  body: {
    flex: 1,
    backgroundColor: COLORS.main,
  },
  container: {
    paddingHorizontal: 8,
  },
}

const Home = ({navigation}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(data);
  }, []);

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
            backgroundColor: COLORS.primary,
            width: 180,
            height: 180,
            borderBottomLeftRadius: 180,
            // Shadow
            shadowColor: COLORS.primary,
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
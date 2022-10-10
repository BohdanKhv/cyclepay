import { useState, useEffect } from "react"
import { View, FlatList, ScrollView, StyleSheet } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { COLORS, SIZES } from "../constants/theme"
import { useSelector } from "react-redux"
import data from "../constants/data"
import { Sort, SubItem, Header, Add, Info, SubModel, Alert } from "../components"

const Home = ({navigation}) => {
  const subItems = useSelector((state) => state.sub.items)
  const [selectedItem, setSelectedItem] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [alertMsg, setAlertMsg] = useState("");
  const { theme } = useSelector(state => state.local);

  useEffect(() => {
    setItems(subItems);
  }, [subItems]);

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
        <LinearGradient
          colors={[theme.gradientPrimary2, theme.primary]}
          start={{ x: 0.9, y: 0 }}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            backgroundColor: theme.primary,
            width: 180,
            height: 180,
            borderBottomLeftRadius: 180,
            borderBottomWidth: 1,
            borderLeftWidth: 1,
            borderColor: theme.primary,
            // Shadow
            shadowColor: theme.primary,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 12,
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
      <SubModel
        item={selectedItem}
        isOpen={modelOpen}
        setIsOpen={setModelOpen}
        setSelectedItem={setSelectedItem}
        setAlertMsg={setAlertMsg}
      />
      <Alert
        message={alertMsg}
      />
      </>
  )
}

export default Home
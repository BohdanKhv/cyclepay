import { useState } from "react"
import { View, FlatList } from "react-native"
import { COLORS } from "../constants/theme"
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

  return (
    <>
      <View
          style={style.body}
        >
        <Header/>
        <Info/>
        <Sort/>
        <FlatList
          data={data}
          keyExtractor={(item) => `item-${item.id}`}
          style={{
            flex: 1,
          }}
          renderItem={({item}) => (
            <SubItem
              item={item}
              setSelectedItem={setSelectedItem}
              setModelOpen={setModelOpen}
            />
          )}
        />
      </View>
      <Add navigation={navigation}/>
      <SubModel item={selectedItem} isOpen={modelOpen} setIsOpen={setModelOpen} />
      </>
  )
}

export default Home
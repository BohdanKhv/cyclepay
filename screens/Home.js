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
  const [editItem, setEditItem] = useState(null);
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);

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
              setEditItem={setEditItem}
              setIsEditModelOpen={setIsEditModelOpen}
            />
          )}
        />
      </View>
      <Add navigation={navigation}/>
      <SubModel item={editItem} isOpen={isEditModelOpen} setIsOpen={setIsEditModelOpen} />
    </>
  )
}

export default Home
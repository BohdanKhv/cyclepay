import { useState, useEffect } from "react"
import { View, StyleSheet, FlatList, Button } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { SIZES } from "../constants/theme"
import { useSelector, useDispatch } from "react-redux"
import { setChannelId } from "../store/features/local/localSlice"
import { Sort, SubCard, Header, Add, Info, SubInfo, Alert } from "../components"

const Home = ({navigation}) => {
  const { items } = useSelector((state) => state.sub)
  const [selectedItem, setSelectedItem] = useState(null);
  const [ModalOpen, setModalOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const { theme, channelId } = useSelector(state => state.local);
  const dispatch = useDispatch();


  useEffect(() => {
    if(!channelId) {
      dispatch(setChannelId());
    }
  }, [])

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
        <Sort />
        <View
          style={{
            flex: 1,
            zIndex: -1,
          }}
        >
          <FlatList 
            data={items}
            keyExtractor={(item, index) => `item-${index}`}
            renderItem={({item}) => (
              <SubCard
                item={item}
                setSelectedItem={setSelectedItem}
                setModalOpen={setModalOpen}
              />
            )}
            ListHeaderComponent={() => (
              <View style={{height: SIZES.padding}}/>
            )}
            ListFooterComponent={
              <>
                <Add navigation={navigation}/>
              </>
            }
          />
        </View>
      </View>
      <Alert
        message={alertMsg}
        setAlertMsg={setAlertMsg}
      />
      <SubInfo
        item={selectedItem}
        isOpen={ModalOpen}
        setIsOpen={setModalOpen}
        setSelectedItem={setSelectedItem}
        setAlertMsg={setAlertMsg}
      />
      </>
  )
}

export default Home
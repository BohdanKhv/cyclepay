import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { FONTS, SIZES } from '../../constants/theme'
import { setSort } from '../../store/features/local/localSlice'
import { sortSub } from '../../store/features/sub/subSlice'
import { IconButton, Modal, LineButton } from '../'
import icons from '../../constants/icons'

const Sort = () => {
    const { theme, sort } = useSelector(state => state.local);
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(sortSub(sort));
    }, [sort])

    const style = StyleSheet.create({
        container: {
            paddingHorizontal: SIZES.padding,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        wrapper: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        text: {
            color: theme.textDark,
            ...FONTS.h3,
            textTransform: 'capitalize',
        },
        info: {
            color: theme.textDark,
            marginRight: 4,
            ...FONTS.body4,
        }
    });

    return (
        <>
        <View style={style.container}>
            <View>
                <Text style={style.text}>
                    {sort.split(':')[0]}
                </Text>
            </View>
            <View style={style.wrapper}>
                <IconButton
                    icon={sort.split(':')[1] === 'asc' ? icons.sortDown : icons.sortUp}
                    padding={10}
                    onPress={() => {
                        setModalOpen(true)
                    }}
                />
            </View>
        </View>
        <Modal
            isOpen={modalOpen}
            setIsOpen={setModalOpen}
            modalHeight={245}
        >
            <View
                style={{
                    paddingVertical: SIZES.padding,
                }}
            >
                <LineButton
                    label="Sort by Name"
                    active={sort.split(':')[0] === 'name'}
                    icon={sort.split(':')[1] === 'asc' ? icons.sortDown : icons.sortUp}
                    onPress={() => {
                        if(sort.split(':')[1] === 'asc')
                            dispatch(setSort('name:desc'))
                        else 
                            dispatch(setSort('name:asc'))
                        
                        setModalOpen(false)
                    }}
                />
                <LineButton
                    label="Sort by First Bill Date"
                    active={sort.split(':')[0] === 'first bill date'}
                    icon={sort.split(':')[1] === 'asc' ? icons.sortDown : icons.sortUp}
                    onPress={() => {
                        if(sort.split(':')[1] === 'asc')
                            dispatch(setSort('first bill date:desc'))
                        else 
                            dispatch(setSort('first bill date:asc'))
                        
                        setModalOpen(false)
                    }}
                />
                <LineButton
                    label="Sort by Next Bill Date"
                    active={sort.split(':')[0] === 'next bill date'}
                    icon={sort.split(':')[1] === 'asc' ? icons.sortDown : icons.sortUp}
                    onPress={() => {
                        if(sort.split(':')[1] === 'asc')
                            dispatch(setSort('next bill date:desc'))
                        else 
                            dispatch(setSort('next bill date:asc'))
                        
                        setModalOpen(false)
                    }}
                />
                <LineButton
                    label="Sort by Price"
                    active={sort.split(':')[0] === 'price'}
                    icon={sort.split(':')[1] === 'asc' ? icons.sortDown : icons.sortUp}
                    onPress={() => {
                        if(sort.split(':')[1] === 'asc')
                            dispatch(setSort('price:desc'))
                        else 
                            dispatch(setSort('price:asc'))
                        
                        setModalOpen(false)
                    }}
                />
            </View>
        </Modal>
        </>
    )
}

export default Sort
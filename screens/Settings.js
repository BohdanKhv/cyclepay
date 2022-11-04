import { useState } from "react";
import { View, Text, StatusBar, StyleSheet, ScrollView, PermissionsAndroid } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import rnfs from 'react-native-fs';
import { SettingsItem, SettingsItemLabel, GoBack, Alert } from "../components"
import { SIZES } from "../constants/theme"
import { darkTheme, lightTheme } from "../constants/theme"
import { setTheme, setSort, setInfoDisplay, setInfoNextBill } from "../store/features/local/localSlice"
import { clearSub, importSub } from "../store/features/sub/subSlice"


const Settings = ({ navigation }) => {
    const dispatch = useDispatch();
    const { theme, sort, infoDisplay, infoNextBill } = useSelector(state => state.local);
    const [alertMsg, setAlertMsg] = useState("");
    const items = useSelector(state => state.sub.items);

    const style = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
            paddingTop: SIZES.padding,
            backgroundColor: theme.main,
        },
        input: {
            paddingHorizontal: SIZES.padding,
        },
    })

    const handleThemeChange = () => {
        dispatch(setTheme(theme === lightTheme ? darkTheme : lightTheme));
    }

    const handleClearSub = () => {
        dispatch(clearSub());
    }

    const handleSetSort = () => {
        if(sort.split(':')[0] === 'name') {
            dispatch(setSort('first bill date:asc'))
        } else if (sort.split(':')[0] === 'first bill date') {
            dispatch(setSort('next bill date:asc'))
        } else if (sort.split(':')[0] === 'next bill date') {
            dispatch(setSort('price:asc'))
        } else if (sort.split(':')[0] === 'price') {
            dispatch(setSort('name:asc'))
        }
    }

    const handleInfoDisplay = () => {
        if(infoDisplay === 'weekly') {
            dispatch(setInfoDisplay('yearly'))
        } else if (infoDisplay === 'yearly') {
            dispatch(setInfoDisplay('daily'))
        } else if (infoDisplay === 'daily') {
            dispatch(setInfoDisplay('monthly'))
        } else if (infoDisplay === 'monthly') {
            dispatch(setInfoDisplay('weekly'))
        } else {
            dispatch(setInfoDisplay('monthly'))
        }
    }

    const handleInfoNextBill = () => {
        if(infoNextBill === 'date') {
            dispatch(setInfoNextBill('days'))
        } else if (infoNextBill === 'days') {
            dispatch(setInfoNextBill('date'))
        } else {
            dispatch(setInfoNextBill('date'))
        }
    }

    const handleExport = async () => {
        // const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const path = `${rnfs.DocumentDirectoryPath}/cyclepay.json`;
            console.log(path)

            rnfs.writeFile(path, JSON.stringify(items), 'utf8')
            .then((success) => {
                setAlertMsg(`Exported to ${path}`);
            })
            .catch((err) => {
                console.log(err.message);
            });
        // } else {
        //     setAlertMsg("Permission Denied");
        // }
    }

    const handleImport = async () => {
        // const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

        // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const path = `${rnfs.DocumentDirectoryPath}/cyclepay.json`;

            rnfs.readFile(path, 'utf8')
            .then((data) => {
                setAlertMsg('Imported successfully');
                dispatch(importSub(JSON.parse(data)));
                console.log(data);
            })
            .catch((err) => {
                setAlertMsg('Error importing data.');
                console.log(err.message);
            });
        // } else {
        //     setAlertMsg("Permission Denied");
        // }

    }

    return (
    <>
        <View style={{
            flex: 1,
            backgroundColor: theme.main,
        }}>
        <StatusBar
            backgroundColor="rgba(0,0,0,0.25)"
            translucent={true}
            barStyle="light-content"
        />
        <GoBack navigation={navigation} />
            <View style={style.container}>
                <ScrollView>
                    <SettingsItem
                        value={theme.name === 'dark'}
                        onChange={handleThemeChange}
                        label="Dark Theme"
                    />
                    <SettingsItemLabel
                        onPress={handleInfoDisplay}
                        label="Display total by"
                        value={infoDisplay}
                    />
                    <SettingsItemLabel
                        onPress={handleSetSort}
                        label="Sort Subscriptions"
                        value={sort.split(':')[0]}
                    />
                    <SettingsItemLabel
                        onPress={handleInfoNextBill}
                        label="Display next bill"
                        value={infoNextBill}
                    />
                    <SettingsItemLabel
                        onPress={handleExport}
                        label="Save backup"
                    />
                    <SettingsItemLabel
                        onPress={handleImport}
                        label="Import from backup"
                    />
                    <SettingsItemLabel
                        onPress={handleClearSub}
                        label="Clear Subscriptions"
                        confirm="Are you sure you want to clear all subscriptions?"
                    />
                </ScrollView>
            </View>
        </View>
        <Alert
            message={alertMsg}
            setAlertMsg={setAlertMsg}
        />
    </>
    )
}

export default Settings
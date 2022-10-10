import { useRef, useState } from "react"
import { TouchableOpacity, Image, TextInput, StyleSheet } from "react-native"
import { FONTS, SIZES } from "../../constants/theme"
import { useSelector } from "react-redux"


const Input = ({
    icon,
    placeholder,
    value,
    onChangeText,
    autoFocus,
}) => {
    const { theme } = useSelector(state => state.local);
    const inputRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false)

    const style = StyleSheet.create({
        container: {
            borderWidth: 1,
            borderColor: isFocused ? theme.textDark : theme.tertiary,
            flexDirection: 'row',
            alignItems: 'center',
            width: "100%",
            paddingHorizontal: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: theme.main,
        },
        input: {
            flexShrink: 1,
            width: '100%',
            color: theme.textDark,
            ...FONTS.body3
        },
        icon: {
            width: 15,
            height: 15,
            marginRight: SIZES.padding,
            tintColor: isFocused ? theme.textDark : theme.tertiary,
        }
    })

    return (
        <TouchableOpacity
            onPress={() => inputRef.current.focus()}
            style={style.container}
        >
        {icon && (
            <Image
                resizeMode='contain'
                source={icon}
                style={style.icon}
            />
        )}
        <TextInput 
            ref={inputRef}
            placeholder={placeholder}
            placeholderTextColor={theme.textSecondary}
            value={value}
            autoFocus={autoFocus}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={onChangeText}
            style={style.input}
        />
    </TouchableOpacity>
    )
}

export default Input
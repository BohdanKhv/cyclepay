import { useRef, useState } from "react"
import { TouchableOpacity, Image, TextInput, StyleSheet } from "react-native"
import { COLORS, FONTS, SIZES } from "../../constants/theme"


const Input = ({
    icon,
    placeholder,
    value,
    onChangeText,
    autoFocus,
}) => {
    const inputRef = useRef(null)
    const [isFocused, setIsFocused] = useState(false)

    const style = StyleSheet.create({
        container: {
            borderWidth: 1,
            borderColor: isFocused ? COLORS.gray70 : COLORS.gray20,
            flexDirection: 'row',
            alignItems: 'center',
            width: "100%",
            paddingHorizontal: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.main,
        },
        input: {
            flexShrink: 1,
            width: '100%',
            color: COLORS.textDark,
            ...FONTS.body3
        },
        icon: {
            width: 15,
            height: 15,
            marginRight: SIZES.padding,
            tintColor: COLORS.gray50
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
            placeholderTextColor={COLORS.gray50}
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
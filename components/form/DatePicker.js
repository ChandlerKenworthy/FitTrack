import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../../constants/Globalstyles'

const DatePicker = ({date, setDate, allowFuture}) => {
    const [pickerOpen, setPickerOpen] = useState(false);

    return (
        <>
            {pickerOpen && <Text>Abiltiy to pick a date...</Text>}
            <TouchableOpacity onPress={() => setPickerOpen(!pickerOpen)} style={styles.container}>
                <Text style={styles.monthText}>
                    {date.getDate()} / {date.getMonth()+1 < 10 ? "0"+(date.getMonth()+1).toString() : date.getMonth()+1} / {date.getFullYear()}
                </Text>
            </TouchableOpacity>
        </>
    )
}

export default DatePicker

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    monthText: {
        fontSize: 18,
        fontWeight: '300'
    }
})
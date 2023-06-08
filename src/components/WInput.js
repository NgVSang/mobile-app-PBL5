import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
const WInput = ({
    value,
    changeValue,
    label,
    placeholder,
    type,
    autoFocus = false,
    style,
    styleInput,
    showIcon=false,
    ...props
}) => {
    return (
        <View style={[styles.group, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={(text) => changeValue(text)}
                autoFocus={autoFocus}
                style={[styles.input, styleInput]}
                placeholder={placeholder}
                keyboardType={type}
                {...props}
            />
        </View>
    );
};

export default WInput

const styles = StyleSheet.create({
    group: {
        width: "100%",
    },
    input: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#C4CDD4",
        borderRadius: 24,
        padding: 16,
        height: 50,
        fontWeight: "400",
        fontSize: 13,
        color: "#757F8E",
        lineHeight:22,
    },
    label: {
        fontWeight: "500",
        fontSize: 13,
        color: "#36383A",
        lineHeight:20,
        marginBottom:6,
    },
});
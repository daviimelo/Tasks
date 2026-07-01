import React from "react";
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import commonStyles from "../styles/commonStyles";

export default (props: any) => {
    const { style, ...inputProps } = props;
 return (
    <View style={[styles.container, props.style]}>
        <Icon name={props.icon} size={20} style={styles.icon} />
        <TextInput 
            {...inputProps} 
            placeholderTextColor="#FFFFFF" 
            style={[
                styles.input, 
                { fontFamily: commonStyles.font, fontWeight: '700' }
            ]} 
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        minHeight: 40,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    icon: {
        color: commonStyles.colors.secondary,
        marginHorizontal: 10
    },

    input: {
        flex: 1,
        color: commonStyles.colors.secondary
    }
})
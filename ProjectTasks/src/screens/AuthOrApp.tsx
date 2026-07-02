import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native"
import commonStyles from "../styles/commonStyles";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProps {
    navigation?: any
}

export default class AuthOrApp extends Component<AuthProps> {
    async componentDidMount() {
        const userDataJson = await AsyncStorage.getItem('userData')
        let userData = null
        try {
            if (userDataJson) {
                userData = JSON.parse(userDataJson)
            }
        } catch (e) {
        }

        if (userData && userData.token) {
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation?.navigate('Home', userData)
        } else {
            this.props.navigation?.navigate('Auth')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.primary
    }
})
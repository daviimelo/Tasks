import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyles from '../styles/commonStyles';
import { Gravatar } from "react-native-gravatar"
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu(props: any) {

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.navigate('AuthOrApp')
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <Gravatar 
                        options={{
                            email: 'davi@email.com',
                            parameters: { 
                                size: '40', 
                                d: 'mm'
                            },
                            secure: true
                        }}
                        style={styles.avatar}
                    />
                    <View>
                        <Text style={styles.name}>Olá, {props.userData.name}!</Text>
                        <Text style={styles.email}>{props.userData.email}</Text>
                    </View>
                </View>

                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.logoutContainer}>
                <TouchableOpacity 
                    style={styles.logoutButton} 
                    onPress={logout}
                >
                    <Icon name="sign-out" size={18} color="#D9534F" />
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: 20
    },
    name: {
        fontFamily: commonStyles.font,
        fontSize: 18,
        color: commonStyles.colors.primary,
        fontWeight: '700',
    },
    email: {
        fontFamily: commonStyles.font,
        fontSize: 14,
        color: commonStyles.colors.primary,
    },
   logoutContainer: {
        borderTopWidth: 1,
        borderColor: '#DDD',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    logoutText: {
        fontFamily: commonStyles.font,
        fontSize: 14,
        color: '#D9534F',
        marginLeft: 15,
        fontWeight: '700',
    }
});
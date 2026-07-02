/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import commonStyles from '../styles/commonStyles';
import AuthInput from '../components/AuthInput';
import { server, showError, showSuccess } from '../common';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthProps {
    navigation?: any
}

const initialState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    stateNew: false,
}

export default class Auth extends Component<AuthProps> {
    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if (this.state.stateNew) {
            this.signup()
        } else {
            this.signin()
        }
    }

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            })

            showSuccess('Usuário cadastrado!')

            this.setState({ ...initialState })
        } catch(e: any) {
            const errorMessage = e.response?.data || e.message || "Ocorreu um erro inesperado";
            showError(errorMessage);
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email.trim().toLowerCase(),
                password: this.state.password
            })

            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation?.navigate('Home', res.data)
            
        } catch (e: any) {
            const errorMessage = e.response?.data || e.message || "Ocorreu um erro inesperado";
            showError(errorMessage);
        }
    }

    render() {
        const validations = []
        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if (this.state.stateNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.confirmPassword === this.state.password)
        }

        const validForm = validations.reduce((t, a) => t && a )

        return (
            <View style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <Text style={styles.subtitle}>{this.state.stateNew ? 'Crie a sua conta!' : 'Informe os seus dados'}</Text>
                <View style={styles.formContainer}>
                    {this.state.stateNew && 
                        <AuthInput
                            icon='user'
                            placeholder='Nome'
                            value={this.state.name} 
                            style={styles.input}
                            onChangeText={(name: any) => this.setState({ name })} 
                        />
                    }
                    <AuthInput
                        icon='at'
                        placeholder='E-mail' 
                        value={this.state.email} 
                        style={styles.input}
                        onChangeText={(email: any) => this.setState({ email })} 
                    />
                    <AuthInput
                        icon='lock'
                        placeholder='Senha' 
                        value={this.state.password} 
                        style={styles.input}
                        onChangeText={(password: any) => this.setState({ password })}
                        secureTextEntry={true} 
                    />
                    {this.state.stateNew && 
                        <AuthInput 
                            icon='lock'
                            placeholder='Confirmar Senha' 
                            value={this.state.confirmPassword} 
                            style={styles.input} 
                            onChangeText={(confirmPassword: any) => this.setState({ confirmPassword })}
                            secureTextEntry={true} 
                        />
                    }
                    <TouchableOpacity 
                        onPress={this.signinOrSignup}
                        disabled={!validForm}
                    >
                        <View style={[styles.button, !validForm ? styles.buttonDisabled : {}]}>
                            <Text style={styles.buttonText}>{this.state.stateNew ? 'Criar' : 'Login'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ padding: 10 }} onPress={() => this.setState({stateNew: !this.state.stateNew})}>
                    <Text style={styles.textCreate}>{this.state.stateNew ? 'Já possui conta?' : 'Ainda não criou sua conta?'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1d1d1d'
    },

    title: {
        fontFamily: commonStyles.font,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginBottom: 10,
    },

    subtitle: {
        fontFamily: commonStyles.font,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginBottom: 10,
    },

    formContainer: {
        padding: 10,
        width: '90%',
    },

    input: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#C1C1C1',
        borderRadius: 10,
        fontFamily: commonStyles.font,
        fontWeight: '700'
    },
    
    button: {
        backgroundColor: commonStyles.colors.secondary,
        marginTop: 30,
        padding: 10,
        alignItems: 'center',
        borderRadius: 20
    },

    buttonDisabled: {
        backgroundColor: '#969696'
    },

    buttonText: {
        fontFamily: commonStyles.font,
        fontWeight: '700'
    },

    textCreate: {
        fontFamily: commonStyles.font,
        color: commonStyles.colors.secondary,
        fontSize: 14,
        marginBottom: 10,
        textDecorationLine: 'underline',

    },
})
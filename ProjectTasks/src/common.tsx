import { Alert, Platform } from 'react-native'

const server = Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000"

function showError(err: any) {
    let errorMessage = 'Ocorreu um erro inesperado.';

    if (err.response && err.response.data) {
        if (typeof err.response.data === 'string') {
            errorMessage = err.response.data;
        } 
        else if (err.response.data.message || err.response.data.error) {
            errorMessage = err.response.data.message || err.response.data.error;
        }
    } 
    else if (err.message) {
        errorMessage = err.message;
    } 
    else if (typeof err === 'string') {
        errorMessage = err;
    }

    // Exibe apenas UM alerta com a mensagem tratada
    Alert.alert('Ocorreu um problema!', errorMessage)
}

function showSuccess(suc: any) {
    Alert.alert('Sucesso!', suc)
}

export { server, showError, showSuccess }
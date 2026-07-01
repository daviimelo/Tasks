import { Alert, Platform } from 'react-native'

const server = Platform.OS === "ios" ? "http://localhost:3000" : "http://10.0.2.2:3000"

function showError(err: any) {
    Alert.alert('Ocorreu um problema!', err)
}

function showSuccess(suc: any) {
    Alert.alert('Sucesso!', suc)
}

export { server, showError, showSuccess }
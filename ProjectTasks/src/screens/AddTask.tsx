import React, { Component } from "react";
import { Platform, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, View, GestureResponderEvent, Text,TextInput } from "react-native";
import commonStyles from "../styles/commonStyles";
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import 'moment/locale/pt-br'

interface TaskData {
    desc: string;
    estimateAt: Date;
}

interface AddTaskProps {
    isVisible?: boolean,
    onCancel?: (event: GestureResponderEvent) => void,
    onSave?: (task: TaskData) => void,
}

const initialState = () => ({ desc: '', estimateAt: new Date(), showDatePicker: false })

export default class AddTask extends Component<AddTaskProps> {
    state = {
        ...initialState()
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            estimateAt: this.state.estimateAt
        }

        this.props.onSave && this.props.onSave(newTask)
        this.setState({ ...initialState() })

    }

    getDatePicker = () => {
        let datePicker = <DateTimePicker value={this.state.estimateAt} mode="date" 
            onChange={(event: any, estimateAt: any) => {
                if (estimateAt) {
                    this.setState({estimateAt, showDatePicker: false})
                }
            }} />
        
        const dateString = moment(this.state.estimateAt).format('ddd, D [de] MMMM [de] YYYY' )

        if (Platform.OS === 'android') {
            datePicker = (
                <View style={styles.input}>
                    <TouchableOpacity onPress={ () => this.setState({showDatePicker: true}) }>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }
        return datePicker
    }

    render() {
        return (
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType="slide">
                <View style={styles.background}>
                    <TouchableWithoutFeedback onPress={this.props.onCancel}>
                        <View style={styles.viewCancel}></View>
                    </TouchableWithoutFeedback>
                    <View style={styles.container}>
                        <Text style={styles.header}>Nova Tarefa</Text>
                        <TextInput placeholder="Informe a descrição..." style={styles.input} value={this.state.desc} onChangeText={desc => this.setState({desc})}/>
                        {this.getDatePicker()}
                        <View style={styles.containerButtons}>
                            <TouchableOpacity onPress={this.props.onCancel}>
                                <Text style={styles.button}>Cancelar</Text> 
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.save}>
                                <Text style={styles.button}>Salvar</Text> 
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={this.props.onCancel}>
                        <View style={styles.viewCancel}></View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    viewCancel: {
        flex: 1
    },
    container: {
        backgroundColor: '#FFFFFF',
        margin: 20,
        borderRadius: 15,
    },
    header: {
        fontFamily: commonStyles.font,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secundary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: 15,
    },
    input: {
        fontFamily: commonStyles.font,
        height: 40,
        margin: 15,
        backgroundColor: commonStyles.colors.secundary,
        borderWidth: 1,
        borderColor: '#B1B1B1',
        borderRadius: 6,
        paddingLeft: 10,
        justifyContent: 'center',
        fontSize: 15,
    },
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    date: {
        fontFamily: commonStyles.font,
        fontSize: 15,

    }
})
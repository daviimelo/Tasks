import React, { Component } from "react";
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from "react-native";
import Task from "../components/Task";
import AddTask from "./AddTask";
import commonStyles from "../styles/commonStyles";
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from "axios";
import { server, showError, showSuccess } from "../common";
import todayImage from "../assets/imgs/today.jpg"
import tomorrowImage from "../assets/imgs/tomorrow.jpg"
import weekImage from "../assets/imgs/week.jpg"
import monthImage from "../assets/imgs/month.jpg"

interface TaskListProps {
    title: string;
    daysAhead: number;
    navigation?: any;
    route?: any;
}

interface ITask {
    id: number,
    desc: string,
    estimateAt: Date | null,
    doneAt: Date | null
}

interface IState {
    showDoneTask: boolean,
    showAddTask: boolean,
    visibleTasks: ITask[],
    tasks: ITask[]
}

const initialState = {
    showDoneTask: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}

export default class TaskList extends Component<TaskListProps, IState> {
    state: IState = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString as any) || initialState
        this.setState({
            showDoneTask: savedState.showDoneTask
        }, this.filterTasks)

        this.loadTasks()
    }

    loadTasks = async () => {
        try {
            const maxDate = moment()
                .add({ days: this.props.daysAhead })
                .format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({ tasks: res.data}, this.filterTasks)
        } catch (e: any) {
            const errorMessage = e.response?.data || e.message || "Ocorreu um erro inesperado";
            showError(errorMessage);
        }
    }

    toggleTask = async (taskId: number) => {
        try {
            await axios.put(`${server}/tasks/${taskId}/toggle`)
            await this.loadTasks()
        } catch (e: any) {
            const errorMessage = e.message || "Ocorreu um erro inesperado";
            showError(errorMessage);
        }
    }

    toggleFilter = () => {
        this.setState({showDoneTask: !this.state.showDoneTask}, this.filterTasks)
    }

    isPending = (task: ITask) => {
        return task.doneAt === null;
    }

    filterTasks = () => {
        let visibleTasks = null
        if (this.state.showDoneTask) {
            visibleTasks = [...this.state.tasks]
        } else {
            visibleTasks = this.state.tasks.filter(this.isPending)
        }

        this.setState({visibleTasks})
        AsyncStorage.setItem('tasksState', JSON.stringify({
            showDoneTask: this.state.showDoneTask
        }))
    }

    addTask = async (newTask: ITask) => {
        if (!newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'A descrição não foi informada!')
            return
        }

        try {
            await axios.post(`${server}/tasks`, {
                desc: newTask.desc,
                estimateAt: newTask.estimateAt
            })

            this.setState({ showAddTask: false }, this.loadTasks)
        } catch (e: any) {
            const errorMessage = e.message || "Ocorreu um erro inesperado";
            showError(errorMessage);
        }
    }

    deleteTask = async (taskId: number) => {
        try {
            await axios.delete(`${server}/tasks/${taskId}`)
            await this.loadTasks()
        } catch (e: any) {
            const errorMessage = e.message || "Ocorreu um erro inesperado";
            showError(errorMessage);
        }
    }

    getImage = () => {
        switch(this.props.daysAhead) {
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            default: return monthImage
        }
    }

    getColors = () => {
        switch(this.props.daysAhead) {
            case 0: return commonStyles.colors.today
            case 1: return commonStyles.colors.tomorrow
            case 7: return commonStyles.colors.week
            default: return commonStyles.colors.month
        }
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })} onSave={this.addTask as any}/>
                    <ImageBackground style={styles.background} source={this.getImage()}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={() => this.props.navigation.openDrawer() }>
                                <Icon name='bars' size={20} color={commonStyles.colors.secondary}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneTask ? "eye" : "eye-slash"} size={20} color={commonStyles.colors.secondary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>{this.props.title}</Text>
                            <Text style={styles.subtitle}>{today}</Text>
                        </View>
                    </ImageBackground>
                    <View style={styles.taskList}>
                        <FlatList
                            data={this.state.visibleTasks as any}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask}></Task>}
                        >

                        </FlatList>
                    </View>
                    {!this.state.showAddTask ?
                        <TouchableOpacity activeOpacity={0.8} style={[styles.addButton, { backgroundColor: this.getColors() }]} onPress={() => this.setState({showAddTask: true})}>
                            <Icon name="plus" size={20} color={commonStyles.colors.secondary}/>
                        </TouchableOpacity>
                        : null
                    }
                
                </View>
            </GestureHandlerRootView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3,
    },
    taskList: {
        flex: 7,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.font,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: commonStyles.font,
        fontSize: 20,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: Platform.OS === "ios" ? 40 : 20
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 45,
        height: 45,
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
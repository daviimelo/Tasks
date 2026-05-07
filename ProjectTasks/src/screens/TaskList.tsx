import React, { Component } from "react";
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from "react-native";
import Task from "../components/Task";
import AddTask from "./AddTask";
import commonStyles from "../styles/commonStyles";
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/FontAwesome'
import todayImage from "../assets/imgs/today.jpg"
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage'

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

export default class TaskList extends Component {
    state: IState = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const state = JSON.parse(stateString as any) || initialState
        this.setState(state, this.filterTasks)
    }

    toggleTask = (taskId: number) => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if (task.id === taskId) {
                task.doneAt = task.doneAt ? null : new Date()
            }
        })
        this.setState({tasks}, this.filterTasks)
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
        AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
    }

    addTask = (newTask: ITask) => {
        if (!newTask.desc.trim()) {
            Alert.alert('Dados Inválidos', 'A descrição não foi informada!')
            return
        }

        const tasks = [...this.state.tasks]

        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.estimateAt,
            doneAt: null
        })

        this.setState({ tasks, showAddTask: false }, this.filterTasks)
    }

    deleteTask = (id: number) => {
        const tasks = this.state.tasks.filter(task => task.id !== id)
        this.setState({ tasks }, this.filterTasks)
    }

    render() {
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })} onSave={this.addTask as any}/>
                    <ImageBackground style={styles.background} source={todayImage}>
                        <View style={styles.iconBar}>
                            <TouchableOpacity onPress={this.toggleFilter}>
                                <Icon name={this.state.showDoneTask ? "eye" : "eye-slash"} size={20} color={commonStyles.colors.secundary}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleBar}>
                            <Text style={styles.title}>Hoje</Text>
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
                        <TouchableOpacity activeOpacity={0.8} style={styles.addButton} onPress={() => this.setState({showAddTask: true})}>
                            <Icon name="plus" size={20} color={commonStyles.colors.secundary}/>
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
        color: commonStyles.colors.secundary,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: commonStyles.font,
        fontSize: 20,
        color: commonStyles.colors.secundary,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        backgroundColor: commonStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
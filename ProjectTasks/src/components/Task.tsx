import React, { Component } from "react"
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'
import commonStyles from "../styles/commonStyles"
import moment from 'moment'
import 'moment/locale/pt-br'
import Icon from "react-native-vector-icons/FontAwesome"

export default (props: any) => {

    const doneOrNot = props.doneAt != null ? { textDecorationLine: 'line-through' as const} : {}
    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={20} color='#FFFFFF'/>
            </TouchableOpacity>
        );
    };

    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name="trash" size={20} color='#FFFFFF' style={styles.excludeIcon}/>
                <Text style={styles.excludeText}>Excluir</Text>
            </View>
        )
    }

    const handleSwipeableOpen = (direction: 'left' | 'right') => {
        if (direction === 'right') {
            if (props.onDelete) {
                props.onDelete(props.id);
            }
        }
    }

    return (
        <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent} onSwipeableOpen={handleSwipeableOpen}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.toggleTask(props.id)}
                >
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNot]}>{props.desc}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

function getCheckView(doneAt: any) {
    if (doneAt != null) {
        return (
             <View style={styles.done}>
                <Icon name="check" size={15} color='#FFFFFF'></Icon>
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAAAAA',
        borderWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#FFFFFF'
    },

    checkContainer: {
        width: '20%',
        alignItems: 'center',

    },

    pending: {
        height: 25,
        width: 25,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#555555'
    },

    done: {
        height: 25,
        width: 25,
        borderRadius: 5,
        backgroundColor: '#0066ff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    desc: {
        fontFamily: commonStyles.font,
        color: commonStyles.colors.primary,
        fontSize: 15,
    },

    date: {
        fontFamily: commonStyles.font,
        color: commonStyles.colors.subText,
    },

    right: {
        backgroundColor: '#ff0000',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },

    left: {
        flex: 1,
        backgroundColor: '#ff0000',
        flexDirection: 'row',
        alignItems: 'center',
    },

    excludeText: {
        fontFamily: commonStyles.font,
        color: commonStyles.colors.secundary,
        fontSize: 15,
        margin: 10,
    },

    excludeIcon: {
        marginLeft: 10
    }
})
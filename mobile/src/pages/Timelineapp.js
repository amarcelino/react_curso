//import liraries
import React, { Component } from 'react';
import { FlatList,  View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons'
import Tweet from '../components/Tweet';

// create a component
export default class Timelineapp extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Início",
        headerRight :(
            <TouchableOpacity onPress={ ()=>navigation.navigate('New')}  >
                <Icon 
                    style={{marginRight: 20}}
                     name="add-circle-outline" 
                     size={24} color="#fbb0ee" />
            </TouchableOpacity>
        )
    });

    state = {
        tweets: []
    };

    async componentDidMount(){
       // this.subscribeToEvents();
        const response = await api.get('tweets');
    
        this.setState( {tweets: response.data} );
    }

    subscribeToEvents = () =>{
        const io = socket('http://192.168.0.6:3000');
    
        io.on('tweet', data=>{
           this.setState({ tweets: [data, ... this.state.tweets] });
        });
    
        io.on('like', data=> {
            this.setState({ tweets: this.state.tweets.map( tweet =>
                tweet._id == data._id ? data : tweet
                ) });
        });
    };


    render() {
        return (
            <View style={styles.conatiner}>
                <FlatList
                    data={this.state.tweets}
                    keyExtractor={tweet => tweet._id}
                    renderItem={({ item })=> <Tweet tweet={item} /> }
                />
            </View>
        );

    }
    
}


const styles = StyleSheet.create({
    conatiner:{
        flex: 1,
        backgroundColor: "#fff"
    }
})
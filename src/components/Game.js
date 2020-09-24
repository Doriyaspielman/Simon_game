import  React, {Component}  from  'react' ;
import  {  StyleSheet ,  Text ,  View ,  TouchableOpacity ,  Alert ,  Button, Dimensions}  from  'react-native' ;
import { connect } from 'react-redux'
import Sound from 'react-native-sound';
import {_storeData,updateData} from './LeaderBoard.js';

//style 
const { sounds } = require('./sound.js');
const { width, height} = Dimensions.get('window');
const CELL_SIZE = Math.floor(width * .4); 
const CELL_PADDING = Math.floor(CELL_SIZE * .08);
const TILE_SIZE = CELL_SIZE - CELL_PADDING * 1;

const StartButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

let Colors = ["#32CD32", "red", "#fdff00", "blue", "white"];
let gameSequence = [];
let userSequence = [];
let gameOver = true;
let canPlay = true; // user can play or not 


class Game extends React.Component {
static defaultProps = {
  score: 0
};
 constructor(props) {
    super(props);    
	this.state = {score: 0};
	this.state = {flashIndex: 0} 
 }
 
    render() {
        updateData();
        return (
            <View style={styles.container}>
                    <Text style={styles.textBox}> Score: {this.state.score}</Text>
                <View>
                    <View style={styles.gameBox}>
                        {this.renderTiles(0)}
                        {this.renderTiles(1)} 
                    </View>
                    <View style={styles.gameBox}>
                        {this.renderTiles(2)} 
                        {this.renderTiles(3)}  
                    </View>
                </View >
                <StartButton title="PLAY!" onPress={()=> (canPlay == true ? this.resetTheGame() : console.log("no"))}/>
                <StartButton title="STOP" onPress={()=> this.stopTheGame()}/>
            </View>
        );
    }

    //display tiles and their colors
    renderTiles(i) {
        let id= i+1;
        let color = {backgroundColor: Colors[i]}
        let flash = {backgroundColor: Colors[4]}
        return (
            <TouchableOpacity onPress={()=> (canPlay == true ? this.play(id) : console.log("no"))}>
                <View style={[styles.tile, this.state.flashIndex == id ? flash : color]}/>
            </TouchableOpacity>
        )		
    }

    playSound(i){
        if(gameOver == false){
        sounds[i-1].play((success) => {
        if (success) {
            console.log('successfully finished playing');
        } else {
            console.log('playback failed due to audio decoding errors');
        }
        });
        }
    }

    //reset the game
    resetTheGame() {
        console.log("---------------------------------------------");
        this.setState({score: this.props.score});
        gameSequence = [];
        userSequence = [];
        gameOver = false;
        this.setState({flashIndex: 0});
        this.setState({score: 0});
        let startColor = random(1, 4);
        gameSequence.push(startColor);
        this.playColor(gameSequence);
    }

    //play and update data eith the new score
    play(id) {
        console.log("play");
        this.playSound(id);
        userSequence.push(id);
        for(i=0; i<userSequence.length; i++){
            if(userSequence[i] != gameSequence[i]){
                gameOver = true;
                this.setState({flashIndex: 0});
                Alert.alert("Try Again!")
                this.addAndUpdate();
            }
        }
        if (gameOver == false && (userSequence.length == gameSequence.length)){
            this.setState({score: this.state.score + 1});
            userSequence = [];
            gameSequence.push(random(1, 4));
            this.playColor(gameSequence);
            
        }
    }

    //play the sound and and make "flash" when pressed    
    playColor(sequence) {
        
        var i = 0;
        this.intervalId = setInterval(() => {
            canPlay = false;
            this.playSound(sequence[i]);
            this.setState({flashIndex: sequence[i]});
            setTimeout(() => this.setState({flashIndex: 0}), 300);
            i++;
            if (i >= sequence.length) {
                clearInterval(this.intervalId);
                setTimeout(() => this.setState({flashIndex: 0}), 300);
                canPlay = true;

            }
        }, 800);
    }

    //stop the game and save the score
    stopTheGame(){
        this.addAndUpdate();
        gameOver = true;
    }

    //add and update the data
    addAndUpdate(){
        if(this.state.score > 0){
            _storeData(this.state.score);
        }
        updateData();        
    }
}

//get a random number from a given range 
function random(min, max){
    return  (min + Math.floor(Math.random() * (max + 1 - min)));
}


const styles = StyleSheet.create({
    container: {
        width: width,
        height: height-TILE_SIZE,
        justifyContent:'space-around',
    },
    textBox:{
        flexDirection:'row',
        textAlign:'center',
        justifyContent:'space-around',
        fontSize:25,
		fontStyle: "italic",
		fontWeight: "bold",

    },
    gameBox:{
        width:width,
        flexDirection:'row',
        justifyContent:'space-evenly',
        paddingVertical: CELL_PADDING,
		paddingHorizontal: CELL_PADDING,
    },
    tile: {
        width: TILE_SIZE,
        height: TILE_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
      },
	appButtonContainer: {
		width: 120,
		elevation: 15,
		backgroundColor: "#000000",
		borderRadius: 10,
		paddingVertical: 8,
        alignSelf: 'center',
  },
   appButtonText: {
		fontSize: 18,
		color: "#fff",
		fontWeight: "bold",
		alignSelf: "center",
  },
  
});

export default Game

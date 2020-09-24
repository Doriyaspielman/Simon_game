import AsyncStorage from '@react-native-community/async-storage';
import  React, {Component}  from  'react' ;
import  {  StyleSheet , Text , View}  from  'react-native' ;

let scores=[];

export default class LeaderBoard extends React.Component{
  render() {
      return ( 
        <View style={styles.container}>
          <View >
            <Text style={styles.TextStyle}> LeaderBoard  </Text>
          </View>
          <View style={styles.container} >
            {scores.map((item, key)=>(
            <Text style={styles.textBox} key={key}> {key+1}. <Text style={styles.TextNum} key={key}> {item[1]} </Text> </Text>
            ))}
          </View> 
        </View>
      );
  }
}

export async function updateData(){
    await _retrieveData();
    await sortScore(scores);
}

export async function _retrieveData() {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    if (result !== null) {
      scores = result;
    }
  } catch (error) {
    console.log("Error retrieving data"); 
  }
};

//get the latest score and update the data
export async function _storeData(s) {
    let score = s.toString();
    let min = 0;
  try {
      if(scores.length < 10){
        AsyncStorage.setItem(ID(), score);
      }
      else{
        min = findMin();
        if(s > min[1]){
          AsyncStorage.removeItem(min[0]);
          AsyncStorage.setItem(ID(), score);
        }     
      }
  } catch (error) {
    console.log("Error saving data"); 
  }
  await updateData();
}

//find the min score to replace
function findMin(){
    if(scores.length > 0){
        var output = scores.sort(function(a,b){
        return a[1] > b[1];
        })[0];
        return output;
    }
    else{
        return 0;
    } 
}

//sort the scores from the biggest
function sortScore(myArray){
    myArray = myArray.sort(function(a, b) {
    return (a[1] < b[1] ? 1 : -1);
    })
}

//gerate id for the key in score data
// Math.random should be unique because of its seeding algorithm.
// Convert it to base 36 (numbers + letters), and grab the first 9 characters
// after the decimal.
var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
    },
    TextNum:{
      justifyContent:'space-evenly',
      fontSize:24,
      padding: 5,
      fontStyle: "italic",
      fontWeight: 'normal',
      color: "#000000",
    },
    textBox:{
      justifyContent:'space-evenly',
      fontSize:24,
      padding: 5,
      fontWeight: "bold",
      color: "#DC143C",
    },
    TextStyle:{
      padding: 24,
      fontSize:25,
      fontStyle: "italic",
      fontWeight: "bold",
      color: "#708090",
          
    }
});

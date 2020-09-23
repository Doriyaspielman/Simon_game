import AsyncStorage from '@react-native-community/async-storage';
import  React, {Component}  from  'react' ;
import  {  StyleSheet , Text , View}  from  'react-native' ;

let i = 1;
let scores=[];
export default class LeaderBoard extends React.Component{
  render() {
      return ( 
        <View style={styles.container}>
          <Text style={styles.TextStyle}> LeaderBoard:  </Text>
            {scores.map((item, key)=>(
            <Text View style={styles.textBox} key={key}>{item[1]}</Text>
            ))}
          </View>
              );
  }
}

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

function sortScore(myArray){
    myArray = myArray.sort(function(a, b) {
    return (a[1] < b[1] ? 1 : -1);
})
}

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

export async function updateData(){
    await _retrieveData();
    await sortScore(scores);
    console.log("get data");
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

export async function _storeData(s) {
    await updateData();
    let score = s.toString();
    let min = 0;
    console.log("scores2: "+ scores.length);
  try {
      if(scores.length < 10){
        AsyncStorage.setItem(ID(), score);
      }
      else{
        min = findMin();
        console.log("min:"+min +" s: "+s);
        if(s > min[1]){
          AsyncStorage.removeItem(min[0]);
          AsyncStorage.setItem(ID(), score);
        }     
      }
  } catch (error) {
    console.log("Error saving data"); 
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'space-evenly',
    },
    textBox:{
      textAlign:'center',
      justifyContent:'space-evenly',
      fontSize:20,

    },
    TextStyle:{
      textAlign: 'center',
      fontSize:25,
      fontStyle: "italic",
      fontWeight: "bold",
          
    }
});

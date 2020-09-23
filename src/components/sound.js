import  React, {Component}  from  'react' ;
import Sound from 'react-native-sound';
import s1 from '../audio/simonSound1.mp3'
import s2 from '../audio/simonSound2.mp3'
import s3 from '../audio/simonSound3.mp3'
import s4 from '../audio/simonSound4.mp3'


let sound1 = new Sound(s1, Sound.MAIN_BUNDLE);
let sound2 = new Sound(s2, Sound.MAIN_BUNDLE);
let sound3 = new Sound(s3, Sound.MAIN_BUNDLE);
let sound4 = new Sound(s4, Sound.MAIN_BUNDLE);

module.exports.sounds = [sound1, sound2, sound3, sound4];

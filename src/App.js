// may not need this
// import axios_lib from 'axios';
// const axios = axios_lib.create({
//   baseURL: BACKEND + ':4000',
// });
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Howl } from 'howler';

// 'ws://localhost:8000'
const BACKEND = 'ws://' + window.location.hostname + ':8000';
const client = new W3CWebSocket(BACKEND);

// tone stuff
var note = function(int){
  int = int % 24
  switch(int){
    case 0: return 'C1';
    case 1: return 'Cs1';
    case 2: return 'D1';
    case 3: return 'Ds1';
    case 4: return 'E1';
    case 5: return 'F1';
    case 6: return 'Fs1';
    case 7: return 'G1';
    case 8: return 'Gs1';
    case 9: return 'A1';
    case 10: return 'As1';
    case 11: return 'B1';
    case 12: return 'C2';
    case 13: return 'Cs2';
    case 14: return 'D2';
    case 15: return 'Ds2';
    case 16: return 'E2';
    case 17: return 'F2';
    case 18: return 'Fs2';
    case 19: return 'G2';
    case 20: return 'Gs2';
    case 21: return 'A2';
    case 22: return 'As2';
    case 23: return 'B2';
  }
}

const modes = ['a','b','c','d','e','f'];

class App extends Component {
  constructor(props){
    super(props)

    // set up the fucking sounds 
    let sounds = {};
    let note_names = [];

    // let player;



    console.log(sounds)

    this.state = {
      sounds: sounds,
      note_names: note_names,
    }

    // this.setState({sounds: sounds, note_names: note_names})

    // // this is not necessary
    // this.playSound=this.playSound.bind(this);
    // console.log('cool')
  }

  componentWillMount() {

    let note_names = [];
    let sounds = {};

    // howl all them damn sounds
    for(var i=0; i<modes.length; i++){
      for(var x=0; x<9; x++){

        console.log('clfirstcky')
        let note_name = modes[i] + x;
        if(note_name){

            let player = new Howl({
              src: ["http://localhost:4000/keypad/" + note_name + ".mp3"],
              // loop: true,
              // autoplay: true
            });

            sounds[note_name] = player;
        }

        // sounds[note_name] = player;
        note_names.push(note_name);
      }
    }

    // save hte sounds to state
    this.setState({
      sounds: sounds
    }, function(){

      // this.state.n0.load();  
      console.log('clicky')
    })

    this.setState({note_names: note_names, sounds: sounds})


    client.onopen = () => {
      console.log('WebSocket Client Connectedzz Master');
    };

    client.onmessage = (message) => {

      console.log('da master message');
      console.log(message.data);

      // itss not json
      // let data = JSON.parse(message.data)
      let note_name = message.data;
      this.playSound(note_name)
    };
  }

  playSound(note_name){
    console.log(this.state.sounds[note_name])
    console.log('I play my note dummy ' + note_name)
    let player = this.state.sounds[note_name];
    console.log(player)
    player.stop().play();

    // let playing_note = 'playing_' + note_name.slice(-1);
    // this.setState({
    //   [playing_note]: true
    // // }, function(){

    // //   setTimeOut({
    // //     // this.setState({[playing_note]: false })
    // //     console.log('wowowow')
    // //   }, 400);
    // //   console.log('clicky')
    // })

  }
  
  render() {
    // console.log(note_names)
    // this.state.sounds['f0'].play();
    return (
      <div>
        { this.state.note_names.map((note_name, index) => <Sound key={ index } note_name={ note_name }  /> ) }
      </div>
    );
  }
}

function Sound (props){
  // console.log(props.note)

  console.log(props.note_name.slice(-1))

  return (
    <div className={ "glow" + props.note_name.slice(-1)} >
      { props.note_name }
    </div>
  );
}

export default App;
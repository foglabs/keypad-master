// may not need this
// import axios_lib from 'axios';
// const axios = axios_lib.create({
//   baseURL: BACKEND + ':4000',
// });
import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

// 'ws://localhost:8000'
const BACKEND = 'ws://' + window.location.hostname + ':8000';
const client = new W3CWebSocket(BACKEND);


class App extends Component {
  constructor(props){
    super(props)
    // this.state = {
    //   userid: null,
    // }

    // this is not necessary
    this.playSound=this.playSound.bind(this);
    console.log('cool')
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connectedzz Master');
    };

    client.onmessage = (message) => {
      console.log('da master message');
      console.log(message.data);
      let data = JSON.parse(message.data)
      this.playSound(data.note)
    };
  }

  playSound(note){
    console.log('I fucking clicked stupid')
    if(client.readyState === client.OPEN){
      
      
    }
  }
  
  render() {
    return (
      <div>
        { sounds.map((sound) => <Sound sound={ sound } number={ sound }  /> ) }
      </div>
    );
  }
}

function Sound (props){
  return (
    <div className="sound" onClick={ props.onClick } >
      { props.number + 1 }
    </div>
  );
}

export default App;
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'

interface MyState {
  isLoaded: boolean,
  name: string,
  message: string,
  chattingWindow: Array<{name: string, message: string}>
}

class App extends Component<{}, MyState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isLoaded: false,
      name: "",
      message: "",
      chattingWindow: [{name: "test: ", message: "Oh Hi Mark"}]
    }
  }

  componentDidMount() {
    const socket = socketIOClient("http://localhost:8080");
    socket.on('chat', (data: any) => {
      console.log(data);
      let newChatting = this.state.chattingWindow.concat(data);
      this.setState({chattingWindow: newChatting})
    });
  }

  emitHandler(key: string,) {
    if (key != 'Enter') return;
    const socket = socketIOClient("http://localhost:8080");
    socket.emit('chat', {name: this.state.name, message: this.state.message});
    this.setState({message: ""});
  }

  render() {
    return (
      <div>
        <div className="show">
        <p>messages go here</p>
        {this.state.chattingWindow.map((a, index) => 
          <p key={index}>{a.name + ": " + a.message}</p>
        )}

        </div>
        <div>
          <input placeholder="Enter your name here" value={this.state.name} onChange={(e) => {this.setState({name: e.target.value})}} />
        </div>
        <div>
          <input placeholder="type here" value={this.state.message} onChange={(e) => {this.setState({message: e.target.value})}} onKeyDown={(e) => {this.emitHandler(e.key)}}/>
        </div>
      </div>
    )
  }
}

export default App;

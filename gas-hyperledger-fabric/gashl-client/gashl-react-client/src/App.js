import React, { Component } from 'react';


import './App.css';

class App extends Component {
  state = {
    response: ''
  };
  
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
  
  callApi = async () => {
    const response = await fetch('http://localhost:4000', { mode: 'no-cors'});
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    
    return body;
  };
  
  
render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;
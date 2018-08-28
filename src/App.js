import React, { Component } from 'react';
import axios from 'axios';
import Timer from './component/timer';
import RendomText from './component/rendomtext';
import './App.css';

class App extends Component {

 
  state ={
    textValue: '',
    text:'',
    typedWordsArray: [],
    startCounter: false,
    endCounter:false
  }
 
totalTime = 0
parsedText = ''
//text=''
textArray = []
remainingWordsArray = []
//typedWordsArray = []



componentDidMount(){
  axios.get('http://www.randomtext.me/api/')
  .then((response) => {
    
    const regex = /(<([^>]+)>)/gi
    this.setState({
      text: response.data.text_out
    })
    //this.text = response.data.text_out
    this.parsedText = this.state.text.replace(regex, '')
    this.remainingWordsArray = this.parsedText.split(' ')
    this.textArray = this.parsedText.split(' ')
    // Set the timeout according to the normal speed of typing 40 words per minute
    this.totalTime = Math.ceil(this.textArray.length / 40 * 60000)
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
handleStart = () =>{
  this.setState(
    {
      startCounter:true,
      endCounter:false
    },
    () => {
      setTimeout(this.onEndCounter, this.totalTime)
    }
  ) 
}
onEndCounter = () => {
  this.setState({
    endCounter: true
  })
}
handleText = e => {
  this.setState(
    {
      textValue: e.target.value,
    },
    this.handleTextChanges
  )
}

handleTextChanges = () => {
  const lastChar = this.state.textValue[this.state.textValue.length - 1]
  if (lastChar === ' ') {
    var arr = this.state.textValue.split(' ');
    if (arr[arr.length-2] === this.remainingWordsArray[0]) {
      //this.typedWordsArray.push(this.remainingWordsArray[0])
      this.setState(prevState => ({
        typedWordsArray: [...prevState.typedWordsArray, this.remainingWordsArray[0]]
      }))
      this.remainingWordsArray.shift()
      this.setState({
        textValue: ''
      })
    }
  }
}

  render() {
    return (
      <div className="App">
        {!this.state.endCounter && (
          <button type="button" onClick={this.handleStart}>Start Typing</button>
        )}
        {this.state.startCounter && !this.state.endCounter && (<div>
          <Timer totalTime={this.totalTime} />
          <RendomText
                textArray={this.textArray}
                typedWordsArray={this.state.typedWordsArray}
                remainingWordsArray={this.remainingWordsArray}
              />
          <textarea className="text" placeholder="start Typing..." onChange={this.handleText}
          ></textarea>
          </div>
        )}
        {this.state.endCounter && (
          <div>
            <h2>Your Score is</h2>
            <h3>
              Your've typed a total of {this.state.typedWordsArray.length} words out
              of {this.textArray.length}
            </h3>
          </div>
        )}
      </div>
    );
  }
}

export default App;

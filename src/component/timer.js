import React, { Component } from 'react';

class Timer extends Component{
    state={
        counter:0
    }
    gap = null

    componentDidMount(){
        this.gap = setInterval(()=>{
            this.setState(
                prevState => {
                    return{
                        counter: prevState.counter + 1
                    }
                }
            )
        },1000)
    }

    componentWillUnmount(){
        clearInterval(this.gap)
    }
    render(){
        const {totalTime} = this.props;
        return(
            <div>
                <h3>
                    Time Remaining: {parseInt(totalTime/1000 - this.state.counter,10)} sec
                </h3>
            </div>
        )
    }
}

Timer.defaultProps = {
    totalTime:0
}

export default Timer;
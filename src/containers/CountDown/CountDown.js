import React, { Component } from 'react';
import Button from "../../components/Button/Button";
import "./CountDown.css";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/businessBuilder';


class CountDown extends Component {

	state = {
  		timerOn: false,
	} 

  constructor(props){ 
    super(props);

    // REFS:
    this.hoursRef = React.createRef();
    this.hoursInputRef = React.createRef();
    this.minutesRef = React.createRef();
    this.minutesInputRef = React.createRef();
    this.secondsRef = React.createRef();
    this.secondsInputRef = React.createRef();

    this.countDownId = this.props.businessData.id;
    this.timerTime = this.props.business[this.props.businessData.id].timerTimeCountDown;    
    this.seconds = this.props.business[this.props.businessData.id].currentCountdownTime.seconds
    this.minutes = this.props.business[this.props.businessData.id].currentCountdownTime.minutes
    this.hours =   this.props.business[this.props.businessData.id].currentCountdownTime.hours 
  }

  componentDidMount(){
    this.timerTime = this.props.business[this.props.businessData.id].timerTimeCountDown;    
    this.seconds = this.props.business[this.props.businessData.id].currentCountdownTime.seconds
    this.minutes = this.props.business[this.props.businessData.id].currentCountdownTime.minutes
    this.hours =   this.props.business[this.props.businessData.id].currentCountdownTime.hours 
      console.log(this.hours)

  }


		startTimer = () => {
  			this.setState({
    			timerOn: true,
  			});

	  		this.timer = setInterval(() => {
	    		const newTime = this.timerTime - 10;
	    			if (newTime >= 0) {
              this.props.saveTimerTime(newTime, this.props.businessData.id)
	    			} else {
	      				clearInterval(this.timer);
	      				this.setState({ timerOn: false });
	      				alert("Countdown ended");
			    }

    // const timerTime = this.timerTime;
    // let seconds = ("0" + (Math.floor((this.timerTime / 1000) % 60) % 60)).slice(-2);
    // let minutes = ("0" + Math.floor((this.timerTime / 60000) % 60)).slice(-2);
    // let hours = ("0" + Math.floor((this.timerTime / 3600000) % 60)).slice(-2);

    this.props.saveTimerTime(this.timerTime, this.props.businessData.id)

			}, 10);
		}

		stopTimer = () => {
  			clearInterval(this.timer);
  			this.setState({ timerOn: false });
		}

		resetTimer = () => {
  			if (this.state.timerOn === false) {
    			this.setState({
     				timerTime: 0
   			 	});
          this.props.clearCurrentCountDownTime(this.props.businessData.id);
  			}
		}

    showTimeInput = (whatToChange) => {

      if(this.state.timerOn){
        return false;
      }

      switch(whatToChange){
        case 'hours':
        this.hoursRef.current.style.display='none'
        this.hoursInputRef.current.style.display='inline-block';
        break;

        case 'minutes':
        this.minutesRef.current.style.display='none';
        this.minutesInputRef.current.style.display='inline-block';
        break;

        case 'seconds':
        this.secondsRef.current.style.display='none';
        this.secondsInputRef.current.style.display='inline-block';
        break;
      }
    }

    inputTimeChangeHandler = (e, input)=> {
      alert();
      // let currentInputValue = this.hoursInputRef.current.value;
      // let timerTime = this.timerTime;
      // let newTimerTimeHours;
      // let newTimerTimeMinutes;
      // if(!this.state.timerOn){
      //   if(input=='hours'){
      //       newTimerTimeHours = currentInputValue*3600000;
      //     }
        
      //   // ...IFS
          
          
      //   }        
      //     let newTimerTime = newTimerTimeHours; // + newTimerTimeMinutes....
      //     this.props.saveTimerTime( ,this.countDownId)
      }

    adjustTimer = input => {
        const { timerOn } = this.state;
        const timerTime = this.timerTime;
        const max = 216000000;
        if (!timerOn) {
          if (input === "incHours" && timerTime + 3600000 < max) {
            this.props.saveTimerTime(timerTime+3600000, this.countDownId)
          } else if (input === "decHours" && timerTime - 3600000 >= 0) {
            this.props.saveTimerTime(timerTime-3600000, this.countDownId)
          } else if (input === "incMinutes" && timerTime + 60000 < max) {
            this.props.saveTimerTime(timerTime+60000 , this.countDownId)
          } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
            this.props.saveTimerTime(timerTime-60000,this.countDownId)
          } else if (input === "incSeconds" && timerTime + 1000 < max) {
            this.props.saveTimerTime(timerTime+1000, this.countDownId)
          } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
            this.props.saveTimerTime(timerTime-1000, this.countDownId)
          }
        }
    }


		render(){

    const timerOn = this.state;
    const timerTime = this.timerTime;

    let seconds = this.seconds;
    let minutes = this.minutes;
    let hours = this.hours;
    let countdown = null;


    if(this.props.isShown){
    countdown = 
      <div className="Countdown">
        <div className="Countdown-header">Countdown</div>
        <div className="Countdown-display">
          <Button clicked={() => this.adjustTimer("incHours")}>&#8679;</Button>
          <Button clicked={() => this.adjustTimer("incMinutes")}>
            &#8679;
          </Button>
          <Button clicked={() => this.adjustTimer("incSeconds")}>
            &#8679;
          </Button>

          <div className="Countdown-time">
            <input 
              ref={this.hoursInputRef} 
              className='inputTimeStyle' 
              onChange={(e)=>this.inputTimeChangeHandler(e, 'hours')}
              value={hours}/>
            <span ref={this.hoursRef} onClick={()=>this.showTimeInput('hours')}>{hours}</span>
            <span> : &nbsp;</span>
            <input 
              ref={this.minutesInputRef} 
              className='inputTimeStyle'
              onChange={(e)=>this.inputTimeChangeHandler(e, 'minutes')}
              value={minutes}/>
            <span ref={this.minutesRef} onClick={()=>this.showTimeInput('minutes')}>{minutes}
            </span>
            <span> : &nbsp;</span>
            <input 
              ref={this.secondsInputRef} 
              className='inputTimeStyle'
              onChange={(e)=>this.inputTimeChangeHandler(e, 'seconds')}
              value={seconds}/>
            <span ref={this.secondsRef} onClick={()=>this.showTimeInput('seconds')}>{seconds}</span>
          </div>

          <Button clicked={() => this.adjustTimer("decHours")}>&#8681;</Button>
          <Button clicked={() => this.adjustTimer("decMinutes")}>
            &#8681;
          </Button>
          <Button clicked={() => this.adjustTimer("decSeconds")}>
            &#8681;
          </Button>
        <div className="Countdown-label">
          <span className="Countdown-label_hours">Hours</span>
          <span className="Countdown-label_minutes">Minutes</span>
          <span className="Countdown-label_seconds">Seconds</span>
        </div>
        </div>

        {timerOn === false && (
          <Button className="Button-start" clicked={this.startTimer}>
            Start
          </Button>
        )}
        {timerOn === true && timerTime >= 1000 && (
          <Button className="Button-stop" clicked={this.stopTimer}>
            Stop
          </Button>
        )}

            <Button className="Button-reset" clicked={this.resetTimer}>
              Reset
            </Button>

      </div>      
    }

    return (
      <div>
        {countdown}
      </div>
    );
  }
}

  const mapStateToProps = state => {
    return {
      business: state.businessList.business,
    }
  }

  const mapDispatchToProps = dispatch => {
    return{
      saveTimerTime: (timerTime, id) => dispatch(actions.saveTimerTime(timerTime, id)),
      clearCurrentCountDownTime: (id) => dispatch(actions.clearCurrentCountDownTime(id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CountDown);
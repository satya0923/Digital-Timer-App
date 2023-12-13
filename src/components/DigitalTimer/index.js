// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSec: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickMinus = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onClickPlus = () => {
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  }

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSec} = this.state
    const isButtonsDisabled = timeElapsedInSec > 0

    return (
      <div>
        <p className="limit-label">Set Timer Limit</p>
        <div className="timer-limit-controller">
          <button
            type="button"
            className="limit-btn"
            onClick={this.onClickMinus}
            disabled={isButtonsDisabled}
          >
            -
          </button>
          <p className="limit-value">{timerLimitInMinutes}</p>
          <button
            type="button"
            className="limit-btn"
            onClick={this.onClickPlus}
            disabled={isButtonsDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onClickReset = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSec = () => {
    const {timerLimitInMinutes, timeElapsedInSec} = this.state
    const isTimerCompleted = timeElapsedInSec === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSec: prevState.timeElapsedInSec + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSec, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedInSec === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSec: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSec, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="controller-container">
        <button
          type="button"
          className="start-pause-btn"
          onClick={this.onStartOrPauseTimer}
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAltText}
            className="controller-icon"
          />
          <p className="start">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>

        <button
          type="button"
          className="start-pause-btn"
          onClick={this.onClickReset}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="controller-icon"
          />
          <p className="start">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSec} = this.state
    const totalRemainingSec = timerLimitInMinutes * 60 - timeElapsedInSec
    const minutes = Math.floor(totalRemainingSec / 60)
    const seconds = Math.floor(totalRemainingSec % 60)
    const stringifiedMin = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSec = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMin} : ${stringifiedSec}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="elapsed-image">
            <div className="elapsed-circle">
              <h1 className="timer">{this.getElapsedSecInTimeFormat()}</h1>
              <p className="time-status">{labelText}</p>
            </div>
          </div>
          <div className="controller">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

import React, { Component } from 'react';
import Timer from './Timer';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      numRounds: 0, // How many rounds we want
      currentRound: 0,
      isBreak: false,
      minutes: 10,
      seconds: 0,
    };
    this.secLoop = this.secLoop.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  secLoop(minutes, seconds) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.setState({ seconds, minutes });
        seconds--;
        if (seconds >= 0) return resolve(this.secLoop(minutes, seconds));
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
          return resolve(this.secLoop(minutes, seconds));
        } else {
          return resolve('resolved');
        }
      }, 1000);
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    for (let i = 0; i < this.state.numRounds * 2 - 1; i++) {
      if (i % 2 === 0) {
        this.setState(prevState => ({
          currentRound: prevState.currentRound + 1,
          isBreak: false,
        }));
      } else this.setState({ isBreak: true });
      const minutes = i % 2 === 0 ? 10 : 1;
      const seconds = 0;
      await this.secLoop(minutes, seconds);
    }
  }

  render() {
    return (
      <div>
        <Timer {...this.state} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="rounds">Number Of Rounds</label>
          <input
            name="numRounds"
            onChange={this.handleChange}
            type="number"
            value={this.state.numRounds}
            placeholder="Number of Rounds"
          />
          <button type="submit">Start</button>
        </form>
      </div>
    );
  }
}

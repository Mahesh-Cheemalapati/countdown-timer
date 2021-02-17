import React from 'react';

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
    }
  }

  componentDidMount() {
    // update every second
    this.interval = setInterval(() => {
      const date = this.calculateCountdown(this.props.date);
      date ? this.setState(date) : this.stop();
    }, 1000);
  }

  componentWillUnmount() {
    this.stop();
  }

  calculateCountdown(endDate) {
    let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

    const timeLeft = {
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // birthday is each year, so removing check for year
    // could have added hooks but for such a small application it is not really necessary
    // can use a table of data to show counter for various birthdays and send out an email to co-workers when someone's birthday is a day away
    // did not make much changes but changed around the styling and templating a bit

    // calculate time difference between now and expected date

    if (diff >= 86400) { // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) { // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = diff;

    if (diff < 0) {
      this.stop();
    }

    return timeLeft;
  }

  stop() {
    clearInterval(this.interval);
  }

  addLeadingZeros(value) {
    value = String(value);
    while (value.length < 2) {
      value = '0' + value;
    }
    return value;
  }

  render() {
    const countDown = this.state;
    if (this.timeLeft != 0) 
    return (
    <div class="wrapper">
      <div id="countdown">
        <div class="cd-box">
          <p class="numbers days">
          <strong>{this.addLeadingZeros(countDown.days)}</strong>
          </p>
          <p class="strings timeRefDays">
            {countDown.days === 1 ? 'Day' : 'Days'}
          </p>
        </div>
        <div class="cd-box">
          <p class="numbers hours">
            {this.addLeadingZeros(countDown.hours)}
          </p>
          <p class="strings timeRefHours">Hours</p>
        </div>
        <div class="cd-box">
          <p class="numbers minutes">
            {this.addLeadingZeros(countDown.min)}
          </p>
          <p class="strings timeRefMinutes">Minutes</p>
        </div>
        <div class="cd-box">
          <p class="numbers seconds">
            {this.addLeadingZeros(countDown.sec)}
          </p>
          <p class="strings timeRefSeconds">Seconds</p>
        </div>
      </div>
    </div>
    );
    return (
        <div>
          <span className="wrapper">
            <strong>{this.timeLeft === 0}</strong>
            <span>It's your Birthday - Happy Birthday!</span>
          </span>
        </div>
    );
  }
}

export default Countdown;

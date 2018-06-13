import React, { Component } from 'react';
import './Week.css';
import Day from '../Day/';

class Week extends Component {
  render() {
      const days = this.props.data.map((d,i) => <Day key={i} data={d}/>)
    return (
      <div className="Week">
        <h3>Week</h3>
        {days}
      </div>
    );
  }
}

export default Week;

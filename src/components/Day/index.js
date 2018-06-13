import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
  render() {
    return (
      <div className="Day">
        <h3>{this.props.data}</h3>
      </div>
    );
  }
}

export default Day;

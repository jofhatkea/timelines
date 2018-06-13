/* jshint esversion: 6 */
import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
      
    };
  }
  clearStorage(){
    localStorage.removeItem("timelines");
    window.location="";
  }
  render() {
    return (
      <section className="settings">
        <div className="inner">
          <button onClick={this.clearStorage.bind(this)}>Clear storage</button>
          <fieldset>
            <legend>Move Slots by</legend>
            <input type="radio" /> Day
            <input type="radio" /> Week
          </fieldset>
        </div>
      </section>
    );
  }
}

export default Settings;

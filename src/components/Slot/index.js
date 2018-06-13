/* jshint esversion: 6 */
import React, { Component } from 'react';
import './Slot.css';

class Slot extends Component {
  constructor(props){
    super(props);
    this.state={
      text: this.props.text.value,
      sid: this.props.text.id,
      showForm: false
    };
  }
  contentChanged(e){
    this.setState({
      text:e.target.value
    });
  }
  clicked(e){
    const newValue = !this.state.showForm;
    this.setState({
      showForm: !this.state.showForm
    });
    if(!newValue){
      //send upstream, TODO
      this.props.slotChanged(this.props.tid, this.state.sid, this.state.text);
    }
  }
  render() {
    return (
      <div className="Slot"onClick={this.clicked.bind(this)}>
        <p className="contents">{this.state.text}</p>
        {this.state.showForm ? <input type="text" onBlur={this.clicked.bind(this)} autoFocus defaultValue={this.state.text} onInput={this.contentChanged.bind(this)} />: ''}
      </div>
    );
  }
}

export default Slot;

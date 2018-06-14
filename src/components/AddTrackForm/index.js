import React, { Component } from 'react';
import './AddTrackForm.css';

class AddTrackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: '#000',
    };
  }
  fingerUp(el) {
    this.setState({
      name: el.target.value,
    });
  }
  colorPicked(el) {
    this.setState({
      color: el.target.value,
    });
  }
  submit(e) {
    e.preventDefault();
    const stateCopy = this.state;
    const ar = [];
    for (let i = 0; i < 12 * 5; i += 1) {
      ar.push({
        id: i,
        value: '',
      });
    }
    stateCopy.slots = ar;

    this.props.onTrackAdded(this.state);
  }
  render() {
    return (
      <div className="AddTrackForm">
        <h3>Add a new track</h3>
        <form onSubmit={el => this.submit(el)} >
          <label>
            Name:
            <input name="name" type="text" onInput={el => this.fingerUp(el)} />
          </label>
          <label>
            Color:
            <input name="color" type="color" onInput={el => this.colorPicked(el)} />
          </label>
          <input type="submit" value="Add Track" />
        </form>
      </div>
    );
  }
}

export default AddTrackForm;

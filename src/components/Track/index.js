import React, { Component } from 'react';
import './Track.css';
import Slot from '../Slot/';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

export default class Track extends Component {
  hexToRgb(hex) {
    //TODO external lib
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    const newOrder = arrayMove(this.props.data.slots, oldIndex, newIndex);
    this.props.slotsReordered(newOrder, this.props.tid);

    /*this.setState({
      slots: arrayMove(this.state.slots, oldIndex, newIndex),
    });*/
  };
  render() {
    const color = this.hexToRgb(this.props.data.color);
    const style = {
      backgroundColor: `rgba(${color.r},${color.g},${color.b},0.3)`
    };
    const SortableItem = SortableElement(({ value }) => {
      return (
        <Slot tid={this.props.tid} slotChanged={this.props.slotChanged.bind(this)} text={value} />
      );
    });
    const SortableList = SortableContainer(({ slots }) => {
      return (
        <div className="Track" style={style}>
          {slots.map((value, index) => (
            <SortableItem key={`item-${value.id}`} index={index} value={value} />
          ))}
        </div>
      );
    });

    return (
      <SortableList
        pressDelay={100}
        useWindowAsScrollContainer={true}
        axis="x"
        slots={this.props.data.slots}
        onSortEnd={this.onSortEnd}
      />
    );
  }
}

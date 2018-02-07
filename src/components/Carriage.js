import React, { Component } from 'react';
import { ItemTypes } from '../Constants';
import { DragSource } from 'react-dnd';

const CarriageSource = {
    beginDrag(props) {
      return {};
    }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class Carriage extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
       <div className="carriage sidebar__train-part" style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move'
      }}>
          <img src="https://openclipart.org/image/2400px/svg_to_png/281810/RailwayCarriageColour.png" />
      </div>
    );
  }
}

export default DragSource(ItemTypes.CARRIAGE, CarriageSource , collect)(Carriage);
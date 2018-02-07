import React, { Component } from 'react';
import { ItemTypes } from '../Constants';
import { DragSource } from 'react-dnd';

const LocomotiveSource = {
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

class Locomotive extends Component {
  render() {
    const { connectDragSource, isDragging } = this.props;
    return connectDragSource(
      <div className="locomotive sidebar__train-part" style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move'
        }}>
          <img src="http://www.clker.com/cliparts/q/W/L/L/0/s/train.svg" />
      </div>
    );
  }
}

export default DragSource(ItemTypes.LOCOMOTIVE, LocomotiveSource , collect)(Locomotive);
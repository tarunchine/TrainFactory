import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../Constants';


const Target = {
  drop(props, monitor) {
    console.log('droped on train', props);
    var type = monitor.getItemType();

    /******update state********/
    props.addPartsTotrain(props.index, type);

    return {};
   }
}
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
    }
}
class Train extends Component {
  handleTimeChange(index, type, event) {
    this.props.handleTimeChange(type, index, event.target.value);
  }

  /* create div structure based on array values */
  renderTrainBlock() {
    var blocks = []; 
    if(!!this.props.locomotive) {
       blocks.push(<span className="locomotive train-part" key="locomotive">
          <img src="http://www.clker.com/cliparts/q/W/L/L/0/s/train.svg" />
        </span>);
    } 
    for(var i=0;i<this.props.carriages; i++) {
      blocks.push(<span className="carriage train-part" key= {'carriage'+i}>
           <img src="https://openclipart.org/image/2400px/svg_to_png/281810/RailwayCarriageColour.png" />
      </span>);
    }
    return blocks;
  }
  render() {
    const { connectDropTarget} = this.props;
    return connectDropTarget(
      <div className="train">
         <p className="train__name"> {'Train '+ this.props.index } </p> 
        <div className="train__details">
          <div className="train__blocks">
            { this.renderTrainBlock() }
          </div>
          <div className="train__timing">
              <div> Arrival :  <input type="text" onChange={this.handleTimeChange.bind(this, this.props.index, 'arrival')}/> </div>
              <div> Departure :  <input type="text"  onChange={this.handleTimeChange.bind(this, this.props.index, 'departure')}/> </div>
          </div>
          </div>
      </div>
    );
  }
}

export default DropTarget([ItemTypes.LOCOMOTIVE, ItemTypes.CARRIAGE] , Target, collect)(Train);
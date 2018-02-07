import React, { Component } from 'react';
import Train from './Train';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from '../Constants';


const Target = {
  drop(props, monitor) {
    console.log('droped on train list', props);
    const hasDroppedOnChild = monitor.didDrop();

    //check if the parts are droped on child (indiviual train)
    if (hasDroppedOnChild) {
      return;
    }

    var type = monitor.getItemType();

    /******update state********/
    props.addNewTrain({
      locomotive: type === 'locomotive' ? true : false,
      carriages: type === 'carriage' ? 1 : 0
    });

    return {};
  }

}
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}
class TrainList extends Component {
  render() {
    const { connectDropTarget } = this.props;

    return connectDropTarget(
      this.renderHtml()
    );
  }
  renderHtml() {
    var trains;
    /* if no train is available then show the message to drag and drop , if trains are available  show all trains */
    if (this.props.trains.length === 0) {
      trains = <div className="train__list__message"> <p> Drag & Drop Parts to build train </p> </div>;
    } else {
      /* Loop through trains array and create a variable to use in render */
      trains = this.props.trains.map((train1, index) => (
        <Train
          key={index}
          index={index + 1}
          locomotive={train1.locomotive}
          carriages={train1.carriages}
          arrival={train1.arrival}
          departure={train1.departure}
          addPartsTotrain={this.props.addPartsTotrain}
          handleTimeChange={this.props.handleTimeChange}
        />
      ))
    }


    return (
      <div className="train__list">
        {trains}
      </div>
    );
  }
}
export default DropTarget([ItemTypes.LOCOMOTIVE, ItemTypes.CARRIAGE], Target, collect)(TrainList);
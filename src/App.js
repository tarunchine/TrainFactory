import React, { Component } from 'react';
import { DragDropContext  } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Locomotive from './components/Locomotive';
import Carriage from './components/Carriage';
import TrainList from './components/TrainList';
import './sass/app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trains: []
    }
  }

  /**
   * Add new Train to the list of available train
   * @param {Object} obj 
   */
  addNewTrain(obj) {
    obj.id = this.state.trains.length + 1;
    this.setState({
      trains: this.state.trains.concat(obj)
    })
  }

  /**
   * Handle arrival/departure time changes for any train
   * @param {String} type - specify the type of time (arrival time or departure time)
   * @param {Number} index - used to identify for which train in the list these changes belong to
   * @param {String} value - given actual/departure time
   */
  handleTimeChange(type, index, value) {
    console.log('handleTimeChange from app', type);

    /* validate if arrival/departure value is not correct , show error  */
    if(parseFloat(value) <0 || parseFloat(value)  > 12) {
      alert('Please provide corret time');
      return;
    }
    var trains = this.state.trains, 
        currentIndex, 
        newObj = trains.slice(0, trains.length);  //newObj is used so that we will not modify state directly

    for(var i = 0 ; i<trains.length ; i++) {
      if(trains[i].id === index) {
        currentIndex=  i;
        switch(type) {
          case 'arrival': 
              newObj[currentIndex].arrival = value;
            break;
          case 'departure':
              newObj[currentIndex].departure = value;
        }
        break;
      }
        
    }
    
    /* update state */
      this.setState({
        trains: newObj
      });
  }

  /**
   * Add new part to existing train
   * @param {Number} id - used to identify for which train in the list new part should be added
   * @param {String} type - type of part to add (locomotive / carriage)
   */
  addPartsTotrain(id, type) {
    console.log(type);
    var trains = this.state.trains, 
        currentIndex, 
        newObj = trains.slice(0, trains.length); //newObj is used so that we will not modify state directly

    for(var i = 0 ; i<trains.length ; i++) {
      if(trains[i].id === id) {
        currentIndex=  i;
        switch(type) {
          case 'locomotive': 
              newObj[currentIndex].locomotive = true;
            break;
          case 'carriage':
              newObj[currentIndex].carriages++;
        }
        break;
      }
    }
    // update state
    this.setState({
            trains: newObj
          });
    
  }

  /**
   * Calculate minimum number of tracks required on the platform
   * only completed trains (train with one locomotive , atleast one carriage and with arrival and departure time availble) will be consider for this calculation
   * 
   */
  calculateTracks() {
    var trains  =  this.state.trains,
        arrival = [],
        departure = [],
        completedtrains = [],
        totalTrains = trains.length,
        completedtrainsCount = 0;
        console.log(trains);
    if(totalTrains > 0) {
      for(var i=0; i< totalTrains; i++) {
        if(!!trains[i].arrival && !!trains[i].departure && trains[i].locomotive && trains[i].carriages>0) {
          completedtrains.push(trains[i]);
          arrival[i] = this.getTimeValue(trains[i].arrival);
          departure[i] = this.getTimeValue(trains[i].departure);
        }
        
      }
      arrival.sort();
      departure.sort();
      completedtrainsCount = completedtrains.length;
      var count = completedtrainsCount > 0 ? 1 : 0,  a1 = 1,d1 = 0, result = count;
      while(a1 < completedtrainsCount && d1< completedtrainsCount) {
        if(arrival[a1] <= departure[d1]) {
          count++;
          a1++;
          if(count > result) {
            result = count;
          }
        } else {
          count--;
          d1++;
        }
      }


      alert('Tocal completed Trains '+ completedtrainsCount +' , Tracks required '+ result );
    } else {
      alert('No tracks are required as no train are available');
    }
    

  }


  /**
   * Convert time from 12 hour to 24 hour clock
   * @param {String} time 
   */
  getTimeValue(time) {
    if(time.indexOf('am') !== -1) {
      return parseFloat(time);
    } else {
      return (parseFloat(time) === 12 ? 0: parseFloat(time))  + 12;
    }
  }
  render() {
    /*
      Pass following parameters to train TrainList
        1) trains: list of  available trains
        2) addNewTrain: function to add new trains 
        3) addPartsTotrain:  add new parts to existing train 
        4) handleTimeChange: function to hanndle arrival/departure time changes
    */
    return (
      <div className="container">
        <div className="sidebar">
          <Locomotive />
          <Carriage />
        </div>
        <div className="maincontent">
            <h2 className="maincontent__heading">Build Train Here</h2>
            <div className="maincontent__content">
                <TrainList trains={this.state.trains} addNewTrain={this.addNewTrain.bind(this)} addPartsTotrain={this.addPartsTotrain.bind(this)}   handleTimeChange= {this.handleTimeChange.bind(this)}/>
            </div>
            <div className="maincontent__calculatetrack">
                <button className="button button--primary" onClick={this.calculateTracks.bind(this)}> Calculate Track </button>
            </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
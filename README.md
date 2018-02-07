* I am using react boilerplate to setup inital react and webpack
    https://github.com/gaearon/react-hot-boilerplate
* I am using react dnd libary for drap and drop functionality
    https://react-dnd.github.io/react-dnd/
* To see the app
    git clone https://github.com/tarunchine/TrainFactory.git
    cd TrainFactory/
    npm install
    npm start

    then open http://localhost:3000/ in you browser


### Develop's Note
* I am using scss 
* I am using flex box model of css3
* Not much validation done on arrival and departure time (only checking that it should be negative or greater than 12)
    below cases are not handled due to time constraint
        Departure time should not be before the arrival time
        I have only consider lowercase 'am'/'pm'  (10am will work but not 10AM)
        
* I am not using redux
* I have not setup local images to work with webpack, i am using images for external path only
* To calculate number of required tracks , only completed trains are consider
     completed trains :  train with one locomotive, atleast one carriage , specified arrival and departure time






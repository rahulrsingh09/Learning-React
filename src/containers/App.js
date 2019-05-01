import React, { Component } from 'react';
import Styles from'./App.module.scss';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  state = {
    persons: [
      {id: 'wdfwefw', name: "Rahul", age : "12"},
      {id: 'wefwefwef', name: "Bunu", age : "16"}
    ],
    showPerson: false
  }


  togglePersonHandler = () => {
    const ifShow = this.state.showPerson;
    this.setState({showPerson : !ifShow});
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  nameChangedHandler = (event, personIndex) => {
    const persons = [...this.state.persons];
    persons[personIndex].name = event.target.value;
    this.setState({persons: persons});
  }

  render() {

    let persons = null;
    if (this.state.showPerson) {
      persons = (
        <div>
           <Persons persons = {this.state.persons}
                    delete = {this.deletePersonHandler}
                    changed = {this.nameChangedHandler} />
        </div>
      );
    }

    return (
      <div className={Styles.App}>
        <Cockpit showPerson = {this.state.showPerson} togglePerson = {this.togglePersonHandler}/>
        {persons}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Person from './Person/person';

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
          {this.state.persons.map((person,index) => {
            return <Person name={person.name}
                    age={person.age}
                    key = {person.id}
                    click = {() => this.deletePersonHandler(index)}
                    changed = {(event) => this.nameChangedHandler(event,index)}>
                    My Hobbies: Playing Fifa
           </Person>
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi I am a React Component</h1>
        <button onClick = {() => this.togglePersonHandler()}>Toggle Persons</button>               
        {persons}
      </div>
    );
  }
}

export default App;

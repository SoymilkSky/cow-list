import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: [],
      currentDisplay: null,
      clicked: false
    };
  }

  componentDidMount() {
    this.getAllCows();
  }

  getAllCows() {
    axios.get('api/cows')
      .then(cowlist => this.setState({cows: cowlist.data}))
      .catch(err => console.log(err));
  }

  addCow(event, cow) {
    event.preventDefault();
    axios.post('api/cows', cow)
      .then(() => console.log(`Successfully added a cow named ${cow.cowname}`))
      .then(() =>
        this.setState({ clicked: true, currentDisplay: cow }))
      .then(() => this.getAllCows())
      .catch(err => console.log(err));
  }

  updateCow(event, cow) {
    event.preventDefault();
    axios.patch('api/cows', { oldCow: this.state.currentDisplay, newCow: cow})
      .then(() => this.getAllCows())
      .then(() => this.setState({ currentDisplay: cow }))
      .catch(err => console.log(err));
  }

  removeCow(event) {
    event.preventDefault();
    axios.delete('api/cows', { data: this.state.currentDisplay })
      .then(() => this.getAllCows())
      .then(() => this.setState({ clicked: false, currentDisplay:null }))
      .catch(err => console.log(err));
  }

  onCowClick(event, cow) {
    event.preventDefault();
    this.setState({
      currentDisplay: cow,
      clicked: true
    })
  }

  render() {
    return (
      <div>
        <h1>a list of my favorite cows</h1>
        {this.state.clicked ?
          <div>
            <span><CurrentDisplayedCow cow={this.state.currentDisplay} /></span>
            <span><UpdateCow
              cow={this.state.currentDisplay}
              update={this.updateCow.bind(this)}/></span>
            <span><RemoveCow remove={this.removeCow.bind(this)}/></span>
          </div>
          : null}
        <br></br>
        <AddCow add={this.addCow.bind(this)}/>
        <CowList cows={this.state.cows} clickName={this.onCowClick.bind(this)}/>
      </div>
    );
  }
};

class AddCow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      text: null
    };
  }

  render() {
    return(
    <div>
      <form onSubmit={(event) => {
        this.props.add(event, { cowname:this.state.name, cowtext:this.state.text })}}>
        <input type="text" placeholder="enter a name"
          onChange={newName => this.setState({ name: newName.target.value })} /><br></br>
        <input type="text" placeholder="enter a description"
          onChange={newText => this.setState({ text: newText.target.value })} /><br></br>
        <input type="submit" value="create cow!" />
      </form>
    </div>
    )
  }
}

class UpdateCow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      text: null
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) =>
          this.props.update(event, { cowname: this.state.name, cowtext: this.state.text })}>
          <input type="text" placeholder="update name"
            onChange={ (newName) => this.setState({ name: newName.target.value}) }/> <br></br>
          <input type="text" placeholder="update description"
            onChange={ (newText) => this.setState({ text: newText.target.value}) }/> <br></br>
          <input type="submit" value="update cow!" />
        </form>
      </div>
    )
  }
}

function RemoveCow(props) {
  return(
    <div>
      <input type="submit" value="Delete this cow" onClick={props.remove}/>
    </div>
  )
}

function CowEntry(props) {
  return (
    <div>
      <li onClick={(event) => props.click(event, props.cow)}>
        <span>{props.cow.cowname}</span>
      </li>
    </div>
  )
}

function CowList(props) {
  return(
    <div>
      <ul>
        {props.cows.map((cow, index) =>
          <CowEntry cow={cow} key={index} click={props.clickName}/>)}
      </ul>
    </div>
  )
};

function CurrentDisplayedCow(props) {
  return (
    <div>
      <span>{props.cow.cowname}</span><br></br>
      <span>{props.cow.cowtext}</span>
    </div>
  )
}

export default App;
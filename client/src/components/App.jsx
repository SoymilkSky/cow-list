import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cows: [],
      cowFormName: null,
      cowFormText: null
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

  addACow(e) {
    e.preventDefault();
    axios.post('api/cows', { cowname: this.state.cowFormName, cowtext: this.state.cowFormText })
      .then(() => console.log(`Successfully added a cow named ${this.state.cowFormName}`))
      .then(() => this.getAllCows())
      .catch(err => console.log(err));
  }

  onNameChange(name) {
    this.setState({
      cowFormName: name
    });
  }

  onTextChange(text) {
    this.setState({
      cowFormText: text
    });
  }

  render() {
    return (
      <div>
        <h1>a list of my favorite cows</h1>
        <AddCow
          add={this.addACow.bind(this)}
          onName={this.onNameChange.bind(this)}
          onText={this.onTextChange.bind(this)}/>
        <CowList cows={this.state.cows}/>
      </div>
    );
  }
};

const AddCow = (props) => (
  <div>
    <form onSubmit={props.add}>
      <input type="text" placeholder="enter a name"
        onChange={name => props.onName(name.target.value)}/><br></br>
      <input type="text" placeholder="enter a description"
        onChange={text => props.onText(text.target.value)}/><br></br>
      <input type="submit" value="create cow!"/>
    </form>
  </div>
)

function CowList(props) {
  return(
    <div>
      <ul>
        {props.cows.map((cow, index) =>
          <CowEntry cow={cow} key={index}/>)}
      </ul>
    </div>
  )
};

function CowEntry(props) {
  return(
    <div>
      <li>
        <span>{props.cow.cowname}</span><br></br>
        <span>{props.cow.cowtext}</span>
      </li>
    </div>
  )
};

export default App;
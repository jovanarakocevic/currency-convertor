import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      result: null,
      fromCurr: "EUR",
      toCurr: "USD",
      amount: 1,
      currencies: [],
      convertor:{}
    };
  }
  
  componentDidMount(){
    fetch('https://jsonblob.com/api/jsonBlob/9eaa7518-54bf-11eb-a469-e58900c48d7b?fbclid=IwAR3JoOiWu_wzBaXgj5qzPveEPWhxwAoj49iTzjgb737jGFAk8CxwptOpaG4')
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        let currencies = ["EUR"];
        for (const key in response.convertor) {
          currencies.push(key);
        }
        this.setState({ currencies: currencies, convertor:response.convertor})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setValue = (e) => {
    let amount = e.target.value;
    this.setState({ amount })
  }

  selectHandler = (e) => {
    if (e.target.name === "from") {
      this.setState({ fromCurr: e.target.value })
    }
    if (e.target.name === "to") {
        this.setState({ toCurr: e.target.value })
    }
  }

  currenciesShow = (e) => {
    let currencies = this.state.currencies;
    // console.log(currencies);
    return currencies.map((cur) => {
      return <option key={cur}>{cur}</option>
    })
  }

  convertHandler = () => {
    let result;
    if (this.state.fromCurr === "EUR"){
      result = this.state.amount * this.state.convertor[this.state.toCurr];
    }
    else if (this.state.toCurr === "EUR"){
      result = this.state.amount / this.state.convertor[this.state.fromCurr];
    }
    else {
      let eura = this.state.amount / this.state.convertor[this.state.fromCurr];
      result = eura * this.state.convertor[this.state.toCurr];
    }
    result = `${this.state.amount} ${this.state.fromCurr}  =  ` + result.toFixed(5) + ` ${this.state.toCurr}`;
    this.setState({result})
  };

  render(){
    return (
      <div id="main-container" className="container">
        <div className="row mb-0">
          <div className="input-field col s12">
            <input type="number" min="0" value={this.state.amount} onChange={this.setValue}/>
            <label htmlFor="amount"></label>
          </div>
        </div>
        <div className="row flex-prop">
          <div className="input-field col s4">
            <div className="column">
            <div className="label-style">Iz valute</div>
              <select name="from" className="browser-default" value={this.state.fromCurr} onChange={this.selectHandler}>
                {this.currenciesShow()}
              </select>
            </div>
          </div>
          <div className="input-field col s4">
            <div className="column">
              <div className="label-style">U valutu</div>
              <select name="to" className="browser-default"  value={this.state.toCurr} onChange={this.selectHandler}>
                {this.currenciesShow()}
              </select>
            </div>
          </div>
          <div className="input-field col s4">
            <button className="right btn waves-effect waves-light" type="submit" name="action" onClick={this.convertHandler}>Kovenrtuj</button>
          </div>
        </div>
        <div id="result" className="center">
          {this.state.result}
        </div>
      </div>
    );
  };
}

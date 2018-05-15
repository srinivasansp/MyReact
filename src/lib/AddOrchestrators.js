import React, { Component } from "react";
import Popup from "reactjs-popup";
import RestAPI from "./RestLibraries";

const libraries = new RestAPI();

class AddOrchestrators extends Component {
  constructor(props) {
    super(props);
    this.state = {orch_name: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
     const target = event.target;
     const value = target.value;
     const name = target.name;
     this.setState({
       [name]: value
     });
  }

  handleSubmit(event) {
    event.preventDefault(); //this line of reload the page*/\
    this.addOrchestrators();
  }

  async addOrchestrators () {
    var response = await libraries.addOrchestrator(this.state.orch_name)
    .then (function (){
      window.location.reload()
    });
  }

  render() {
  return (
      <Popup open={true} position="top left">
        <div className="modal" >
            <form onSubmit={this.handleSubmit}>
              <label>
                  Orch Name:<input id="orch_name" name="orch_name" type="text" value = {this.state.orch_name} onChange={this.handleChange} />
              </label>
              <button className="button">Submit</button>
            </form>
          </div>
        </Popup>
    );
  }
}

export default AddOrchestrators;

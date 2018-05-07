import React, { Component } from "react";
import Popup from "reactjs-popup";
import RestAPI from "./RestLibraries";

const libraries = new RestAPI();

class AddProcessors extends Component {
  constructor(props) {
    super(props);
    this.state = {transform_name: '', transform_script: ''};
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
    this.addProcessors();
  }

  async addProcessors () {
    var response = await libraries.addProcessor(this.state.transform_name, this.state.transform_script)
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
                  Connector Name:<input id="transform_name" name="transform_name" type="text" value = {this.state.transform_name} onChange={this.handleChange} />
              </label>
              <label>
                Connector Description:<input id="connector_description" name="connector_description" type="text" value = {this.state.transform_script} onChange={this.handleChange} />
              </label>
              <button className="button">Submit</button>
            </form>
          </div>
        </Popup>
    );
  }
}

export default AddProcessors;

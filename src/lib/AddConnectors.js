import React, { Component } from "react";
import Popup from "reactjs-popup";
import RestAPI from "./RestLibraries";

const libraries = new RestAPI();

class AddConnectors extends Component {
  constructor(props) {
    super(props);
    this.state = {connector_name: '', connector_description: '', version: '', actual_param: ''};
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
    event.preventDefault(); //this line of reload the page*/
    if (this.state.type == 'connectors') {this.addConnectors()};
    if (this.state.type == 'processors') {this.addProcessors()};
  }

  async addConnectors () {
    var response = await libraries.addConnector(this.state.connector_name, this.state.connector_description, this.state.version, this.state.actual_param)
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
                  Connector Name:<input id="connector_name" name="connector_name" type="text" value = {this.state.connector_name} onChange={this.handleChange} />
              </label>
              <label>
                Connector Description:<input id="connector_description" name="connector_description" type="text" value = {this.state.connector_description} onChange={this.handleChange} />
              </label>
              <label>
                Version:<input id="version" name="version" type="text" value = {this.state.version} onChange={this.handleChange} />
              </label>
              <label>
                Actual Params:<input id="actual_param" name="actual_param" type="text" value = {this.state.actual_param} onChange={this.handleChange} />
              </label>
              <button className="button">Submit</button>
            </form>
          </div>
        </Popup>
    );
  }
}

export default AddConnectors;

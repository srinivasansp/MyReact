import React, { Component } from "react";
import Popup from "reactjs-popup";
import RestAPI from "./RestLibraries";

const libraries = new RestAPI();

class EditConnectors extends Component {
  constructor(props) {
    super(props);
    this.state = ({data : this.props.updateItems});
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
      let inputName = event.target.name;
      let inputValue = event.target.value;
      let dataCopy = Object.assign({}, this.state);
      dataCopy.data[inputName] = inputValue;
      this.setState(dataCopy);
  }


  async handleSubmit(event) {
      event.preventDefault(); //this line will reload the page*/
      if (this.state.data.id == "" ? await libraries.editConnector(this.state.data).then (function () {window.location.reload()}) :
          await libraries.addConnector(this.state.data).then (function () {window.location.reload()}));
  }

  render() {
  return (
      <Popup open={true} position="top left">
        <div className="modal" >
            <form onSubmit={this.handleSubmit}>
              <label>
                  Connector Name:<input id="connector_name" name="connector_name" type="text" value = {this.state.data.connector_name} onChange={this.handleChange} />
              </label>
              <label>
                Connector Description:<input id="connector_description" name="connector_description" type="text" value = {this.state.data.connector_description} onChange={this.handleChange} />
              </label>
              <label>
                Version:<input id="version" name="version" type="text" value = {this.state.data.version} onChange={this.handleChange} />
              </label>
              <label>
                Actual Params:<input id="actual_param" name="actual_param" type="text" value = {this.state.data.actual_param} onChange={this.handleChange} />
              </label>
              <button className="button">Submit</button>
            </form>
        </div>
      </Popup>
    );
  }
}

export default EditConnectors;

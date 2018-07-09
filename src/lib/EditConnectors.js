import React, { Component } from "react";
import Popup from "reactjs-popup";
import RestAPI from "./RestLibraries";

const libraries = new RestAPI();

class EditConnectors extends Component {
  constructor(props) {
    super(props);
    this.state = ({data : this.props.updateItems, connector_id: this.props.id});
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
      if (this.state.connector_id != undefined ? await libraries.editConnector(this.state.data, this.state.connector_id).then (function () {window.location.reload()}) :
          await libraries.addConnector(this.state.data).then (function () {window.location.reload()}));
  }

  render() {
  return (
      <Popup open={true} position="top left">
        <div className="form-group" >
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>
                      Name:<input id="connector_name" name="connector_name" type="text" value = {this.state.data.connector_name} onChange={this.handleChange} />
                  </label>
                  <label>
                    Description:<input id="connector_description" name="connector_description" type="text" value = {this.state.data.connector_description} onChange={this.handleChange} />
                  </label>
                  <label>
                    Version:<input id="version" name="version" type="text" value = {this.state.data.version} onChange={this.handleChange} />
                  </label>
                  <label>
                    Actual Params:<input id="actual_param" name="actual_param" type="text" value = {this.state.data.actual_param} onChange={this.handleChange} />
                  </label>
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
            </form>
        </div>
      </Popup>
    );
  }
}

export default EditConnectors;

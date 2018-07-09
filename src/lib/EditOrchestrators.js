import React, { Component } from "react";
import Popup from "reactjs-popup";
import RestAPI from "./RestLibraries";

const libraries = new RestAPI();

class EditOrchestrators extends Component {
  constructor(props) {
    super(props);
    this.state = ({data : this.props.updateItems, orchestrator_id: this.props.id});
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
  event.preventDefault(); //this line of reload the page*/
      if (this.state.orchestrator_id != undefined ? await libraries.editOrchestrator(this.state.data, this.state.orchestrator_id).then (function () {window.location.reload()}) :
            await libraries.addOrchestrator(this.state.data).then (function () {window.location.reload()}));
  }

  render() {
      return (
          <Popup open={true} position="top left">
              <div className="form-group" >
                  <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                          <label>
                              Name:<input id="name" name="name" type="text" value = {this.state.data.name} onChange={this.handleChange} />
                          </label>
                      </div>
                      <button type="submit" className="btn btn-success">Submit</button>
                  </form>
              </div>
          </Popup>
      );
  }
}

export default EditOrchestrators;

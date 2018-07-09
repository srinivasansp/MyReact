import React, { Component } from "react";
import Popup from "reactjs-popup";
import RestAPI from "./RestLibraries";

const libraries = new RestAPI();

class EditProcessors extends Component {
  constructor(props) {
    super(props);
      this.state = ({data : this.props.updateItems, processor_id: this.props.id});
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
    if (this.state.processor_id != undefined ? await libraries.editProcessor(this.state.data, this.state.processor_id).then (function () {window.location.reload()}) :
        await libraries.addProcessor(this.state.data).then (function () {window.location.reload()}));
   }

  render() {
      return (
          <Popup open={true} position="top left">
              <div className="form-group" >
                  <form onSubmit={this.handleSubmit}>
                      <div className="form-group">
                          <label>
                              Name:<input id="transform_name" name="transform_name" type="text" value = {this.state.data.transform_name} onChange={this.handleChange} />
                          </label>
                          <label>
                              Script:<input id="transform_script" name="transform_script" type="text" value = {this.state.data.transform_script} onChange={this.handleChange} />
                          </label>
                      </div>
                      <button type="submit" className="btn btn-success">Submit</button>
                  </form>
              </div>
          </Popup>
      );
  }
}

export default EditProcessors;

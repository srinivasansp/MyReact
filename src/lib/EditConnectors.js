import React, { Component } from "react";
import Popup from "reactjs-popup";
import RestAPI from "./RestLibraries";

const libraries = new RestAPI();

class EditConnectors extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', connector_name: '', connector_description: '', version:null, actual_param:null};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({id: this.props.id});
    this.setState({connector_name: this.props.name});
    this.setState({connector_description: this.props.description});
    this.setState({version: this.props.version});
    this.setState({actual_param: this.props.params});
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
      console.log("tag:", this.state.tag);
      if (this.state.id == "" ? this.editConnectors() : this.addConnectors());
  }

  async editConnectors () {
    var response = await libraries.editConnector(this.state.id, this.state.connector_name.toString(), this.state.connector_description.toString(), parseInt(this.state.version), this.state.actual_param)
    .then (function (){
      window.location.reload()
    });
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

export default EditConnectors;

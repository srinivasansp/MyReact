import React, { Component } from "react";
import Popup from "reactjs-popup";
import RestAPI from "./RestLibraries";

const libraries = new RestAPI();

class UpdateProcessors extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', connector_name: '', connector_description: '', version: '', actual_param: ''};
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
    this.editConnectors();
  }

  async editConnectors () {
    var response = await libraries.editProcessors(this.state.id, this.state.transform_name, this.state.transform_script)
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
                Connector Description:<input id="transform_script" name="transform_script" type="text" value = {this.state.transform_script} onChange={this.handleChange} />
              </label>
              <button className="button">Update</button>
            </form>
        </div>
      </Popup>
    );
  }
}

export default UpdateProcessors;

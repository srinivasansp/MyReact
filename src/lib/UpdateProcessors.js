import React, { Component } from "react";
import Popup from "reactjs-popup";
import RestAPI from "./RestLibraries";

const libraries = new RestAPI();

class UpdateProcessors extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', transform_name: '', transform_script: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({id: this.props.id});
    this.setState({transform_name: this.props.name});
    this.setState({transform_script: this.props.script});
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
                  Transform Name:<input id="transform_name" name="transform_name" type="text" value = {this.state.transform_name} onChange={this.handleChange} />
              </label>
              <label>
                Transform Script:<input id="transform_script" name="transform_script" type="text" value = {this.state.transform_script} onChange={this.handleChange} />
              </label>
              <button className="button">Update</button>
            </form>
        </div>
      </Popup>
    );
  }
}

export default UpdateProcessors;

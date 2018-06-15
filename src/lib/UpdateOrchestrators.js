import React, { Component } from "react";
import Popup from "reactjs-popup";
import RestAPI from "./RestLibraries";

const libraries = new RestAPI();

class UpdateOrchestrators extends Component {
  constructor(props) {
    super(props);
    this.state = {id: '', orch_name: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.setState({id: this.props.id});
    this.setState({orch_name: this.props.name});
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
    this.editOrchestrators();
  }

  async editOrchestrators () {
    var response = await libraries.editOrchestrators(this.state.id, this.state.orch_name.toString())
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
              <button className="button">Update</button>
            </form>
        </div>
      </Popup>
    );
  }
}

export default UpdateOrchestrators;

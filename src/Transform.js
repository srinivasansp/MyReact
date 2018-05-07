import React, { Component } from "react";
import RestAPI from "./lib/RestLibraries";

const libraries = new RestAPI();

export default class Transform extends Component {
  constructor(props) {
    super(props);
    this.assureVersion = '';
    this.manageVersion = '';
    this.state = { hasMounted: false};
  }

  async componentWillMount(){
    var assureVersionInfo = await libraries.getBIMAssureVersion();
    this.assureVersion = assureVersionInfo.data
    var manageVersionInfo = await libraries.getBIMManageVersion();
    this.manageVersion = manageVersionInfo.data
    this.setState({ hasMounted: true })
  }

  render() {
    return (
      <div>
        <p>Assure Version:{JSON.stringify(this.assureVersion)}</p>
        <p>Manage Version:{JSON.stringify(this.manageVersion)}</p>
      </div>
    )
  }
}

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css'
import RestAPI from "./lib/RestLibraries";
import FormSubmit from "./lib/FormSubmit";
import FormAdd from "./lib/FormAdd";

const libraries = new RestAPI();

class Connectors extends Component {
  constructor(props) {
      super(props);
      this.state = {
        hasMounted: false,
          columnDefs: [
              {headerName: "ID", field: "id", checkboxSelection: true},
              {headerName: "Connector Name", field: "connector_name"},
              {headerName: "Connector description", field: "connector_description"},
              {headerName: "Version", field: "version"},
              {headerName: "Actual Params", field: "actual_param"}

          ],
          rowData: []
      }
  }

  async componentWillMount(){
      var response = await libraries.getConnectors();
      this.state.rowData = response.data;
      this.setState({ hasMounted: true })
    }

  getSelectedRow = e => {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      this.connectorId = selectedData.map(node => node.id)
      this.updatedConnectorName = selectedData.map(node => node.connector_name)
      this.updatedConnectorDescription = selectedData.map(node => node.connector_description)
      this.updatedVersion = selectedData.map(node => node.version)
      this.updatedActualParams = selectedData.map(node => node.actual_param)
      ReactDOM.render(<FormSubmit id = {this.connectorId} name = {this.updatedConnectorName} description = {this.updatedConnectorDescription}
        version = {this.updatedVersion} params = {this.updatedActualParams} />, document.getElementById("submit_form"))
  }

  addConnector () {
      ReactDOM.render(<FormAdd />, document.getElementById("submit_add"))
  }

  deleteConnector = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    this.connectorId = selectedData.map(node => node.id)
    var response = libraries.deleteConnector(this.connectorId).then (function (){
      window.location.reload()
    });
  }


  render() {
    return (
          <div className="ag-theme-balham" style= {{height: '900px',width: '1000px' }} >
              <button onClick={this.getSelectedRow}>Edit Connector</button>
              <button onClick={this.addConnector}>Add Connector</button>
              <button onClick={this.deleteConnector}>Delete Connector</button>
              <AgGridReact
                  onGridReady={ params => this.gridApi = params.api }
                  enableSorting={true}
                  enableFilter={true}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}>
              </AgGridReact>
          </div>
        );
  }
};


export default Connectors;

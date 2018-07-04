import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css'
import RestAPI from "./lib/RestLibraries";
import EditConnectors from "./lib/EditConnectors";

const libraries = new RestAPI();

var data = {};

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

    editConnector = e => {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      this.connectorId = selectedData.map(node => node.id)
      this.updatedConnectorName = selectedData.map(node => node.connector_name)
      this.updatedConnectorDescription = selectedData.map(node => node.connector_description)
      this.updatedVersion = selectedData.map(node => node.version)
      this.updatedActualParams = selectedData.map(node => node.actual_param)
      data = {
          id: this.connectorId,
          connector_name: this.updatedConnectorName,
          connector_description: this.updatedConnectorDescription,
          version: this.updatedVersion,
          actual_param: this.updatedActualParams

      };
      ReactDOM.render(<EditConnectors updateItems = {data} />, document.getElementById("formSubmit"))
  }

  addConnector () {
      ReactDOM.render(<EditConnectors updateItems = {data}/>, document.getElementById("formSubmit"))
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
              <button className="button" onClick={this.editConnector}>Edit</button>
              <button className="button" onClick={this.addConnector}>Add</button>
              <button className="button" onClick={this.deleteConnector}>Delete</button>
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

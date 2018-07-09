import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-blue.css'
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
              {headerName: "ID", field: "id", checkboxSelection: true,  width: 350},
              {headerName: "Connector Name", field: "connector_name"},
              {headerName: "Connector description", field: "connector_description"},
              {headerName: "Version", field: "version"},
              {headerName: "Actual Params", field: "actual_param", width: 1000}

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
        if (this.gridApi.getSelectedRows().length > 0) {
            const selectedNodes = this.gridApi.getSelectedNodes()
            const selectedData = selectedNodes.map(node => node.data)
            this.connectorId = selectedData.map(node => node.id)
            this.updatedConnectorName = selectedData.map(node => node.connector_name)
            this.updatedConnectorDescription = selectedData.map(node => node.connector_description)
            this.updatedVersion = selectedData.map(node => node.version)
            this.updatedActualParams = selectedData.map(node => node.actual_param)
            data = {
                connector_name: this.updatedConnectorName,
                connector_description: this.updatedConnectorDescription,
                version: this.updatedVersion,
                actual_param: this.updatedActualParams

            };
            ReactDOM.render(<EditConnectors updateItems={data}
                                            id={this.connectorId}/>, document.getElementById("formSubmit"))
        }
        else {
            alert("Please select a row to edit values");
        }
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
          <div className="ag-theme-blue" style= {{height: '800px',width: '1850px' }} >
              <button type="button" className="btn btn-primary" onClick={this.editConnector}>Edit</button>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <button type="button" className="btn btn-primary" onClick={this.addConnector}>Add</button>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <button type="button" className="btn btn-primary" onClick={this.deleteConnector}>Delete</button><br />
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

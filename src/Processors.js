import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css'
import RestAPI from "./lib/RestLibraries";
import AddProcessors from "./lib/AddProcessors";
import UpdateProcessors from "./lib/UpdateProcessors";

const libraries = new RestAPI();

class Processors extends Component {
  constructor(props) {
      super(props);
      this.state = {
        hasMounted: false,
          columnDefs: [
              {headerName: "ID", field: "id", checkboxSelection: true},
              {headerName: "Transform Name", field: "transform_name"},
              {headerName: "Transform Script", field: "transform_script"}
          ],
          rowData: []
      }
  }

  async componentWillMount(){
      var response = await libraries.getProcessors();
      this.state.rowData = response.data;
      this.setState({ hasMounted: true })
    }

  getSelectedRow = e => {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      this.processorId = selectedData.map(node => node.id)
      this.updatedTransformName = selectedData.map(node => node.transform_name)
      this.updatedTransformScript = selectedData.map(node => node.transform_script)
      ReactDOM.render(<UpdateProcessors id = {this.processorId} name = {this.updatedTransformName} script = {this.updatedTransformScript} />, document.getElementById("submit_form"))
  }

  addProcessor () {
      ReactDOM.render(<AddProcessors />, document.getElementById("submit_add"))
  }

  deleteProcessor = e => {
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
              <button className="button" onClick={this.getSelectedRow}>Edit</button>
              <button className="button" onClick={this.addProcessor}>Add</button>
              <button className="button" onClick={this.deleteProcessor}>Delete</button>
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


export default Processors;

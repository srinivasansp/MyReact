import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css'
import RestAPI from "./lib/RestLibraries";
import AddOrchestrators from "./lib/AddOrchestrators";
import UpdateOrchestrators from "./lib/UpdateOrchestrators";

const libraries = new RestAPI();

class Orchestrator extends Component {
  constructor(props) {
      super(props);
      this.state = {
        hasMounted: false,
          columnDefs: [
              {headerName: "ID", field: "id", checkboxSelection: true},
              {headerName: "Orchestrator Name", field: "name"}
          ],
          rowData: []
      }
  }

  async componentWillMount(){
      var response = await libraries.getOrchestrators();
      this.state.rowData = response.data;
      this.setState({ hasMounted: true })
    }

  getSelectedRow = e => {
      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map(node => node.data)
      this.orchestratorId = selectedData.map(node => node.id)
      this.updatedOrchestratorName = selectedData.map(node => node.name)
      ReactDOM.render(<UpdateOrchestrators id = {this.orchestratorId} name = {this.updatedOrchestratorName} />, document.getElementById("submit_form"))
  }

  addOrchestrator () {
      ReactDOM.render(<AddOrchestrators />, document.getElementById("submit_add"))
  }

  deleteOrchestrator = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    this.orchestratorId = selectedData.map(node => node.id)
    var response = libraries.deleteOrchestrator(this.orchestratorId).then (function (){
      window.location.reload()
    });
  }


  render() {
    return (
          <div className="ag-theme-balham" style= {{height: '900px',width: '1000px' }} >
              <button className="button" onClick={this.getSelectedRow}>Edit</button>
              <button className="button" onClick={this.addOrchestrator}>Add</button>
              <button className="button" onClick={this.deleteOrchestrator}>Delete</button>
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


export default Orchestrator;

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-blue.css'
import RestAPI from "./lib/RestLibraries";
import EditProcessors from "./lib/EditProcessors";

const libraries = new RestAPI();

var data = {};

class Processors extends Component {
  constructor(props) {
      super(props);
      this.state = {
        hasMounted: false,
          columnDefs: [
              {headerName: "ID", field: "id", checkboxSelection: true, width: 350},
              {headerName: "Transform Name", field: "transform_name", width: 350},
              {headerName: "Transform Script", field: "transform_script", width: 350}
          ],
          rowData: []
      }
  }

  async componentWillMount(){
      var response = await libraries.getProcessors();
      this.state.rowData = response.data;
      this.setState({ hasMounted: true })
    }

  editProcessor = e => {
      if (this.gridApi.getSelectedRows().length > 0) {
          const selectedNodes = this.gridApi.getSelectedNodes()
          const selectedData = selectedNodes.map(node => node.data)
          this.processorId = selectedData.map(node => node.id)
          this.updatedTransformName = selectedData.map(node => node.transform_name)
          this.updatedTransformScript = selectedData.map(node => node.transform_script)
          data = {
              transform_name: this.updatedTransformName,
              transform_script: this.updatedTransformScript,

          };
          ReactDOM.render(<EditProcessors id={this.processorId} updateItems={data}/>, document.getElementById("formSubmit"))
      }
      else {
          alert("Please select a row to edit values");
      }
  }

  addProcessor () {
      ReactDOM.render(<EditProcessors updateItems={data}/>, document.getElementById("formSubmit"))
  }

  deleteProcessor = e => {
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    this.processorId = selectedData.map(node => node.id)
    var response = libraries.deleteProcessor(this.processorId).then (function (){
      window.location.reload()
    });
  }


  render() {
      return (
          <div className="ag-theme-blue" style={{height: '600px', width: '900px'}}>
              <button type="button" className="btn btn-primary" onClick={this.editProcessor}>Edit</button>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <button type="button" className="btn btn-primary" onClick={this.addProcessor}>Add</button>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <button type="button" className="btn btn-primary" onClick={this.deleteProcessor}>Delete</button>
              <br/>
              <AgGridReact
                  onGridReady={params => this.gridApi = params.api}
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

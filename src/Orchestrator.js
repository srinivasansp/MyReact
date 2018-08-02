import React, { Component } from "react";
import ReactDOM from "react-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-blue.css'
import RestAPI from "./lib/RestLibraries";
import EditOrchestrators from "./lib/EditOrchestrators";

const libraries = new RestAPI();

var data = {};

class Orchestrator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasMounted: false,
            columnDefs: [
                {headerName: "ID", field: "id", checkboxSelection: true, width: 350, cellRenderer: (params) => {
                        var link = document.createElement('a');
                        link.href = "https://google.com";
                        link.innerText = params.value;
                        return link;
                        }
                    },
                {headerName: "Orchestrator Name", field: "name", width: 500}
            ],
            rowData: []
        }
    }

    async componentWillMount() {
        var response = await libraries.getOrchestrators();
        this.state.rowData = response.data;
        this.setState({hasMounted: true})
    }

    editOrchestrator = e => {
        if (this.gridApi.getSelectedRows().length > 0) {
            const selectedNodes = this.gridApi.getSelectedNodes()
            const selectedData = selectedNodes.map(node => node.data)
            this.orchestratorId = selectedData.map(node => node.id)
            this.updatedOrchestratorName = selectedData.map(node => node.name)
            data = {
                name: this.updatedOrchestratorName
            };
            ReactDOM.render(<EditOrchestrators id={this.orchestratorId}
                                               updateItems={data}/>, document.getElementById("formSubmit"))
        }
        else {
            alert("Please select a row to edit values");
        }
    }

    addOrchestrator() {
        ReactDOM.render(<EditOrchestrators updateItems={data}/>, document.getElementById("formSubmit"))
    }

    deleteOrchestrator = e => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map(node => node.data)
        this.orchestratorId = selectedData.map(node => node.id)
        var response = libraries.deleteOrchestrator(this.orchestratorId).then(function () {
            window.location.reload()
        });
    }


    render() {
        return (
            <div className="ag-theme-blue" style={{height: '600px', width: '600px'}}>
                <button type="button" className="btn btn-primary" onClick={this.editOrchestrator}>Edit</button>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button type="button" className="btn btn-primary" onClick={this.addOrchestrator}>Add</button>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button type="button" className="btn btn-primary" onClick={this.deleteOrchestrator}>Delete</button>
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


export default Orchestrator;

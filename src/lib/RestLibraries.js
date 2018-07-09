import axios from 'axios';
import config from 'react-global-configuration';
import configuration from './config';

config.set(configuration);

const MANAGEURL = config.get('manageURL');
const PASSPORTURL = config.get('passportURL');
const CONNECTOR = '/v1/connectors';
const PROCESSOR = '/v1/processors'
const ORCHESTRATOR = '/v1/orchestrator/definition'


export default class RestLibraries {

  getBIMAssureVersion (){
    return axios.get(PASSPORTURL + '/information/version')
  }

  getBIMManageVersion (){
    return axios.get(MANAGEURL + '/information/version')
  }

  getConnectors (){
    return axios.get(MANAGEURL + CONNECTOR)
  }

  editConnector (data, connector_id){
    return axios.put(MANAGEURL + CONNECTOR + '/' + connector_id, data)
  }

  addConnector (data){
    return axios.post(MANAGEURL + CONNECTOR, data)
  }

  deleteConnector (id){
    return axios.delete(MANAGEURL + CONNECTOR + '/' + id)
  }

  getOrchestrators (){
      return axios.get(MANAGEURL + '/v1/orchestrator')
  }

  editOrchestrator (data, orchestrator_id){
      return axios.put(MANAGEURL + ORCHESTRATOR + '/' + orchestrator_id, data)
  }

  addOrchestrator (data){
      return axios.post(MANAGEURL + ORCHESTRATOR, data)
  }

  deleteOrchestrator (id){
      return axios.delete(MANAGEURL + ORCHESTRATOR + '/' + id)
  }

  getProcessors (){
    return axios.get(MANAGEURL + PROCESSOR)
  }

  editProcessor (data, processor_id){
    return axios.put(MANAGEURL + PROCESSOR + '/' + processor_id, data)
  }

  addProcessor (data){
    return axios.post(MANAGEURL + PROCESSOR, data)
  }

    deleteProcessor (id){
        return axios.delete(MANAGEURL + PROCESSOR + '/' + id)
    }


}

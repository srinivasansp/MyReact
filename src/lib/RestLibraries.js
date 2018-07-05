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

  editConnector (data){
    return axios.put(MANAGEURL + CONNECTOR + '/' + data.id, data)
  }

  addConnector (data){
    return axios.post(MANAGEURL + CONNECTOR, data)
  }

  deleteConnector (id){
    return axios.delete(MANAGEURL + CONNECTOR + '/' + id)
  }

  getProcessors (){
    return axios.get(MANAGEURL + PROCESSOR)
  }

  editProcessors (id, name, script){
    return axios.put(MANAGEURL + PROCESSOR + '/' + id, {
      transform_name: name,
      transform_script: script
    })
  }

  addProcessor (name, script){
    return axios.post(MANAGEURL + PROCESSOR, {
      transform_name: name,
      transform_script: script
    })
  }

  getOrchestrators (){
    return axios.get(MANAGEURL + '/v1/orchestrator')
  }

  editOrchestrators (id, name){
    return axios.put(MANAGEURL + ORCHESTRATOR + '/' + id, {
      name: name
    })
  }

  addOrchestrator (name){
    return axios.post(MANAGEURL + ORCHESTRATOR, {
      name: name
    })
  }

}

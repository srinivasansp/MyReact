import axios from 'axios';
import config from 'react-global-configuration';
import configuration from './config';

config.set(configuration);

const MANAGEURL = config.get('manageURL');
const PASSPORTURL = config.get('passportURL');
const CONNECTOR = '/v1/connectors';


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

  editConnector (id, name, description, version, params){
    return axios.put(MANAGEURL + CONNECTOR + '/id=' + id, {
      connector_name: name,
      connector_description: description,
      version: version,
      actual_param: params
    })
  }

  addConnector (name, description, version, params){
    return axios.post(MANAGEURL + CONNECTOR, {
      connector_name: name,
      connector_description: description,
      version: version,
      actual_param: params
    })
  }

  deleteConnector (id){
    return axios.delete(MANAGEURL + CONNECTOR + '/id=' + id)
  }

}

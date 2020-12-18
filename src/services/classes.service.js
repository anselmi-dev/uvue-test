import { authHeader } from '@/helpers/auth-header';
const API_URL = process.env.VUE_APP_API + '/classes'
import axios from 'axios';

class ClassesService {

  reserveClass (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + '/registerReservation',
        method: 'POST',
        data,
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  classPending (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + `/getClassPending/${data.role}?${this.buildParams(data)}`,
        method: 'GET',
        data,
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data.result)
      })
      .catch(err => {
        let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
        try {
          responseError = err.response.data.err
        } catch (e) {}
        reject(responseError)
      })
    })
  }

  classConfirmed (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + `/getClassConfirmed/${data.role}?${this.buildParams(data)}`,
        method: 'GET',
        data,
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data.result)
      })
      .catch(err => {
        let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
        try {
          responseError = err.response.data.err
        } catch (e) {}
        reject(responseError)
      })
    })
  }

  classRejected (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + `/getClassRejected/${data.role}?${this.buildParams(data)}`,
        method: 'GET',
        data,
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data.result)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  classCompleted (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + `/getClassCompleted/${data.role}?${this.buildParams(data)}`,
        method: 'GET',
        data,
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data.result)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  classWithError (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + `/getClassWithError?${this.buildParams(data)}`,
        method: 'GET',
        data,
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data.result)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  getClassReserved (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  `${API_URL}/getClassReserved/${data.id}?${this.buildParams(data)}`,
        method: 'GET',
        data,
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  switchClassState (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + `/switchClassState`,
        method: 'PUT',
        data,
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data.result)
      })
      .catch(err => {
        let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
        try {
          responseError = err.response.data
        } catch (e) {}
        reject(responseError)
      })
    })
  }

  getUserClass (data = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url:  `${API_URL}/getUserClasses?${this.buildParams(data)}`,
        method: 'GET',
        data,
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  getClassDetails (id) {
    return new Promise((resolve, reject) => {
      axios({
        url:  `${API_URL}/getClassDetails/${id}`,
        method: 'GET',
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
  
  updateReservation (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  `${API_URL}/updateReservation/${data._id}`,
        method: 'POST',
        data,
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  buildParams (data) {
    let params = new URLSearchParams();

    Object.entries(data).forEach(entry => {
      const [key, value] = entry;
      if(key === 'lang') {
        Object.values(data[key])[0].forEach(element => {
          params.append(key, element);
        });
      } else {
        params.append(key, value);
      }
    });

    return params;
  };

  joinClassroom(id) {
    return new Promise((resolve, reject) => {
      axios({
        url:  `${API_URL}/joinClassroom/${id}`,
        method: 'GET',
        headers: authHeader()
      }).then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  subscribeToClass (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  `${API_URL}/subscribeToClass`,
        data,
        method: 'POST',
        data,
        headers: authHeader()
      }).then(resp => {
        resolve(resp)
      })
      .catch(err => {
        let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
        try {
          responseError = err.response.data
        } catch (e) {}
        reject(responseError)
      })
    })   
  }
}

export default new ClassesService();

import axios from 'axios';
const API_URL = process.env.VUE_APP_API
import { authHeader } from '@/helpers/auth-header';

class RecommendationService {

  /**
   * Obtiene las recomendaciones del usuario.
   * @param  {Object} data
   * @return {Promise}
   */
    getUser (slug) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + '/users/' + slug,
          method: 'GET',
          headers: authHeader()
        }).then(resp => {
          resolve(resp.data.user)
        })
        .catch(err => {
            reject(err)
        })
      })
    }

    /**
     * POINT PARA LA CREACION DE RECOMENDACIONES
     *
     * @return  {Promise}
     */
    createCommendation (data) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + '/review/createCommendation',
          data,
          method: 'POST',
          headers: authHeader()
        }).then(resp => {
          resolve(resp.data.user)
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
    
    askForCommendation (emails) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + '/review/askForCommendation',
          data: emails,
          method: 'POST',
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

    // router.route("/createCommendation"
    // router.route("/askForCommendation"

    getMoreCommends (data) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + `/review/getMoreCommends?${this.buildParams(data)}`,
          method: 'GET',
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

    getMoreReviews (data) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + `/review/getMoreReviews?${this.buildParams(data)}`,
          method: 'GET',
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

    /**
     * Obtiene la recomendacion mediente el id
     *
     * @param   {String}  id  _ID de la recomendacion
     *
     * @return  {Promise}
     */
    getCommend (id) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + `/review/getCommend/${id}`,
          method: 'GET',
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

    /**
     * Obtiene todas las recomendaciones, tambien las pendinetes.
     *
     * @return  {Promise}
     */
    getAllCommends (data = {}) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + `/review/getAllCommends?${this.buildParams(data)}`,
          method: 'GET',
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
    
    /**
     * Aceptar la recomendación
     *
     * @param   {Object}  data
     * @return  {Promise}
     */
    aproveCommends (data) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + `/review/aproveCommends`,
          method: 'PUT',
          data,
          headers: authHeader()
        }).then(resp => {
          resolve(resp.data)
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

    createReview (data) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + `/review/createReview`,
          method: 'POST',
          data,
          headers: authHeader()
        }).then(resp => {
          resolve(resp.data)
        })
        .catch(err => {
          let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
          try {
            responseError = err.response.data
          } catch (e) {}
          reject(responseError)
        })
      })
    };
    /**
     * Denegar la recomendación
     *
     * @param   {Object}  data
     * @return  {Promise}
     */
    denyCommends (data) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + `/review/denyCommends`,
          method: 'PUT',
          data,
          headers: authHeader()
        }).then(resp => {
          resolve(resp.data)
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
}

export default new RecommendationService ()

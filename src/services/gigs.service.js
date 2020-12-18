import { authHeader } from '@/helpers/auth-header';
const API_URL = process.env.VUE_APP_API
import axios from 'axios';

class GigsService {

  createGig (data) {
      return new Promise((resolve, reject) => {
        axios({
          url: API_URL + '/teachers/registerNewGig',
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

  /**
   * Eliminar el anuncio
   * @param  {Stirng} id
   * @return {Promise}
   */
  deleteGig (_id) {
    const url = API_URL + '/teachers/deleteGig'
      return new Promise((resolve, reject) => {
        axios({
          url,
          method: 'PUT',
          data: { _id: _id },
          headers: authHeader()
        }).then(resp => {
          resolve(resp.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Actualizar un anuncio
   * @return {Promise}
   */
  updateGig (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + '/teachers/updateGig',
        method: 'PUT',
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

  /**
   * Desactivar todo los gig del profesor
   *
   * @return  {Promise}
   */
  disableAllGigs (status) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + '/teachers/disableAllGigs',
        method: 'PUT',
        headers: authHeader(),
        data: {
          status
        }
      }).then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  /**
   * Desactivar/Activar el gig
   * @return {Promise}
   */
  toggleStatus (id) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + '/teachers/toggleGig',
        method: 'PUT',
        data: {_id: id},
        headers: authHeader()
      }).then(resp => {
        resolve(resp.data)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

    
  shareEmails (emails) {
    return new Promise((resolve, reject) => {
      axios({
        url: API_URL + '/teachers/shareEmails',
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
}

export default new GigsService();

import axios from 'axios';
const API_URL = process.env.VUE_APP_API
import { authHeader } from '@/helpers/auth-header';

class UserConfigurationsService {

  /**
   * Da debaja al usuario.
   * @param  {Object} data
   * @return {Promise}
   */
  removeUser () {
    return new Promise((resolve, reject) => {
      axios({
        url: API_URL + '/users/removeUser',
        method: 'DELETE',
        headers: authHeader()
      }).then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
  }

  /**
   * Desactivar la cuenta de punku, darse de baja
   * @param  {Object} data
   * @return {Promise}
   */
  toggleUser () {
    return new Promise((resolve, reject) => {
      axios({
        url: API_URL + '/users/toggleUser',
        method: 'PUT',
        headers: authHeader()
      }).then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

export default new UserConfigurationsService();

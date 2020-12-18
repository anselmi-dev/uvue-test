import { authHeader } from '@/helpers/auth-header';
const API_URL = process.env.VUE_APP_API
import axios from 'axios';

class CreditCardService {

  /**
   * Eliminar el credit-card
   * @param  {Stirng} id
   * @return {Promise}
   */
  destroy (_id) {
    const url = API_URL + '/users/removePaymentMethod'
      return new Promise((resolve, reject) => {
        axios({
          url,
          method: 'DELETE',
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
   * Agregar una credit-card
   * @return {Promise}
   */
  create (data) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + '/users/addPaymentMethod',
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
}

export default new CreditCardService();

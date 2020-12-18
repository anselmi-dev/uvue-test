import axios from 'axios';
import { authHeader } from '@/helpers/auth-header';
const API_URL = process.env.VUE_APP_API + '/noti'

class NotificationsService {

  /**
   * Obtener las notificaciones del usuario
   * @return {Promise}
   */
  getNotifications (options = {}) {
    return new Promise((resolve, reject) => {
      axios({
        url:  API_URL + `/getNotifications/?${this.buildParams(options)}`,
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

  markAllAsRead () {
    return new Promise((resolve, reject) => {
      axios({
        url:  `${API_URL}/markAllAsRead`,
        method: 'PUT',
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
}

export default new NotificationsService ()

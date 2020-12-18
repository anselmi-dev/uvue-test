import axios from 'axios';
const API_URL = process.env.VUE_APP_API + '/interactions'
import { authHeader } from '@/helpers/auth-header';

class InteractionsService {

    /**
     * Obtienes todas tus interacciones
     * @return {Promise}
     */
    getInteractions (options = {}) {
        return new Promise((resolve, reject) => {
            axios({
                url: API_URL + `/getInteractions/${options.type}?${this.buildParams(options)}`,
                method: 'GET',
                headers: authHeader()
            }).then(resp => {
                resolve(resp.data.result)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    /**
     * Agrega a favorito el GIG
     * @param  {Object} data
     * @return {Promise}
     */
    manageBookmarks(data) {
        return new Promise((resolve, reject) => {
            axios({
                url: API_URL + '/manageBookmarks',
                data,
                method: 'PUT',
                headers: authHeader()
            }).then(resp => {
                resolve(resp.data.result)
            })
            .catch(err => {
                reject(err)
            })
        })
    }

    /**
     * Obtienes los estudiantes con los que el profesor a tenido interacción.
     *
     * @param   {Object}  options  optiones para la paginación
     * @return  {Promise}
     */
    getMyStudents (options = {}) {
        return new Promise((resolve, reject) => {
            axios({
                url: API_URL + `/getMyStudents?${this.buildParams(options)}`,
                method: 'GET',
                headers: authHeader()
            }).then(resp => {
                resolve(resp.data.result)
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

export default new InteractionsService();
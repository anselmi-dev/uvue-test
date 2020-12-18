import { authHeader } from '@/helpers/auth-header';
import axios from 'axios';
const API_URL = process.env.VUE_APP_API

class GigsFilterService {

  /**
   * Obtiene todo los detalles de un anuncio en especifico.
   * @param  {String} slug String único para buscar el anuncio.
   * @return {Promise}
   */
  getGigDetails (slug) {
    const url = API_URL + '/teachers/getGigDetails/:slug'.replace(':slug', slug)
      return new Promise((resolve, reject) => {
        axios({
            url,
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

  /**
   * Obtiene los anuncio que posean un subject en común.
   * @param  {String} slug Cadena única para buscar los anuncios.
   * @return {Promise}
   */
  getGigsFilteredBy (slug, data = {}) {
    const url= `${API_URL}/teachers/getGigsFilteredBy/${slug}?${this.buildParams(data)}`
      return new Promise((resolve, reject) => {
        axios({
            url,
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

  getGigsRelated (data) {
    const url = API_URL + '/teachers/getGigsRelated'
      return new Promise((resolve, reject) => {
        axios({
          url,
          method: 'POST',
          data,
          headers: authHeader()
        }).then(resp => {
            resolve(resp.data.gigList)
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

export default new GigsFilterService();

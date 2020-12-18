import { authHeader } from '@/helpers/auth-header';
import axios from 'axios';
const API_URL = process.env.VUE_APP_API

class FileService {
  upload (data) {
    return new Promise((resolve, reject) => {
      axios({
        url: API_URL + '/teachers/uploadAssets',
        data: data,
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      }).then(resp => {
        resolve(resp)
      })
      .catch(err => {
          reject(err)
      })
    })
  }

  isTypeAccept (file_type, types) {
    return  types.includes(file_type)
  }
}

export default new FileService();

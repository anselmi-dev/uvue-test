import axios from 'axios';
const API_URL = process.env.VUE_APP_API
import { authHeader } from '@/helpers/auth-header';

class UserService {

  /**
   * Actualización de los datos del usuario.
   * @param  {Object} data
   * @return {Promise}
   */
  update(data) {
    return new Promise((resolve, reject) => {
      axios({
          url: API_URL + '/users/updateUser',
          data,
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

  /**
   * Actualizacion de contraseña
   * @param  {Object} data { newPass, curPass }
   * @return {Promise}
   */
  updatePassword(data) {
    return new Promise((resolve, reject) => {
      axios({
          url: API_URL + '/users/cambiarPw',
          data,
          method: 'PUT',
          headers: authHeader()
        }).then(resp => {
          resolve(resp.data.user)
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

  /**
   * Actualiza el avatar del usuario.
   * @param  {Object} data { url:String }
   * @return {Promise}
   */
  updateAvatar(data) {
    return new Promise((resolve, reject) => {
      axios({
          url: API_URL + '/users/updateAvatar',
          data,
          method: 'PUT',
          headers: authHeader()
        }).then(resp => {
          resolve(resp.data.pic_url)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Retorna una URL donde se hara una peticion para subir el archivo.
   * @param  {Object} data { fileName, fileType }
   * @return {Promise}
   */
  updateProfilePicture(data) {
    return new Promise((resolve, reject) => {
      axios({
          url: API_URL + '/teachers/getSignedRequest',
          data,
          method: 'POST',
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
   * Sube el archivo a una URL
   * @param  {String} url  Donde se enviara el archivo
   * @param  {String} data El archivo a enviar
   * @param  {String} type Tipo del archivo
   * @return {Promise}
   */
  uploadFile(url, data, type) {
    return new Promise((resolve, reject) => {
      axios({
          url,
          data,
          method: 'PUT',
          headers: {
            'Content-Type': type
          }
        }).then(resp => {
          resolve(resp.data.user)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  /**
   * Envia el correo de verificación para el usuario.
   * @return {Void}
   */
  sendVerification (email) {
    return new Promise((resolve, reject) => {
      axios({
          url: API_URL + '/auth/sendVerification',
          method: 'POST',
          data: {
            email: email
          },
        }).then(resp => {
          resolve(resp)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  VerifyAccount (code) {
    return new Promise((resolve, reject) => {
      return axios({
          url: API_URL + '/auth/VerifyAccount',
          data: {code},
          method: 'POST'
        }).then(resp => {
          resolve(resp)
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

};

export default new UserService();

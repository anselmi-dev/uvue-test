import axios from 'axios';
const API_URL = process.env.VUE_APP_API + '/auth'

class AuthService {
  login(user) {
    if (user.email) {
      user.username = user.email
    }
    return new Promise((resolve, reject) => {
      axios({
          url: API_URL + '/login',
          data: user,
          method: 'POST'
        }).then(resp => {
          localStorage.setItem('token', resp.data.token)
          resolve(resp.data.user)
        })
        .catch(err => {
          let responseError = 'Ocurrio un error! Intente nuevamente o más tarde.'
          try {
            responseError = err.response.data.err
          } catch (e) {}
          this.logout()
          reject(responseError)
        })
    })
  }

  logout () {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('token');
      resolve()
    })
  }

  register(user) {
    return new Promise((resolve, reject) => {
      return axios({
          url: API_URL + '/signup',
          data: user,
          method: 'POST'
        }).then(resp => {
          localStorage.setItem('token', resp.data.user.token)
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

  recoverPassword(email) {
    return new Promise((resolve, reject) => {
      return axios({
          url: API_URL + '/recoverPassword',
          data: {email},
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

  resetPassword (data) {
    return new Promise((resolve, reject) => {
      return axios({
          url: API_URL + '/resetPassword',
          data: data,
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
}

export default new AuthService();

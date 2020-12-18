import { authHeader } from '@/helpers/auth-header';
import axios from 'axios';
const API_URL = process.env.VUE_APP_API

class TeacherService {

	becomeTeacher (data) {
	    return new Promise((resolve, reject) => {
		    axios({
		        url: API_URL + '/teachers/becomeTeacher',
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

	searchTeachers (data) {
		return new Promise((resolve, reject) => {
			axios({
				url: `${API_URL}/teachers/getGigsFilteredBy?${Object.entries(data).map(([key, val])=>`${key}=${val}`).join("&")}`,
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

	updateTeacher (data) {
		return new Promise((resolve, reject) => {
			axios({
		    url: API_URL + '/teachers/updateTeacher',
				data,
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

	makeGigPrincipal (data) {
		return new Promise((resolve, reject) => {
			axios({
		    url: API_URL + '/teachers/makeGigPrincipal',
				data,
				method: 'PUT',
				headers: authHeader()
			}).then(resp => {
				resolve(resp.data)
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

	removeTeacherDocs (data) {
		return new Promise((resolve, reject) => {
			axios({
		    url: API_URL + '/teachers/removeTeacherDocs',
				data,
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
}

export default new TeacherService ();

import axios from 'axios';

const API_URL = process.env.VUE_APP_API

class SubjectsService {
	filterDisciplines = (arr, prop) => {
		const set = new Set;
		return arr.filter(o => !set.has(o[prop]) && set.add(o[prop]));
	  };

  	getDisciplines (subject) {
	    return new Promise((resolve, reject) => {
		    axios({
		      url: API_URL + '/subjects/getAllSubjects',
		      method: 'GET'
		    }).then(resp => {
		      resolve(resp.data)
		    })
		    .catch(err => {
		        reject(err)
		    })
		})
	  }

	getDisciplinesByField (field, input) {
	    return new Promise((resolve, reject) => {
		    axios({
		      url: API_URL + '/subjects/getSubjectsBy?field='+field+'&value='+input,
				method: 'GET'
		    }).then(resp => {
		      resolve(resp.data)
		    })
		    .catch(err => {
		        reject(err)
		    })
		})
	  }
	  
	getAllSubjectsGroups () {
		return new Promise((resolve, reject) => {
			axios({
				url: API_URL + '/subjects/getAllSubjectsGroups',
				method: 'GET'
			}).then(resp => {
				resolve(resp.data)
			})
			.catch(err => {
				reject(err)
			})
		})
	}
}

export default new SubjectsService ();

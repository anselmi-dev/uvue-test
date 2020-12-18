import { authHeader } from '@/helpers/auth-header';
import axios from 'axios';
const API_URL = process.env.VUE_APP_API

class CouponsService {

    getAll () {
        return new Promise((resolve, reject) => {
            axios({
                url: API_URL + '/coupons/getUserCoupons/',
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

export default new CouponsService ();

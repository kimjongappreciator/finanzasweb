import http from '../core/http-common'

class userServices {

    endPoint = 'https://finanzasapi.herokuapp.com/users';

    getAll() {
        return http.get(this.endPoint);
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
    getByUsername(user) {
        return http.get(`${this.endPoint}/search?username=${user}`);
    }

    create(createAgencyDto) {
        return http.post(this.endPoint, createAgencyDto);
    }
    update(id, updateAgencyDto) {
        return http.put(`${this.endPoint}/${id}`, updateAgencyDto);
    }
    delete(id) {
        return http.delete( `${this.endPoint}/${id}`);
    }

}
export default new userServices();

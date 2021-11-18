import http from '../core/http-common'

class paidBillService {

    endPoint = 'https://finanzasapi.herokuapp.com/paidbills';

    getAll() {
        return http.get(this.endPoint);
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
    getByUserid(user) {
        return http.get(`${this.endPoint}/search?userId=${user}`);
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
export default new paidBillService();

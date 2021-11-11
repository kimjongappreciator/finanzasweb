import http from '../core/http-common'

class invoiceService {

    endPoint = '/facturas';

    getAll() {
        return http.get(this.endPoint);
    }
    getById(id) {
        return http.get(`${this.endPoint}/${id}`);
    }
    getByUserid(user) {
        return http.get(`${this.endPoint}?userid=${user}`);
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
export default new invoiceService();

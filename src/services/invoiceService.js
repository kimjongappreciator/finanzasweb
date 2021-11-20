import http from '../core/http-common'

class invoiceService {

    endPoint = 'https://finanzasapi.herokuapp.com/bills';

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
    patch(id, patchItem){
        return http.patch(`${this.endPoint}/${id}`, patchItem);
    }


}
export default new invoiceService();

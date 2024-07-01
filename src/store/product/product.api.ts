import HttpClient from "@/api/httpClient";

export default class ProductAPI {
    static saveCatalogs(body: any) {
        return HttpClient.post(`/products/SaveCatalogs`, body);
    }
    static getListProduct() {
        return HttpClient.get(`/products/getlistProducts`);
    }
    static getProduct(id: string) {
        return HttpClient.get(`/products/getProduct/${id}`);
    }
}
import HttpClient from "@/api/httpClient";

export default class CatalogAPI {
    static getListCatalog(id: string) {
        return HttpClient.get(`/catalogs/getlistCatalogs/${id}`);
    }
    static saveCatalog(body: any) {
        return HttpClient.post(`/catalogs/SaveCatalogs`, body);
    }
    static getListCatalogDetail(id: string) {
        return HttpClient.get(`/catalogs/getlistCatalogsDetail/${id}`);
    }
    static saveCatalogDetail(body: any) {
        return HttpClient.post(`/catalogs/SaveCatalogsDetail`, body);
    }
}
import HttpClient from "@/api/httpClient";

export default class FooterAPI {
    static getFooters() {
        return HttpClient.get("/footer/getlistFooter");
    }
}
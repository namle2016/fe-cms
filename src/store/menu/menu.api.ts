import HttpClient from "@/api/httpClient";

export default class MenuAPI {
    static getListMenu() {
        return HttpClient.get("/menus/getlistMenu");
    }
}
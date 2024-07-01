import HttpClient from "@/api/httpClient";

export default class SlideAPI {
    static getListSlide() {
        return HttpClient.get(`/slides/listSlides`);
    }
    static saveSlide(body: any) {
        return HttpClient.post(`/slides/SaveSlides`, body);
    }
}
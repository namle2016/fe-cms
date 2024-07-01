import HttpClient from "@/api/httpClient";

export default class PostAPI {
    static getListPostGroup(code: string) {
        return HttpClient.get(`/posts/getlistGroupPost/${code}`);
    }
    static getPostGroup(id: string) {
        return HttpClient.get(`/posts/getGroupPostbyId/${id}`);
    }
    static postUploadFileSingle(body: any) {
        return HttpClient.post(`/uploads/file`, body);
    }
    static savePostGroup(body: any) {
        return HttpClient.post(`/posts/SaveGroupPost`, body);
    }

    static getListPost(code: string) {
        return HttpClient.get(`/posts/getlistPostbyType/${code}`);
    }

    static getPost(id: string) {
        return HttpClient.get(`/posts/getPostbyId/${id}`);
    }
    static savePost(body: any) {
        return HttpClient.post(`/posts/SavePost`, body);
    }

}
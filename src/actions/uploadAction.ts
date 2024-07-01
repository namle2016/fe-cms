import { axiosHandler } from "@/api/httpClient";
import PostAPI from "@/store/post/post.api";

export const postUploadFile = async (file: any) => {
  let formData = new FormData();
  formData.append("file", file);
  const { isSuccess, files } = await axiosHandler(() =>
    PostAPI.postUploadFileSingle(formData)
  );
  if (isSuccess) {
    return files;
  }
};
import type { typeFormCategory } from "@/types";
import https from "./config.api";

//Get all
export const GetCategory = async () => {
  try {
    const { data } = await https.get("/category/all");
    return { data, error: null };
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return { data: null, error: message };
  }
};

//Create
export const postCategory = async (form:typeFormCategory) => {
    try {
      const { data } = await https.post("/category/create",form);
      return { data, error: null };
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return { data: null, error: message };
    }
  };
  
//Delete 
export const deleteCategory = async(id:string) => {
  try {
    const {data} = await https.post(`/category/delete/${id}`)
    return { data, error: null };
  } catch (error:any) {
    const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return { data: null, error: message };
  }
}

//cập nhật trạng thái
export const updateSuccessCategory = async(id:string) => {
  try {
    const {data} = await https.post(`/category/success/${id}`)
    return { data, error: null };
  } catch (error:any) {
    const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return { data: null, error: message };
  }
}

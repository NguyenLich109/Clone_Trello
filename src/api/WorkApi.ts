import https from "./config.api";

export const GetWork = async (key:string | string[]) => {
  try {
    const { data } = await https.get(`/work/all?key=${key}`);
    return { data, error: null };
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return { data: null, error: message };
  }
};

//create
export const CreateWork = async ({idCategory, title}:{idCategory: string | string[], title:string}) => {
  try {
    const { data } = await https.post("/work/create", {idCategory, title});
    return { data, error: null };
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return { data: null, error: message };
  }
};

//cập nhật 
export const updateWork = async ({id, title}:{id: string | string[], title:string}) => {
  try {
    const { data } = await https.post(`/work/update/${id}`, {title});
    return { data, error: null };
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return { data: null, error: message };
  }
};

//delete
export const deleteWork = async ({id}:{id: string | string[]}) => {
  try {
    const { data } = await https.post(`/work/delete/${id}`);
    return { data, error: null };
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return { data: null, error: message };
  }
};

// Tạo task child
export const createTask = async ({id, content}:{id: string, content:string}) => {
  try {
    const { data } = await https.post(`/work/create/task/${id}`, {content});
    return { data, error: null };
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return { data: null, error: message };
  }
};

// Thay đổi content của taskChild
export const updateContentTask = async ({id, content, idTaskChild}:{id: string, content:string, idTaskChild: string | undefined}) => {
  try {
    const { data } = await https.post(`/work/update/task/${id}`,{content, idTaskChild});
    return { data, error: null };
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return { data: null, error: message };
  }
};

//Thay đổi trạng thái taskChild
export const toggleContentTask = async ({id,  idTaskChild}:{id: string,  idTaskChild: string}) => {
  try {
    const { data } = await https.post(`/work/toggle/task/${id}`,{idTaskChild});
    return { data, error: null };
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return { data: null, error: message };
  }
};

//Hoàn thành tất cả cái work
export const completeAllTask = async ({id}:{id: string}) => {
  try {
    const { data } = await https.post(`/work/complete/allTask/${id}`);
    return { data, error: null };
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return { data: null, error: message };
  }
};

// Delete task child
export const deleteTaskChild = async ({id,  idTaskChild}:{id: string,  idTaskChild: string}) => {
  try {
    const { data } = await https.post(`/work/delete/task/${id}`,{idTaskChild});
    return { data, error: null };
  } catch (error: any) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    return { data: null, error: message };
  }
};

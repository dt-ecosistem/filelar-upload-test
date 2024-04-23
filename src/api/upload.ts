import axios from "axios";

interface ImageItem {
  image: string;
  file: File;
  size: boolean;
  id: number;
}

export const uploadFile = async (payload: ImageItem) => {
  if (!payload) {
    console.error("No file selected");
    return null;
  }

  const data = new FormData();
  data.append("module", "test");
  data.append("tenantId", "test");
  data.append("fileName", "test");
  data.append("file", payload.file);
  try {
    const response = await axios.post("http://192.168.100.241:9999/api/file/upload/public", data);
    console.log(response.data);
    return response;

  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }

};


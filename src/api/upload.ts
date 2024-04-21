import axios from "axios";

export async function uploadkatta(data: any) {
  if (!data) {
    console.error("No file selected");
    return null;
  }

  const formdata = new FormData();
  formdata.append("tenantId", "test");
  formdata.append("module", "test");
  formdata.append("fileName", `test`);
  formdata.append("file", data);

  const response = await axios.post("http://192.168.100.241:9999/api/file/upload/public", formdata);
  console.log(response.data);
  return response;

}
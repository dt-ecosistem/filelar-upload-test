<template>
  <div class="m-10">
    <div id="main" class="flex flex-wrap w-[100%] gap-2 p-2 mt-3.5 p-3.5">
      <label
          for="single"
          class="w-[300px] h-[250px] flex flex-col justify-center items-center cursor-pointer bg-gray-200 rounded text-white border-dashed border-2 border-gray-400"

      >
        <input
            id="single"
            type="file"
            class="hidden"
            ref="fileInput"
            @change="handleFileChange"
        />

        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="80" height="80" id="upload-in-cloud"><defs><path id="a" d="M.06 64V.04H64V64z"></path></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"></use></mask><path fill="#FFFFFE" d="M48 30c0-8.837-7.164-16-16-16-7.498 0-13.773 5.165-15.508 12.126C11.687 26.854 8 30.991 8 36c0 5.523 4.477 10 10 10h8a2 2 0 0 0 2-2v-5.5a1.5 1.5 0 0 0-1.5-1.5h-3.061c-1.472 0-1.883-1.01-.914-2.245l7.713-9.829c.969-1.235 2.555-1.235 3.524 0l7.713 9.829c.969 1.235.558 2.245-.914 2.245H37.5a1.5 1.5 0 0 0-1.5 1.5V44a2 2 0 0 0 2 2h10a8 8 0 0 0 0-16" mask="url(#b)"></path><path fill="#4C5665" d="M48 46H38a2 2 0 0 1-2-2v-5.5a1.5 1.5 0 0 1 1.5-1.5h3.061c1.472 0 1.883-1.01.914-2.245l-7.713-9.829c-.969-1.235-2.555-1.235-3.524 0l-7.713 9.829c-.969 1.235-.558 2.245.914 2.245H26.5a1.5 1.5 0 0 1 1.5 1.5V44a2 2 0 0 1-2 2h-8c-5.523 0-10-4.477-10-10 0-5.009 3.687-9.146 8.492-9.874C18.227 19.165 24.502 14 32 14c8.836 0 16 7.163 16 16a8 8 0 0 1 0 16zM32 0C14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32C64 14.327 49.673 0 32 0z" mask="url(#b)"></path></g></svg>

<!--                <p class="font-bold text-gray-500">Click to upload </p>-->

        <i
            v-if="isUploaded"
            class="fa-solid fa-square-check text-[35px] absolute top-2 right-2 text-green-500"
        ></i>
        <i
            v-if="highSize"
            title="Size is too high"
            class="fa-solid fa-circle-xmark text-[35px] absolute top-2 right-2 text-red-500"
        ></i>
        <i class="fa-solid"></i>
        <i
            v-if="cantSend"
            title="Can't send"
            class="fa-solid fa-circle-exclamation text-[35px] absolute top-2 right-2 text-red-400"
        ></i>
        <img :src="fileContent" class="max-w-[100%] max-h-[100%]" />
      </label>

      <button
          :disabled="isUploaded || highSize"
          @click="upload()"
          type="submit"
          class="h-[50px]  w-[100px] ml-5 p-3 bg-gray-600  rounded text-white rounded-2xl"
          :class="{
          'hover:bg-yellow-600  cursor-not-allowed': isUploaded || highSize,
        }"
      >
        Upload
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref } from "vue";
import Notification from "../plugins/Notification";
import type { AxiosResponse } from "axios";
import api from "../api/upload";

interface ImageItem {
  image: string;
  file: File;
  size: boolean;
  id: number;
}

const fileName = ref("");
const fileContent = ref("");
const fileInput = ref<HTMLInputElement | null>(null);
const sendingFile: Ref<File | null> = ref(null);
const isUploaded = ref(false);
const highSize = ref(false);
const cantSend = ref(false);

const handleFileChange = (event: Event): void => {
  const file = (event.target as HTMLInputElement).files?.[0];

  isUploaded.value = false;
  highSize.value = false;
  cantSend.value = false;
  if (file) {
    if (file.size > props.maxSize) highSize.value = true;
    sendingFile.value = file;
    if (file) {
      fileName.value = file.name;
      if (fileName.value.includes("png")) {
        const reader = new FileReader();
        reader.onload = () => {
          fileContent.value = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else if (fileName.value.includes("jpg")) {
        const reader = new FileReader();
        reader.onload = () => {fileContent.value = reader.result as string };
        reader.readAsDataURL(file);
      }  else if(
          file.name.includes("mp4") || 
          file.name.includes("mp3") || 
          file.name.includes("zip") || 
          file.name.includes("pdf") || 
          file.name.includes("html") || 
          file.name.includes("sql")
        ){
          fileContent.value =  getFileContent(file.name)
        } 
    }
  }
};

const getFileContent = (filetype:string):string => {
  if (filetype.includes("mp4")) {
    return "https://static.vecteezy.com/system/resources/previews/000/644/657/original/vector-video-icon-symbol-sign.jpg"
  } else if (filetype.includes("mp3")) {
    return "/audio.png"
  } else if (filetype.includes("zip")) {
  return  "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png"
  } else if (filetype.includes("pdf")) {
  return  "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w"
  } else if (filetype.includes("html")) {
  return  "https://cdn4.iconfinder.com/data/icons/smashicons-file-types-flat/56/22_-_HTML_File_Flat-512.png"
  } else if (filetype.includes("sql")) {
  return "https://www.shareicon.net/data/2015/09/07/97430_document_512x512.png"
  } else {
  return "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png"
  }
}


defineExpose({
  handleFileChange,
  getFileContent
});

const upload = async () => {
  if (sendingFile.value) {
    const data = {} as ImageItem;
    data.file = sendingFile.value;
    data.id = 0;
    data.size = highSize.value;
    data.image = fileContent.value;
    try {
      const res: AxiosResponse = await api.uploadSingle(data);
      if (res.status == 200) {
        isUploaded.value = true;
        Notification("success", "Successfully", "Your file successfully uploaded");
      }
    } catch (err) {
      cantSend.value = true;
      Notification("error", "Can't send", "This file can't be send");
    }
  } else 
    Notification("error", "Choose a file", "You have to choose at least one file" );
};

const props = defineProps<{
  maxSize: number;
  isUploaded: boolean;
}>();
</script>

<style lang="scss" scoped></style>

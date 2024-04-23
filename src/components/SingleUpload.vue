<template>
  <p class="px-[20px] mt-[40px] font-bold text-[15px]">
    🚫 {{ props.maxSize / 1024 / 1024 }}MB dan katta file kiritmang
  </p>
  <div class="px-[50px] pt-[20px] flex items-end gap-10">
    <label
      :title="isHighSize ? 'Size is too high' : ''"
      for="inputField"
      class="w-[230px] h-[200px] flex flex-col gap-3 justify-center items-center bg-slate-200 rounded-md shadow-lg cursor-pointer hover:bg-slate-300 relative"
      :class="{ 'bg-white shadow-none': fileType }"
    >
      <div v-if="fileType" class="absolute text-[23px] top-3 right-3">
        <i v-if="isLoaded" class="fa-solid fa-circle-check text-green-600"></i>
        <i v-if="isFailed" title="Error while loading the file" class="fa-solid fa-circle-exclamation text-red-600"></i>
        <i v-if="isHighSize" class="fa-solid fa-circle-xmark text-red-600"></i>
      </div>

      <input
        id="inputField"
        type="file"
        class="hidden"
        ref="fileInput"
        @change="handleSingil"
      />
      <i v-if="!fileType" class="fa-solid fa-cloud-arrow-up text-[25px]"></i>
      <h1 v-if="!fileType">Choose File</h1>

      <img :src="fileContent" class="max-w-[100%] max-h-[100%]" />
    </label>
    <button
      class="button px-5 py-3 rounded-full bg-blue-400 text-white flex gap-3 items-center justify-center"
      :disabled="isLoaded || isHighSize"
      :title="isLoaded ? 'File already uploaded' : ''"
      :class="{ 'cursor-not-allowed': isLoaded || isHighSize }"
      @click="save"
    >
      <div v-if="isLoading">
        <svg
          aria-hidden="true"
          class="w-5 h-5 text-[white] animate-spin dark:text-gray-600 fill-[white]"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"fill="currentFill"
          />
        </svg>
      </div>
      <h1>Upload</h1>
    </button>
  </div>
  <p>{{props.typesSingle}}</p>

</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  maxSize: number;
  typesSingle:string;
}>();

import {uploadFile} from "../api/upload";
import {ElMessage} from "element-plus";
interface ImageItem {
  image: string;
  file: File;
  size: boolean;
  id: number;
}

const fileType = ref("");
const fileContent = ref("");

const fileInput = ref<HTMLInputElement | null>(null);
const isLoading = ref(false);


console.log("prop",props)



const choosenFile = ref<File | null>(null);
const isHighSize = ref(false);


const handleSingil = (event: Event): void => {
  isHighSize.value = false;
  isLoaded.value = false;
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    if (file.size > props.maxSize) {
      isHighSize.value = true;
    }
    fileType.value = file.type;

    if (props.typesSingle === fileType.value)  {
    if (fileType.value.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        fileContent.value = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      fileContent.value = getFileTpes(fileType.value);
    }
    choosenFile.value = file;

    }

  }
};

const isLoaded = ref(false);
const isFailed = ref(false);

const save = async (): Promise<void> => {
  if (choosenFile.value) {
    isLoading.value = true;
    const data = {} as ImageItem;
    data.id = 0;
    data.file = choosenFile.value;
    data.size = isHighSize.value;
    data.image = fileContent.value;

    try {
      await uploadFile(data);
      data.id = 1;
      isLoaded.value = true;
      isFailed.value = false;
      ElMessage({
        message: '👍 zo\'r ketti',
        type: 'success',
        plain: true,
      })
    } catch (error) {
      data.id = 2;
      isFailed.value = true;
      ElMessage.error('Something went wrong", "danger')
    }

    isLoading.value = false;
  } else {
    ElMessage.error('YPlease, add any file", "danger')
  }
};

const getFileTpes=(fileType: string):string=>{
  if (fileType.startsWith("video/")) {
    return "/video-icon.jpg";
  } else if (fileType.startsWith("audio/")) {
    return "/audio-icon.jpg";
  } else if (fileType.startsWith("application/pdf")) {
    return "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w";
  } else if (fileType.startsWith("application/zip")) {
    return "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png";
  } else if (fileType.startsWith("application/sql")) {
    return "https://www.shareicon.net/data/2015/09/07/97430_document_512x512.png";
  } else if (fileType.startsWith("text/html")) {
    return "https://cdn4.iconfinder.com/data/icons/smashicons-file-types-flat/56/22_-_HTML_File_Flat-512.png";
  } else {
    return "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png";
  }
}

defineExpose({
  handleSingil,
  getFileTpes,
  // getData,
});
</script>

<style scoped></style>

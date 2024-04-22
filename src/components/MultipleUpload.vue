<template>
  <p class="px-[20px] mt-[80px] font-bold text-[15px]">
    🚫 {{ props.maxSize / 1024 / 1024 }}MB dan katta file kiritmang
<br />🚫 iltimos  {{ props.maxElementCount }}  fayildan boshqa kiritmang
  </p>
   <p class="">multiple</p>
  <div class="px-[50px] pt-[20px] flex w-full flex-wrap gap-10 items-end">
<!--chizish-->
    <div
      class="flex justify-center items-center card"
      v-for="(item, index) in images"
      :key="index"
    >
      <div
        @click="buttonClicked(item)"
        class="w-[200px] h-[200px] relative flex clickCard"
        :title="!item.size ? 'Size is too high' : ''"
      >
        <i v-if="!item.size"class="absolute fa-solid top-3 right-3 fa-circle-xmark text-red-600 text-[23px]"></i>
        <i v-if="item.id == 1" class="absolute fa-solid top-3 right-3 fa-circle-check text-green-600 text-[23px]"></i>
        <i v-if="item.id == 2" class="absolute fa-solid top-3 right-3 fa-circle-exclamation text-red-600 text-[23px]"></i> 
        <button
          class="absolute left-0 top-0 border-2 border-red-600 px-3 py-1 bg-white text-red-500 rounded-full text-[14px]"
          @click="remove(index)"
        >
          Remove
        </button>
        <img :src="item.image" class="max-w-[100%] max-h-[100%]" />
      </div>
    </div>
    <label
      for="inputField1"
      class="w-[230px] h-[200px] flex flex-col gap-3 justify-center items-center bg-slate-200 rounded-md shadow-lg cursor-pointer hover:bg-slate-300"
      :title="isMaxCount ? 'You select maximum count file' : ''"
    >
      <input
             id="inputField1"
             type="file"
             multiple
             class="hidden"
             ref="fileInput"
             @change="handleFile"
      />

      <i class="fa-solid fa-cloud-arrow-up text-[25px]"></i>
      <h1>Choose File</h1>
    </label>
    <button
      class="px-5 py-3 rounded-full bg-blue-400 text-white flex gap-3 items-center justify-center"
      @click="save"
      :plain="true"
    >

      <h1>Upload</h1>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { AxiosResponse } from "axios";
import type { Ref } from "vue";
import  {uploadkatta} from "../api/upload";
import {ElMessage} from "element-plus";

interface ImageItem {
  image: string;
  file: File;
  size: boolean;
  id: number;
}
const props = defineProps<{
  maxElementCount: number;
  maxSize: number;
  multipile:boolean
}>();

const images: Ref = ref([]);
const fileInput: Ref = ref(null);
const isLoading: Ref = ref(false);
const isMaxCount: Ref = ref(false);

const handleFile = (event: Event): void => {
  const inputElement = event.target as HTMLInputElement;
  const files: FileList | null = inputElement.files;

  if (!files) return;
  
  if (images.value.length < props.maxElementCount) {
    const filesToProcess = Array.from(files).slice(0, props.maxElementCount - images.value.length);
    if (files.length > props.maxElementCount) isMaxCount.value = true;
    for (const file of filesToProcess) {
      const size: boolean = file.size <= props.maxSize;

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          images.value.push({
            image: reader.result as string,
            file,
            size,
            id: 0,
          });
        };
        reader.readAsDataURL(file);
      } else if (
        file.type.startsWith("video/") ||
        file.type.startsWith("audio/") ||
        file.type.startsWith("application/pdf") ||
        file.type.startsWith("application/zip") ||
        file.type.startsWith("application/sql") ||
        file.type.startsWith("text/html") ||
        file.type !== ""
      ) {
        images.value.push({
          image: getFileTpes(file.type),
          file,
          size,
          id: 0,
        });
      }
    }
  } else {
    isMaxCount.value = true;
    ElMessage.error('You can select 5 files with maximum", "danger')

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

const remove = (index: number): void => { images.value.splice(index, 1) };

const buttonClicked = async (item: ImageItem): Promise<void> => {
  if (item.id === 2) {
    isLoading.value = true;

    const res: AxiosResponse = await uploadkatta(item);
    if (res.status === 200) {
      item.id = 1;
    }
  }
  isLoading.value = false;
};

const save = async () => {
  if (images.value.length > 0) {
    isLoading.value = true;
    for (let img of images.value) {
      const imageItem = img as ImageItem;
      if (imageItem.size && imageItem.id !== 1) {
        try {
       const res =   await uploadkatta(imageItem);
          imageItem.id = 1;
        } catch (error) {
          imageItem.id = 2;
        }
      }
    }
    ElMessage({
      message: '👍 zo\'r ketti',
      type: 'success',
      plain: true,
    })
    isLoading.value = false;
  } else {
    ElMessage.error('Please, add any file", "danger')
  }
};
defineExpose({
  handleFile,
  getFileTpes
});
</script>

<style lang="scss" scoped></style>

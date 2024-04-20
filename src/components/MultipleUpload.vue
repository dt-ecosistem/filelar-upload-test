<template>
	<hr />
	<div id="main" class="flex flex-wrap w-[100%] gap-2 p-2 mt-3.5 p-4">
		<input
			type="file"
			class="hidden"
			ref="fileInput"
			multiple
			id="multiple"
			@change="handleFileChange"
		/>

		<!-- Selected files -->
		<button
			v-for="(item, index) in pictures"
			@click="reUpload(item)"
			:key="index"
			class="w-[250px] h-[300px] relative p-3"
			:title="item.size ? 'Size is too high' : ''"
		>
			<i
				v-if="item.size"
				class="fa-solid fa-circle-xmark text-[15px] absolute bottom-2 right-2 text-red-500"
			> 20 mg dan katta</i>
			<i
				v-if="item.id == 1"
				class="fa-solid fa-square-check text-[35px] absolute top-0 left-2 text-green-500"
			></i>
			<i
				v-if="item.id == 2"
				class="fa-solid fa-circle-exclamation text-[35px] absolute top-0 left-2 text-red-500"
			></i>
			<button
				class="absolute p-1 rounded-md bg-slate-500 text-white right-0 top-0"
				@click="removeeeeee(index)"
			>
				Remove
			</button>
			<img :src="item.image" class="max-w-[100%] max-h-[100%]" />
      <p>{{item.name}}</p>
		</button>

		<!-- First input -->
		<label
			for="multiple"
			class="w-[300px] h-[250px] flex flex-col justify-center items-center cursor-pointer bg-gray-200 rounded text-white border-dashed border-2 border-gray-400"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				width="80"
				height="80"
				id="upload-in-cloud"
			>
				<defs><path id="a" d="M.06 64V.04H64V64z"></path></defs>
				<g fill="none" fill-rule="evenodd">
					<mask id="b" fill="#fff"><use xlink:href="#a"></use></mask>
					<path
						fill="#FFFFFE"
						d="M48 30c0-8.837-7.164-16-16-16-7.498 0-13.773 5.165-15.508 12.126C11.687 26.854 8 30.991 8 36c0 5.523 4.477 10 10 10h8a2 2 0 0 0 2-2v-5.5a1.5 1.5 0 0 0-1.5-1.5h-3.061c-1.472 0-1.883-1.01-.914-2.245l7.713-9.829c.969-1.235 2.555-1.235 3.524 0l7.713 9.829c.969 1.235.558 2.245-.914 2.245H37.5a1.5 1.5 0 0 0-1.5 1.5V44a2 2 0 0 0 2 2h10a8 8 0 0 0 0-16"
						mask="url(#b)"
					></path>
					<path
						fill="#4C5665"
						d="M48 46H38a2 2 0 0 1-2-2v-5.5a1.5 1.5 0 0 1 1.5-1.5h3.061c1.472 0 1.883-1.01.914-2.245l-7.713-9.829c-.969-1.235-2.555-1.235-3.524 0l-7.713 9.829c-.969 1.235-.558 2.245.914 2.245H26.5a1.5 1.5 0 0 1 1.5 1.5V44a2 2 0 0 1-2 2h-8c-5.523 0-10-4.477-10-10 0-5.009 3.687-9.146 8.492-9.874C18.227 19.165 24.502 14 32 14c8.836 0 16 7.163 16 16a8 8 0 0 1 0 16zM32 0C14.327 0 0 14.327 0 32c0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32C64 14.327 49.673 0 32 0z"
						mask="url(#b)"
					></path>
				</g>
			</svg>

			<p class="font-bold text-gray-500">Click to upload</p>

			<img class="max-w-[100%] max-h-[100%]" />
		</label>
		<button
			@click="upload()"
			type="submit"
			class="h-[50px] w-[100px] ml-5 p-3 bg-gray-600 rounded text-white rounded-2xl"
		>
			{{ isUploaded ? "loading ..." : "Upload" }}
		</button>

	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import Notification from "../plugins/Notification";
import type { AxiosResponse } from "axios";
import {ElMessage} from "element-plus";
import {uploadkatta} from "@/api/api";
const isUploaded = ref(false);

interface ImageItem {
	image: string;
	file: File;
	size: boolean;
	id: number;
  name:string
}

const fileName: Ref<String | null> = ref("");
const pictures: Ref<ImageItem[]> = ref([]);
const fileInput: Ref<HTMLInputElement | null> = ref(null);

const removeeeeee = (index: number) => {
	pictures.value.splice(index, 1);
	// console.log(pictures.value);
};
 const handleFileChange = (event: Event): void => {
	const inputElement = event.target as HTMLInputElement;
	const files: FileList | null = inputElement.files;
	// console.log(files);
	if (!files) return;

	for (const file of Array.from(files)) {
		if (file) {
			fileName.value = file.name;
			const size = file.size / (1024 * 1024) > 20;
			if (fileName.value.includes("png")) {
				const reader = new FileReader();
				reader.onload = () => {
					pictures.value.push({
						image: reader.result as string,
						file,
						size,
						id: 0,
            name:file.name
					});
				};
				reader.readAsDataURL(file);
			} else if (fileName.value.includes("jpg")) {
				const reader = new FileReader();
				reader.onload = () => {
					pictures.value.push({
						image: reader.result as string,
						file,
						size,
						id: 0,
            name:file.name
					});
				};
				reader.readAsDataURL(file);
			} else if (fileName.value.includes("mp4")) {
				pictures.value.push({
					image:
						"https://static.vecteezy.com/system/resources/previews/000/644/657/original/vector-video-icon-symbol-sign.jpg",
					file,
					size,
					id: 0,
          name:file.name
				});
			} else if (fileName.value.includes("mp3")) {
				pictures.value.push({ image: "/audio.png", file, size, id: 0 ,name:""});
			} else if (fileName.value.includes("zip")) {
				pictures.value.push({
					image:
						"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png",
					file,
					size,
					id: 0,
          name:file.name
				});
			} else if (fileName.value.includes("pdf")) {
				pictures.value.push({
					image:
						"https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w",
					file,
					size,
					id: 0,
          name:file.name
				});
			} else if (fileName.value.includes("html")) {
				pictures.value.push({
					image:
						"https://cdn4.iconfinder.com/data/icons/smashicons-file-types-flat/56/22_-_HTML_File_Flat-512.png",
					file,
					size,
					id: 0,
          name:file.name
				});
			} else if (fileName.value.includes("sql")) {
				pictures.value.push({
					image: "https://www.shareicon.net/data/2015/09/07/97430_document_512x512.png",
					file,
					size,
					id: 0,
          name:file.name
				});
			} else {
				pictures.value.push({
					image: "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png",
					file,
					size,
					id: 0,
          name:file.name
				});
			}
		}
	}
};

const reUpload = async (item: ImageItem): Promise<void> => {
	if (item.id == 2) {
		const res = await uploadkatta(item);
		if (res && res.status == 200) {
			item.id = 1;
		}
	}
};

const upload = async () => {
	if (pictures.value.length > 0) {
		for (const i of pictures.value) {
			// console.log(i);

			const imageItem = i as ImageItem;
			if (imageItem.id != 1 && !imageItem.size) {
				try {
					const res= await uploadkatta(imageItem.file);
					isUploaded.value = true;
					if (res && res.status == 200) {
						imageItem.id = 1;
            // ElMessage({
            //   message: 'Congrats, this is a success message.',
            //   type: 'success',
            // })
					} else {
            // ElMessage.error('Oops, this is a error message.')
					}
				} catch (e) {
					// console.log(e);
						imageItem.id = 2;
				}
			}
		}
		isUploaded.value = false;

	} else {
		Notification("warning", "Choose file", "You have to choose file at least one");
	}
};
</script>

<style lang="scss" scoped></style>

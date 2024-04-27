<template>
	<div class="px-[50px] pt-[20px] flex w-full flex-wrap gap-10 items-end">
		<!--chizish-->
		<div
			class="flex justify-center items-center dates"
			v-for="(item, index) in images"
			:key="index"
		>

			<div
				
				class="w-[200px] h-[200px] relative flex clickCard"
				:title="!item.size ? 'error' : ''"
			>
				<img :src="getIcon(item.size!)" alt="" 		class="absolute fa-solid top-3 right-3 fa-circle-xmark text-red-600 text-[23px]"
		>
				

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
				multiple
				id="inputField1"
				type="file"
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
import { uploadFile } from "../api/upload";
import { ElMessage } from "element-plus";
import  {getFileTpes}  from "../data/imglar"
import  {getIcon}  from "../data/status"
interface ImageItem {
	image: string;
	file: File;
	size: boolean;
	id: number;
}

const props = defineProps({
	maxElementCount: {
		type: Number,
		default: 10 * 1024 * 1024,
	},
	maxSize: {
		type: Number,
		default: 10 * 1024 * 1024,
	},
	typesMulti: {
		type: String,
		default: "application/zip",
	},
	multipl: {
		type: Boolean,
		default: true,
	},
});

const images: Ref = ref([]);
const fileInput: Ref = ref(null);
const isLoading: Ref = ref(false);
const isMaxCount: Ref = ref(false);
console.log(props.multipl);
const handleFile = (event: Event): void => {
	const inputElement = event.target as HTMLInputElement;
	const files: FileList | null = inputElement.files;
console.log(files);
	if (!files) return;
	if (images.value.length < props.maxElementCount && props.typesMulti ===files[0].type) {
		const filesToProcess = Array.from(files).slice(0, props.maxElementCount - images.value.length);
		if (files.length > props.maxElementCount) isMaxCount.value = true;
		
		if (props.multipl === true) {
			if (files.length === 0) {
				isMaxCount.value = true;
				return;
			}
		}
    
		for (const file of filesToProcess) {
			const size: boolean = file.size <= props.maxSize;
			
			if (file.type ==="image/") {
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
			} else {
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
		ElMessage.error('siz yo 5 ta filedan kop yukladiz ", " yoki kiritilgan typedan bosha kiritingiz');
	}
};

const remove = (index: number): void => {
	images.value.splice(index, 1);
};

// save upload
const save = async () => {
	if (images.value.length > 0) {
		isLoading.value = true;
		for (let img of images.value) {
			const imageItem = img as ImageItem;
			if (imageItem.size && imageItem.id !== 1) {
				try {
					const res = await uploadFile(imageItem);
					imageItem.id = 1;
				} catch (error) {
					imageItem.id = 2;
				}
			}
		}
		ElMessage({
			message: "👍 zo'r ketti",
			type: "success",
			plain: true,
		});
		
		isLoading.value = false;
	} else {
		ElMessage.error('Please, add any file", "danger');
	}
};
defineExpose({
	handleFile,

});
</script>

<style lang="scss" scoped></style>

import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import MultipleUpload from "../MultipleUpload.vue";

describe("MultipleUpload", (test) => {

	test("check to snapshot MultipleUpload", async () => {
		const wrapper = mount(MultipleUpload, {
			props: { maxSize: 4, maxFileCount: 4, isMultiple: true,fileType: "text/plain" },
		});
		expect(wrapper.html()).toMatchSnapshot();
	});

	//  count error
	test("should show an error message", async () => {
		const wrapper = mount(MultipleUpload, {
			props: { maxSize: 20, maxFileCount: 1, isMultiple: true ,fileType: "text/plain"},
		});
		const inputElement = wrapper.find('input[type="file"]').element as HTMLInputElement;
		const file1 = new File(["foo"], "foo.txt", {
			type: "text/plain",
		});
		const file2 = new File(["moo"], "moo.txt", {
			type: "text/plain",
		});
		const mockFileList = Object.create(inputElement.files);
		mockFileList[0] = file1;
		mockFileList[1] = file2;
		Object.defineProperty(mockFileList, "length", { value: 2 });
		(wrapper.getCurrentComponent().exposed as any).handleFile({
			target: { files: mockFileList },
		});
		await wrapper.vm.$nextTick();
		const card = wrapper.findAll(".dates");
		expect(card).toHaveLength(1);
	});

	// elemen tcount ok
	test("should render isMultiplee input with OK", async () => {
		const wrapper = mount(MultipleUpload, {
			props: { maxSize: 20, maxFileCount: 3, isMultiple: true,fileType: "text/plain"},
		});
		const inputElement = wrapper.find('input[type="file"]').element as HTMLInputElement;
		const file1 = new File(["foo"], "foo.txt", {
			type: "text/plain",
		});
		const file2 = new File(["moo"], "moo.txt", {
			type: "text/plain",
		});
		const mockFileList = Object.create(inputElement.files);
		mockFileList[0] = file1;
		mockFileList[1] = file2;
		Object.defineProperty(mockFileList, "length", { value: 2 });
		(wrapper.getCurrentComponent().exposed as any).handleFile({
			target: { files: mockFileList },
		});
		await wrapper.vm.$nextTick();
		const card = wrapper.findAll(".dates");
		expect(card).toHaveLength(2); 

		expect(wrapper.find("label").attributes("title")).toBe("");
	});

	//  max size error
	test("should render isMultiplee input  when siz is high", async () => {
		const wrapper = mount(MultipleUpload, {
			props: { maxSize: 3, maxFileCount: 1, isMultiple: true,fileType: "text/plain" },
		});
		const inputElement = wrapper.find('input[type="file"]').element as HTMLInputElement;
		const file1 = new File(["fooof"], "foo.txt", {
			type: "text/plain",
		});

		const mockFileList = Object.create(inputElement.files);
		mockFileList[0] = file1;
		Object.defineProperty(mockFileList, "length", { value: 1 });
		(wrapper.getCurrentComponent().exposed as any).handleFile({
			target: { files: mockFileList },
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".clickCard").attributes("title")).toBe("error");
	});

	// max size ok
	test("should render isMultiplee input  when size is normal", async () => {
		const wrapper = mount(MultipleUpload, {
			props: { maxSize: 4, maxFileCount: 1, isMultiple: true,fileType: "text/plain" },
		});
		const inputElement = wrapper.find('input[type="file"]').element as HTMLInputElement;
		const file1 = new File(["foo"], "foo.txt", {
			type: "text/plain",
		});

		const mockFileList = Object.create(inputElement.files);
		mockFileList[0] = file1;
		Object.defineProperty(mockFileList, "length", { value: 1 });
		(wrapper.getCurrentComponent().exposed as any).handleFile({
			target: { files: mockFileList },
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".clickCard").attributes("title")).toBe("");
	});

    // isMultiple
	test("multipil true false comes from the prescription", async () => {

		const wrapper = mount(MultipleUpload, {
			props: { maxSize: 3, maxFileCount: 2, isMultiple: false,fileType: "text/plain" },
		});

		const inputElement = wrapper.find('input[type="file"]').element as HTMLInputElement;
		
		const file1 = new File(["fooof"], "foo.txt", {
			type: "text/plain",
		});

		const file = new File(["fooof"], "foo.txt", {
			type: "text/plain",
		});
		
		const mockFileList = Object.create(inputElement.files);
		mockFileList[0] = file1;
		mockFileList[0] = file;

		Object.defineProperty(mockFileList, "length", { value: 1 });
		(wrapper.getCurrentComponent().exposed as any).handleFile({
			target: { files: mockFileList },
		});
		await wrapper.vm.$nextTick();
		expect(wrapper.find(".clickCard").attributes("title")).toBe("error");
	 });

});

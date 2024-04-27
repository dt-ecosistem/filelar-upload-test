import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import SingleUpload from "../SingleUpload.vue";

describe("SingleUpload", (test) => {

    // Hajmi juda katta
   test("should render error message with text 'Size is too high'", async () => {
    const wrapper = mount(SingleUpload, { props: { maxSize: 1,typesSingle:'text/plain' } });
    const inputElement = wrapper.find('input[type="file"]')
     .element as HTMLInputElement;
    const file = new File(["ffo"], "foo.txt", {
      type: "text/plain",
    });
    const mockFileList = Object.create(inputElement.files);
    mockFileList[0] = file;
    Object.defineProperty(mockFileList, "length", { value: 1 });

    (wrapper.getCurrentComponent().exposed as any).handleSingil({
      target: { files: mockFileList },
    });
 
    await wrapper.vm.$nextTick();

    expect(wrapper.find("label").attributes("title")).toBe("Size is too high");
  });

   // hajmi kichik file
   test("should render a file input with OK", async () => {
    const wrapper = mount(SingleUpload, { props: { maxSize: 4 ,typesSingle:'application/zip'} });
    const inputElement = wrapper.find('input[type="file"]')
      .element as HTMLInputElement;
    const file = new File(["fo"], "foo.txt", {
      type: "application/zip",
    });

    const mockFileList = Object.create(inputElement.files);
    mockFileList[0] = file;
    Object.defineProperty(mockFileList, "length", { value: 1 });

    (wrapper.getCurrentComponent().exposed as any).handleSingil({
      target: { files: mockFileList },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find("label").attributes("title")).toBe("");
  });
 
   // types 
  test("It is true that type comes from prescription", async () => {
    const wrapper = mount(SingleUpload, { props: { maxSize: 4 ,typesSingle:'application/zip'} });
    const inputElement = wrapper.find('input[type="file"]')
      .element as HTMLInputElement;
    const file = new File(["fo"], "foo.txt", {
      type: "application/zip",
    });

    const mockFileList = Object.create(inputElement.files);
    mockFileList[0] = file;
    Object.defineProperty(mockFileList, "length", { value: 1 });

    (wrapper.getCurrentComponent().exposed as any).handleSingil({
      target: { files: mockFileList },
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.find("label").attributes("title")).toBe("");
  });

   test("check to snapshot SingleUpload", async () => {
    const wrapper = mount(SingleUpload, { props: { maxSize: 4,typesSingle:'application/zip' } });
    expect(wrapper.html()).toMatchSnapshot();
  });

   

 
});
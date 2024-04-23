import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import SingleUpload from "../SingleUpload.vue";

describe("SingleUpload", (test) => {

    test("katta hajimli file'", async () => {
        const wrapper = mount(SingleUpload, { props: { maxSize: 1 } });
        const inputElement = wrapper.find('input[type="file"]')
            .element as HTMLInputElement;
        const file = new File(["foo"], "foo.txt", {
            type: "text/plain",
        });
        const mockFileList = Object.create(inputElement.files);
        mockFileList[0] = file;
        Object.defineProperty(mockFileList, "length", { value: 1 });

        (wrapper.getCurrentComponent().exposed as any).handleSingil({
            target: { files: mockFileList },
        });
        // console.log(wrapper.getCurrentComponent().exposed.getData());
        await wrapper.vm.$nextTick();

        expect(wrapper.find("label").attributes("title")).toBe("Size is too high");
    });

    test("tog'ri file", async () => {
        const wrapper = mount(SingleUpload, { props: { maxSize: 4 } });
        const inputElement = wrapper.find('input[type="file"]')
            .element as HTMLInputElement;
        const file = new File(["foo"], "foo.txt", {
            type: "text/plain",
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

    // filelarni tekshiradi
    test("fayillarni tekshirish", () => {
        const wrapper = mount(SingleUpload, {props: {maxSize: 4, maxElementCount: 4}});
        expect(
            (wrapper.getCurrentComponent().exposed as any).getFileTpes("video/")
        ).toBe("/video-icon.jpg");
        expect(
            (wrapper.getCurrentComponent().exposed as any).getFileTpes("audio/")
        ).toBe("/audio-icon.jpg");
        expect(
            (wrapper.getCurrentComponent().exposed as any).getFileTpes(
                "application/pdf"
            )
        ).toBe("https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w");
        expect(
            (wrapper.getCurrentComponent().exposed as any).getFileTpes(
                "application/zip"
            )
        ).toBe("https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png");
        expect(
            (wrapper.getCurrentComponent().exposed as any).getFileTpes(
                "application/sql"
            )
        ).toBe(
            "https://www.shareicon.net/data/2015/09/07/97430_document_512x512.png"
        );
        expect(
            (wrapper.getCurrentComponent().exposed as any).getFileTpes("text/html")
        ).toBe(
            "https://cdn4.iconfinder.com/data/icons/smashicons-file-types-flat/56/22_-_HTML_File_Flat-512.png"
        );
        expect(
            (wrapper.getCurrentComponent().exposed as any).getFileTpes("unknown")
        ).toBe("https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png");
    });


    test("file types", async () => {
        const wrapper = mount(SingleUpload, { props: { typesSingle: "application/zip" } });
        const inputElement = wrapper.find('input[type="file"]')
            .element as HTMLInputElement;
        const file = new File(["foo"], "foo.zip", {
            type: "text/plain",
        });

        const mockFileList = Object.create(inputElement.files);
        mockFileList[0] = file;
        Object.defineProperty(mockFileList, "length", { value: 1 });

        (wrapper.getCurrentComponent().exposed as any).handleSingil({
            target: { files: mockFileList },
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.find("label").attributes("title")).toBe('');
    });



});
import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import MultipleUpload from "../MultipleUpload.vue";

describe("MultipleUpload", (test) => {

  //  files ga hato jonatish
  test("files ga hato jonatish", async () => {
    const wrapper = mount(MultipleUpload, {
      props: {maxElementCount: 1, maxSize: 20},
    });

    const inputElement = wrapper.find('input[type="file"]')
        .element as HTMLInputElement;
    const file1 = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });

    const file2 = new File(["moo"], "moo.txt", {
      type: "text/plain",
    });
    const mockFileList = Object.create(inputElement.files);
    mockFileList[0] = file1;
    mockFileList[1] = file2;
    Object.defineProperty(mockFileList, "length", {value: 2});
    (wrapper.getCurrentComponent().exposed as any).handleFile({
      target: {files: mockFileList},
    });

    await wrapper.vm.$nextTick();
    const card = wrapper.findAll(".card");
    expect(card).toHaveLength(1);

  });

  // fayillarni tekshirish
  test("fayillarni tekshirish", () => {
    const wrapper = mount(MultipleUpload, {props: {maxSize: 4, maxElementCount: 4}});
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

  //  fileni togri jonatish
  test("fileni togri jonatish", async () => {
    const wrapper = mount(MultipleUpload, {
      props: {maxElementCount: 3, maxSize: 20},
    });
    const inputElement = wrapper.find('input[type="file"]')
        .element as HTMLInputElement;
    const file1 = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const file2 = new File(["moo"], "moo.txt", {
      type: "text/plain",
    });
    const mockFileList = Object.create(inputElement.files);
    mockFileList[0] = file1;
    mockFileList[1] = file2;
    Object.defineProperty(mockFileList, "length", {value: 2});
    (wrapper.getCurrentComponent().exposed as any).handleFile({
      target: {files: mockFileList},
    });
    await wrapper.vm.$nextTick();
    const card = wrapper.findAll(".card");
    expect(card).toHaveLength(2);

    expect(wrapper.find("label").attributes("title")).toBe("");
  });


  test("multipley", async () => {
    const wrapper = mount(MultipleUpload, {
      props: {multipile: true},
    });
    const paragraphElement = wrapper.find('.hello').element as HTMLParagraphElement;
    expect(paragraphElement.textContent).toBe('.hello');
  });
});


  // max size (propis)    👍
    // max fule (propis)  👍
    // iz mutipl (propis)
    // file types         👍
    //  res api



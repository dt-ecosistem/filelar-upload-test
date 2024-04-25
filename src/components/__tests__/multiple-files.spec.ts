import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import MultipleUpload from "../MultipleUpload.vue";
import {nextTick} from "vue";

describe("MultipleUpload", (test) => {

  // snapshot
  test('should render File input', () => {
    const wrapper = mount(MultipleUpload)

    expect(wrapper.find('input').html()).matchSnapshot()
  })

  // fayillarni tekshirish
  test("checking for inbo come-in file", () => {
    const wrapper = mount(MultipleUpload, );

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

  // maxsizda katta file yuklasa error beradi
  test('max size I will not be mistaken if I load a large file', async () => {
    const wrapper = mount(MultipleUpload, {
      props: {
        maxSize: 3
      }

    })
    const inputElement = wrapper.find('input[type="file"]').element as HTMLInputElement
    const file = new File(['22hh'], 'foo.txt', {
      type: 'text/plain'
    })
    const mockFileList = Object.create(inputElement.files)
    mockFileList[0] = file
    Object.defineProperty(mockFileList, 'length', { value: 1 })
    ;(wrapper.getCurrentComponent().exposed as unknown as any).handleFile({
      target: { files: mockFileList }
    })
    await nextTick()

    const errorMessageElement = wrapper.find('p[data-test-error-message]')

    expect(errorMessageElement.exists()).toBe(true)
  })

  // maxsizda hacha file yuklasa true chiiqshu kerak
  test('maxSize va kam fayli yuklasa rost chisain ', async () => {
    const wrapper = mount(MultipleUpload, {
      props: {
        maxSize: 5
      }

    })
    const inputElement = wrapper.find('input[type="file"]').element as HTMLInputElement
    const file = new File(['22'], 'foo.txt', {
      type: 'text/plain'
    })
    const mockFileList = Object.create(inputElement.files)
    mockFileList[0] = file
    Object.defineProperty(mockFileList, 'length', { value: 1 })
    ;(wrapper.getCurrentComponent().exposed as unknown as any).handleFile({
      target: { files: mockFileList }
    })
    await nextTick()

    const errorMessageElement = wrapper.find('p[data-test-true]')

    expect(errorMessageElement.exists()).toBe(true)

  })









});

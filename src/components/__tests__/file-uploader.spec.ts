import { describe } from 'vitest'
import { mount } from '@vue/test-utils'
import MultipleUpload from '../MultipleUpload.vue'
describe('FileUploader', test => {
  test('should render a file input', () => {
    const wrapper = mount(MultipleUpload)
    const inputElement = wrapper.find('input[type="file"]').element as HTMLInputElement
    const file = new File(["foo"], "foo.txt", {
      type: "text/plain",
    });
    const mockFileList = Object.create(inputElement.files);
    mockFileList[0] = file;
    Object.defineProperty(mockFileList, "length", { value: 1 });

    (wrapper.getCurrentComponent().exposed as unknown as any).onFileChange({target: {files: mockFileList}});

  })

})

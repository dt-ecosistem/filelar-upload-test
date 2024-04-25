import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import SingleUpload from "../SingleUpload.vue";
import {nextTick} from "vue";

describe("SingleUpload", (test) => {

    // maxsizda katta file yuklasa error beradi
    test('max size I will not be mistaken if I load a large file', async () => {
        const wrapper = mount(SingleUpload, {
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
        ;(wrapper.getCurrentComponent().exposed as unknown as any).handleSingil({
            target: { files: mockFileList }
        })
        await nextTick()

        const errorMessageElement = wrapper.find('p[data-test-error-message]')

        expect(errorMessageElement.exists()).toBe(true)
    })

    // maxsizda hacha file yuklasa true chiiqshu kerak
    test('maxSize va kam fayli yuklasa rost chisain ', async () => {
        const wrapper = mount(SingleUpload, {
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
        ;(wrapper.getCurrentComponent().exposed as unknown as any).handleSingil({
            target: { files: mockFileList }
        })
        await nextTick()

        const errorMessageElement = wrapper.find('p[data-test-true]')

        expect(errorMessageElement.exists()).toBe(true)

    })



});
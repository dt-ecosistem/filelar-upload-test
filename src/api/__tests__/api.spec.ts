import { describe, expect, test, vi } from "vitest";
import { mount } from "@vue/test-utils";
import {uploadFile} from "../upload";
import {AxiosResponse} from "axios";


describe("MultipleUpload", () => {
    test("apiga sorov jonatish", async () => {
        const payload = {
            image: "image.png",
            file: new File(["foo"], "foo.txt", { type: "text/plain" }),
            size: true,
            id: 1,
        };

        const response: AxiosResponse<any, any> | null = await uploadFile(payload);

        expect(response!.status).toBe(200);

    });
});

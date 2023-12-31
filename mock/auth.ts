import type { MockMethod } from "vite-plugin-mock"
import { LoginRequest } from "@/types/auth"
import type { BackendServiceResult } from "@/types/service";
import { randomStr } from "../src/utils/common/random"

export default [
    {
        url: "/api/login",
        method: "post",
        response: (data: LoginRequest): BackendServiceResult => {
            const { code, originCode} = data.body
            if (code !== originCode) {
                return {
                    code: 201,
                    data: null,
                    message: "验证码不正确"
                }
            }
            return {
                code: 200,
                message: "success",
                data: {
                    token: 19990816
                }
            }
        }
    },
    {
        url: "/api/getCode",
        method: "get",
        response: (): BackendServiceResult => {
            const code = randomStr("0123456789", 4);
            return {
                code: 200,
                message: "success",
                data: {
                    code
                }
            }
        }
    },
] as MockMethod[]
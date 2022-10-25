import { request } from "@/utils/http"

/** 获取登录验证码 */
export function getList() {
    return request({
        url: "/list",
        method: "get"
    })
}

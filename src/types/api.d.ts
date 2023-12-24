// 这个文件专门定义请求参数的类型，和响应的类型

// 验证码的响应类型约束
interface CaptchaAPIRes {
    msg: string;
    img: string;
    code: number;
    captchaEnabled: boolean;
    uuid: string;
}
// 登录请求参数类型约束
interface LoginRequest {
    [k: string]: string;  // 这是一个索引签名（index signature），表示该接口可以包含任意数量的字符串类型属性。这允许在登录请求中包含额外的键值对，其键和值都必须是字符串类型。
    name: string;
    password: string;
    code: string;
    originCode: string;   // 验证码矫正
}

/** 后端接口返回的类型结构 */
interface BackendServiceResult {
    code: number; // 状态码
    data: any;
    message: string
}

export { CaptchaAPIRes, LoginRequest, BackendServiceResult}
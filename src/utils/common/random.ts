//获取随机验证码字符串
export const randomStr = (chars: string, length: number) => {
    let str: string = "";
    for(let i = 0; i < length; i++){
        str += chars.charAt(Math.floor(Math.random() * length))
    }
    return str
}
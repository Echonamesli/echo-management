//import "./comp1.scss"  //这是全局引入，跟在main引入没区别，会污染其它组件

//react的scss模块化引入
import styles from "./login.module.scss"

import initLoginBg from "./init.ts"

import { ChangeEvent, useEffect, useState } from "react"
import { Button, Input, Space, message } from "antd"

import "./login.less"

import { CaptchaAPI, LoginAPI } from "@/request/api"

import { useNavigate } from "react-router-dom"

const login = () => {
    const navigateTo = useNavigate()

    //加载完这个组件之后,加载背景
    useEffect(() => {
        initLoginBg();
        //同时我们希望窗口大小改变之后也能初始化
        window.onresize = function () { initLoginBg() }
        //获取验证码图片
        getCaptchaImg()
    }, [])
    const [usernameVal, setusernameVal] = useState("")
    const [passwordVal, setPasswordVal] = useState("")
    const [captchaVal, setCaptchaVal] = useState("")
    //验证码图片变量
    const [captchaImg, setCaptchaImg] = useState("")

    //<HTMLInputElement> 是对泛型 ChangeEvent 进行具体化，告诉 TypeScript 这个事件对象是针对 <input> 元素的
    const usernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setusernameVal(e.target.value)
    }
    const passwordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value)
    }
    const captchaChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCaptchaVal(e.target.value)
    }
    const goToLogin = async () => {
        //console.log(usernameVal, passwordVal, captchaVal)
        //验证是否有空值
        if (!usernameVal.trim() || !passwordVal.trim() || !captchaVal.trim()) {
            message.warning("请输入完整信息！")
            return
        }
        let loginAPIRes = await LoginAPI({
            username: usernameVal,
            password: passwordVal,
            code: captchaVal,
            uuid: localStorage.getItem("uuid") as string
        })
        //console.log(loginAPIRes);
        if(loginAPIRes.code === 200){
            message.success("登陆成功")
            //保存token
            localStorage.setItem("echo-react-management-token", loginAPIRes.token)
            //跳转到page1
            navigateTo("/page1")
            //删除本地保存中的uuid（这个uuid是陪伴验证码的好朋友）
            localStorage.removeItem("uuid")
        }
    }
    const getCaptchaImg = async () => {
        //let captchaAPIRes:CaptchaAPIRes = await CaptchaAPI()
        let captchaAPIRes = await CaptchaAPI()
        //console.log(CaptchaAPIRes);
        setCaptchaImg("data:image/gif;base64," + captchaAPIRes.img)
        //本地保存uuid，给登陆的时候用
        localStorage.setItem("uuid", captchaAPIRes.uuid)
    }
    return (
        <div className={styles.loginPage}>
            {/* 存放背景 */}
            <canvas id="canvas" style={{ display: "block" }}></canvas>
            {/* 注意 第二个类名前要有空格 */}
            <div className={styles.loginBox + " myLoginBox"}>
                <div className={styles.title}>
                    <h1>李佳晓&nbsp;&nbsp;通用后台管理系统</h1>
                    <p>happy everyday</p>
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <Input placeholder="用户名" onChange={usernameChange} />
                        <Input.Password placeholder="密码" onChange={passwordChange} />
                        <div className="captchaBox">
                            <Input placeholder="验证码" onChange={captchaChange}></Input>
                            <div className="captchaImg" onClick={getCaptchaImg}>
                                <img height="38" src={captchaImg} alt="" />
                            </div>
                        </div>
                        <Button type="primary" className="loginBtn" block onClick={goToLogin}>
                            登录
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default login
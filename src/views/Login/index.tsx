//import "./comp1.scss"  //这是全局引入，跟在main引入没区别，会污染其它组件

//react的scss模块化引入
import styles from "./login.module.scss"

import initLoginBg from "./init.ts"

import { ChangeEvent, useEffect, useState } from "react"
import { Button, Input, Space } from "antd"

import "./login.less"

import { CaptchaAPI } from "@/request/api"
import { log } from "console"


const login = () => {
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
    //<HTMLInputElement> 是对泛型 ChangeEvent 进行具体化，告诉 TypeScript 这个事件对象是针对 <input> 元素的
    const usernameChange = (e:ChangeEvent<HTMLInputElement>) => {
        setusernameVal(e.target.value)
    }
    const passwordChange = (e:ChangeEvent<HTMLInputElement>) => {
        setPasswordVal(e.target.value)
    }
    const captchaChange = (e:ChangeEvent<HTMLInputElement>) => {
        setCaptchaVal(e.target.value)
    }
    const goToLogin = () => {
        console.log(usernameVal, passwordVal, captchaVal)
    }
    const getCaptchaImg = async () => {
        let CaptchaAPIRes = await CaptchaAPI()
        console.log(CaptchaAPIRes);
        
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
                        <Input placeholder="用户名" onChange={usernameChange}/>
                        <Input.Password placeholder="密码" onChange={passwordChange}/>
                        <div className="captchaBox">
                            <Input placeholder="验证码" onChange={captchaChange}></Input>
                            <div className="captchaImg" onClick={getCaptchaImg}>
                                <img src="" alt="" />
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
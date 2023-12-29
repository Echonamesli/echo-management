//import "./comp1.scss"  //这是全局引入，跟在main引入没区别，会污染其它组件

//react的scss模块化引入
import styles from "./login.module.scss"

import initLoginBg from "./init.ts"

import { useEffect } from "react"
import { Button, Input, Space, message } from "antd"

import "./login.less"

import { useNavigate } from "react-router-dom"
import { fetchGetCode, fetchLogin } from "@/service/api/auth.ts"
import { LoginRequest } from "@/types/auth"
import RandomCode from "./identifyCodes.ts"
import { setToken } from "@/utils/auth"

const login = () => {
    const navigateTo = useNavigate()

    const loginInfo: LoginRequest = {
        name: "",
        password: "",
        code: "",
        originCode: "",
    };

    //加载完这个组件之后,加载背景
    useEffect(() => {
        initLoginBg();
        //同时我们希望窗口大小改变之后也能初始化
        window.onresize = function () { initLoginBg() }
        //获取并绘制验证码图片
        const fetchCode = async () => {
            const { data } = await fetchGetCode()
            if (data) {
                //画验证码
                RandomCode(data.code)
                loginInfo.originCode = data.code
            }
        }
        fetchCode()
    }, [])

    const userChange = (value: string, name: string) => {
        loginInfo[name] = value
    }

    //点击验证码图片会重新绘制验证码画布
    const onRefresh = async () => {
        const { data } = await fetchGetCode()
        if (data) {
            RandomCode(data.code)
            loginInfo.originCode = data.code
        }
    }

    const goToLogin = async () => {
        //验证是否有空值
        let empty: string = ""
        Object.keys(loginInfo).reverse().forEach((key) => {
            if (!loginInfo[key]) {
                empty = getWarning(key)
            }
        })
        if (empty) {
            return message.warning(empty)
        }
        const { data, error } = await fetchLogin(loginInfo)
        if (error) {
            onRefresh()
        } else {
            setToken(data.token)
            //取消之前设置的 onresize 事件处理函数
            window.onresize = null
            navigateTo("/")
        }
    }
    return (
        <div className={styles.loginPage}>
            {/* 存放背景 */}
            <canvas id="bg-canvas" style={{ display: "block" }}></canvas>
            {/* 注意 第二个类名前要有空格 */}
            <div className={styles.loginBox + " myLoginBox"}>
                <div className={styles.title}>
                    <h1>李佳晓&nbsp;&nbsp;通用后台管理系统</h1>
                    <p>happy everyday</p>
                    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                        <Input placeholder="用户名" onChange={(e) => userChange(e.target.value, "name")} />
                        <Input.Password placeholder="密码" onChange={(e) => userChange(e.target.value, "password")} />
                        <div className={styles.captchaBox}>
                            <Input placeholder="验证码" onChange={(e) => userChange(e.target.value, "code")}></Input>
                            <canvas
                                id="code-canvas"
                                width="100"
                                height="32"
                                onClick={onRefresh}
                                style={{ cursor: "pointer" }}
                            ></canvas>
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

function getWarning(type: string) {
    switch (type) {
        case "name":
            return "请输入名字"
            break
        case "password":
            return "请输入密码"
            break
        case "code":
            return "请输入验证码"
            break
        default:
            return ""
    }
}
export default login
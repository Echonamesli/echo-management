//import "./comp1.scss"  //这是全局引入，跟在main引入没区别，会污染其它组件

//react的scss模块化引入
import styles from "./login.module.scss"

import initLoginBg from "./init.ts"

import { useEffect } from "react"
import { Button, Input, Space } from "antd"

import "./login.less"

const view = () => {
    //加载完这个组件之后,加载背景
    useEffect(() => {
        initLoginBg();
        //同时我们希望窗口大小改变之后也能初始化
        window.onresize = function () { initLoginBg() }
    }, [])
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
                        <Input placeholder="用户名" />
                        <Input.Password placeholder="密码" />
                        <div className="captchaBox">
                            <Input placeholder="验证码"></Input>
                            <div className="captchaImg">
                                <img src="" alt="" />
                            </div>
                        </div>
                        <Button type="primary" className="loginBtn" block>
                            登录
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default view
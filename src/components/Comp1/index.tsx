//import "./comp1.scss"  //这是全局引入，跟在main引入没区别，会污染其它组件

//react的scss模块化引入
import styles from "./comp1.module.scss"

function Comp1(){
    return(
        <div className={styles.box}>
            <p>武松</p>
        </div>
    )
}

export default Comp1
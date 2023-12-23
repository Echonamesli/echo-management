import NumStatus from "@/store/NumStatus"
import { useSelector,useDispatch } from "react-redux"

const View = () => {
    //利用useSelector钩子获取仓库数据
    const { num } = useSelector((state:RootState) => ({
        num: state.NumStatusReducer.num
    }))
    const { myarr } = useSelector((state:RootState) => ({
        myarr: state.ArrStatusReducer.myarr
    }))
    //修改仓库数据
    const dispatch = useDispatch()

    const changeNum = () => {
        dispatch({ type: "add1" })
    }
    const changeNum2 = () => {
        dispatch({ type: "add2", val:10 })
    }
    const asyncChangeNum = () => {
        dispatch(NumStatus.asyncActions.asyncAdd1)
    }
    const changeArr = () => {
        dispatch({type : "myarrpush", val: 666})
    }
    return (
        <div className='about'>
            <p>我是page1</p>
            <p>{num}</p>
            <button onClick={changeNum}>num加1</button>
            <br />
            <button onClick={changeNum2}>num加10</button>
            <br />
            <button onClick={asyncChangeNum}>num异步按钮</button>
            <br />
            <br />
            <button onClick={changeArr}>往数组push元素</button>
            <p>{myarr}</p>
        </div>
    )
}

export default View
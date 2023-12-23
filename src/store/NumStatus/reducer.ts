import handleNum from "./index"

const defaultState = {
    //num:handleNum.state.num  //这种需要写很多次，累赘
    ...handleNum.state,   // 直接解构
}

//每次组件调用dispatch就会触发这个reducer函数
let reducer = (state = defaultState, action: { type: string, val: number }) => {
    let newState = JSON.parse(JSON.stringify(state))
    // switch (action.type) {
    //     case handleNum.add1:
    //         handleNum.actions[handleNum.add1](newState, action)
    //         break
    //     case handleNum.add2:
    //         handleNum.actions[handleNum.add2](newState, action)
    //         break
    //     default:
    //         break
    // }
    for (let key in handleNum.actionNames) {
        if (action.type === handleNum.actionNames[key]) {
            handleNum.actions[handleNum.actionNames[key]](newState, action)
            break
        }
    }
    return newState
}

export default reducer

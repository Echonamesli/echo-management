import handleArr from "./index"

const defaultState = {
    ...handleArr.state
}

//每次组件调用dispatch就会触发这个reducer函数
let reducer = (state = defaultState, action: { type: string, val: number }) => {
    let newState = JSON.parse(JSON.stringify(state))
    // switch (action.type) {
    //     case handleArr.myarrpush:
    //         handleArr.actions[handleArr.myarrpush](newState, action)
    //         break
    //     default:
    //         break
    // }
    for (let key in handleArr.actionNames) {
        if (action.type === handleArr.actionNames[key]) {
            handleArr.actions[handleArr.actionNames[key]](newState, action)
            break
        }
    }
    return newState
}

export default reducer

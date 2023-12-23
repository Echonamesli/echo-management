export default {
    state: {
        num: 20
    },
    //actions只放同步方法
    actions:{
        add1(newState:{num:number}, action:{type:string}){
            newState.num++
        },
        add2(newState:{num:number}, action:{type:string, val:number}){
            newState.num+=action.val
        }
    },
    //asyncActions只放异步方法
    asyncActions:{
        asyncAdd1(dispatch:Function){
            setTimeout(() => {
                //异步里调同步
                dispatch({type:"add1"})
            }, 1000);
        }
    },
    //名字统一管理
    // add1:"add1",
    // add2:"add2"
    actionNames:{
        add1:"add1",
        add2:"add2"
    }
}
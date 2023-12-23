export default {
    state: {
        myarr: [10,20,30]
    },
    actions:{
        myarrpush(newState:{myarr:number[]}, action:{type:string,val:number}){
            newState.myarr.push(action.val)
        }
    },
    //名字统一管理
    actionNames:{
        myarrpush:"myarrpush"
    }
}
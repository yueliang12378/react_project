import {CREATUSER,DELETE_USER_INFO} from '../action_types'

//尝试从localStorage中读取之前保存的信息
let user = JSON.parse(localStorage.getItem('user'))
let token = localStorage.getItem('token')
//给一个初始化的值
const init_data = {
    user:user || '',
    token: token || '',
    isLogin: !!(user && token)  //因为这里要user && token都存在，我在这里先取反一次将其转换成boolean值，再取反一次，将其布尔值变成真实的
}

export const testReducer = (prevState=init_data,action)=>{
    const {type,data} = action;
    let newData;
    switch(type){
        case CREATUSER:
            const {user,token} = data
            //修改登录成功的状态
            newData =  {user,token,isLogin:true};
            return newData;
        case DELETE_USER_INFO:
            newData = {user:'',token:'',isLogin:false};
            return newData;
        default:
            return prevState;
    }
}
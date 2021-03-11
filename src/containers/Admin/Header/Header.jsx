import React, {Component} from 'react';
//放大，缩小图标
import {FullscreenOutlined,FullscreenExitOutlined } from '@ant-design/icons'
import {Button} from 'antd';
//引入withRouter将，header组件变成路由组件
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
//引入可以全屏的库
import screenFull from 'screenfull'
//用于操作时间的库
import dayjs from 'dayjs'
import {createDeleteUserInfoAction} from "../../../redux/actions/login_action";
import {reqUsWeather} from '../../../api/index'
import './header.less'
@connect(
    state=> ({userInfo:state.userInfo}),
    {
        deleteUserInfo:createDeleteUserInfoAction
    }
)
//要先包裹成路由组件，在包裹connect(原则上 connect要一直在最外层)
@withRouter
class Header extends Component {

    //state 用于存储数据，(存储一些状态(例如当前是否全屏了))
    state = {
        //设置一开始默认不是全屏的
        isFull:false,
        //设置显示的日期的
        date: dayjs().format('YYYY年 MM月DD日 HH:mm:ss'),
        //天气信息
        weatherInfo:{}
    }


    //挂载的钩子
    componentDidMount = ()=>{
        //给screenfull绑定监听,因为用户不止是可以点击按钮全屏(取消全屏)，还可以按F11
        //所以要用它得监听事件(更多的自己去看GitHub)
        screenFull.on('change', () => {
            let isFull = !this.state.isFull
            this.setState({isFull})
        })
        //一秒更新一次时间
        this.timer = setInterval(()=>{
            this.setState({date: dayjs().format('YYYY年 MM月DD日 HH:mm:ss')});
        },1000)
        //调用获得天气的函数
        this.getWeather()
    }
    //组件将要卸载
    componentWillUnmount = ()=>{
        //清除定时器
        clearInterval(this.timer)
    }

    //用户获得天气信息的函数
    getWeather = async()=>{
        const  result = await reqUsWeather()
        this.setState({weatherInfo:result})
    }

    fullScreen = ()=>{
        //这个是他文档里面定义的切换函数，(切换是否全屏的)
        screenFull.toggle()
    }

    //退出登录
    logOut = ()=>{
        //触发redux删除所保存的用户信息
        this.props.deleteUserInfo()
    }

    render() {
        let {user} = this.props.userInfo
        const {weatherInfo} = this.state
        return (
            <header className='header'>
                <div className="header-top">
                    <Button size ='small' onClick={this.fullScreen}>
                        {/*根据是否全屏而改变字体图标的样式*/}
                        {this.state.isFull?<FullscreenExitOutlined />:<FullscreenOutlined/>}
                    </Button>
                    <span className="username">欢迎，{user.username}</span>
                    <Button type="link" onClick={this.logOut} >退出登录</Button>
                </div>
                <div className="header-bottom">

                    <div className="header-bottom-left">
                        {/*包裹了withRouter这个高阶组件之后，header组件就有了
                        路由组件的api，获得当前的路径(动态切换)*/}
                        {this.props.location.pathname}
                    </div>
                    <div className="header-bottom-right">
                        {this.state.date}
                        &nbsp; {weatherInfo.city}&nbsp;&nbsp;&nbsp;{weatherInfo.weather}&nbsp;&nbsp;&nbsp;温度：{weatherInfo.temperature+'°'}
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
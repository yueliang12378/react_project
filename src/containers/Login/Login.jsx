import React from 'react';
import {Form,Input,Button} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import {message} from "antd";
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../api'
import './login.less'
import logo from '../../assets/images/logo.png'
import {createSaveUser} from '../../redux/actions/login_action'



function Login(props) {
//表单提交
    const  onFinish =  (data) => {
        //好像不用阻止表单默认提交了，这个组件帮你弄好了
        const {username, password} = data;
        form.validateFields().then(
             async values=>{
                //登录请求的封装
               let result = await reqLogin(username, password)
                 //从响应中获取：请求状态、错误信息、数据
                 const {status,msg,data} = result
                 if(status === 0){
                     console.log(data)
                    //1.服务器返回的user信息，还有token交由redux管理
                     props.saveUserInfo(data)
                     //2.转跳到页面，不需要再回退(直接用replace)
                     props.history.replace('/admin')
                 }else{
                     //若登录失败
                     message.warning(msg,1)
                 }
             }
        ).catch(error=>{
            console.log(error)
        })
    }

    const [form] = Form.useForm(); //用于引入form

    //密码的  自定义验证
   const  pwd_validator =(_,value)=>{
        if(!value){
            return Promise.reject(new Error('密码不能为空'));
        }else if(value.length>12){
            return Promise.reject(new Error('密码必须小于等于12位'));
        }else if(value.length<4){
            return Promise.reject(new Error('密码必须大于等于4位'));
        }else if(!(/^\w+$/.test(value))){
            return Promise.reject(new Error('密码必须由字母、数字、下划线组成'));
        }else{
            return Promise.resolve();
        }
}

        /*
        用户名/密码的的合法性要求
          1). 必须输入
          2). 必须大于等于4位
          3). 必须小于等于12位
          4). 必须是英文、数字或下划线组成
         */
        if(props.isLogin){ //如果登录了，则重定向到Admin页面
            //记得要return
            return <Redirect to='/admin'/>
        }

        return (
            <div className='login'>
                <header>
                    <img src={logo} alt="logo"/>
                    <h1>商品管理系统</h1>
                </header>
                <section>
                    <h1>用户登录</h1>
                {/*    引入的form表单*/}
                    <Form
                        name="normal_login"
                        className="login-form"
                        // initialValues={{ remember: true }}
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: '用户名不能为空！' },
                                { max: 12, message: '用户名必须不大于12位' },
                                { min: 4, message: '用户名必须不小于4！' },
                                { pattern: /^\w+$/,message: '用户名必须由英文、数字或下划线组成'}
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { validator: pwd_validator},
                                ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary"  htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>

                </section>
            </div>
        );
    }



export default connect(
    //这里用不到这个属性
    state => ({isLogin:state.userInfo.isLogin}),
    {
        saveUserInfo:createSaveUser,
    }
)(Login);
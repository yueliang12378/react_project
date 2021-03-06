import React, {Component} from 'react';
import {connect} from 'react-redux'
import {Redirect,Switch,Route} from 'react-router-dom'
import {Layout} from 'antd'
import {createDeleteUserInfoAction} from '../../redux/actions/login_action'
import './css/admin.less'
import Header from './Header/Header'
import Home from '../../components/home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
const { Footer, Sider, Content } = Layout;
@connect(
    //取出是否登录了
    state=>({userInfo:state.userInfo})
    ,{
        deleteUserInfo:createDeleteUserInfoAction
    })

class Admin extends Component {



    render() {
        const {isLogin} =this.props.userInfo

        //如果没有登录
        if(!isLogin){
        // 重定向到login页面
           return <Redirect to='/login'/>
        }
        return (
                <Layout className="admin">
                    <Sider className='sider'>Sider</Sider>
                    <Layout>
                        <Header className="header">
                        </Header>
                        {/*展示区*/}
                        <Content>
                            <Switch>
                                <Route path="/admin/home" component={Home}/>
                                <Route path="/admin/prod_about/category" component={Category}/>
                                <Route path="/admin/prod_about/product" component={Product}/>
                                <Route path="/admin/user" component={User}/>
                                <Route path="/admin/role" component={Role}/>
                                <Route path="/admin/charts/bar" component={Bar}/>
                                <Route path="/admin/charts/line" component={Line}/>
                                <Route path="/admin/charts/pie" component={Pie}/>
                                <Redirect to="/admin/home"/>
                            </Switch>
                        </Content>
                        <Footer className="footer">
                            推荐使用谷歌浏览器，获取最佳用户体验
                        </Footer>
                    </Layout>
                </Layout>
        );
    }
}

export default Admin
// export default connect(
//     //取出是否登录了
//     state=>({userInfo:state.userInfo})
//     ,{
//         deleteUserInfo:createDeleteUserInfoAction
//     })(Admin);
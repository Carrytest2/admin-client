import React, { Component } from 'react'
import memoryUtils from '../../utils/memoryUtils'
import {Redirect,Switch,Route}  from 'react-router-dom'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'
import Header from '../../components/header'

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const {  Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    
    render() {
        const user = memoryUtils.user

        if (!user._id){
             //如果id为空 说明没有登陆   就自动跳转到登陆页面
               return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height:'100%'}}>
            <Sider>
              <LeftNav />
            </Sider>

            <Layout>
              <Header />
              <Content style={{ margin:20, background:'white'}}>
                  <Switch>
              <Route path='/admin/home' component={Home}/>
              <Route path='/admin/category' component={Category}/>
              <Route path='/admin/product' component={Product}/>
              <Route path='/admin/role' component={Role}/>
              <Route path='/admin/user' component={User}/>
              <Route path='/admin/charts/bar' component={Bar}/>
              <Route path='/admin/charts/line' component={Line}/>
              <Route path='/admin/charts/pie' component={Pie}/>
              <Redirect to='/admin/home'/>
                  </Switch>
                
                </Content>
              <Footer style={{textAlign:"center" ,color:'#aaaaaa'}}>
              推荐使用谷歌浏览器，可以获得更佳页面操作体验
              </Footer>
            </Layout>
          </Layout>
        )
        
    }
}

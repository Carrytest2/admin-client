import React, { Component } from 'react'
import { Form, Icon, Input, Button ,message} from 'antd'
import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils';
import {Redirect}  from 'react-router-dom'
import {saveUser} from '../../utils/storageUtils'
const Item = Form.Item



 class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        // const values = this.props.form.getFieldsValue()
        // const username = this.props.form.getFieldValue('username')
        // const password = this.props.form.getFieldValue('pwd')
        // console.log(values,username,pwd)

        // alert('发送登录的ajax请求')
        this.props.form.validateFields(async (err,values)=>{
                  if(!err){
                       //alert('发送请求成功')
                      const result = await reqLogin(values)
                       if(result.status===0){
                           //1 获取用户数据
                           const user = result.data

                           //2 保存到local
                           //localStorage.setItem('user_key',JSON.stringify(user))
                           saveUser(user)
                           memoryUtils.user = user
                           //3 跳转到admin路由
                           this.props.history.replace('/admin')
                       }else{
                            message.error(result.msg)
                       }
                  }
        })
      };

      validatepwd = (rule,value,callback)=>{
        value = value.trim()
        if(!value){
            callback('密码必须输入')
        }else if(value.length<4){
            callback('密码不能小于4位')
        }else if(value.length>12){
            callback('密码不能大于12位')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
          callback('密码必须是英文、数字或下划线组成') 
        }else{
          callback()
        }
      }

    render() {
      if(memoryUtils.user._id){
        return <Redirect to='/admin'/>
      }
      const getFieldDecorator = this.props.form.getFieldDecorator
        return (
            <div className="login">
                <div className='login-header'>
                    <img src={logo} alt="logo"/>
                    <h1>后台管理系统</h1>
                </div>
                <div className='login-content'>
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
        <Item>
          {
            getFieldDecorator('username',{
              //initialValue: 'admin',
             rules: [
                {required: true, whitespace:true, message: '用户名必须输入!' },
                {min:4,message:'用户名不能小于4位'},
                {max:12,message:'用户名不能大于12位'},
                {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文,数字或下划线组成'}
              ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
            )
          }
        
        </Item>




        <Item>
          {
            getFieldDecorator('password',{
              //initialValue: 'admin',
                     rules:[
                       
                       {validator: this.validatepwd}
                     ]
            })(
              <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
            )
          }
        
        </Item>





        <Item>
          
          <Button type="primary" htmlType="submit" className="login-form-button">
           登  录
          </Button>
         
        </Item>
      </Form>
                </div>
            </div>
        )
    }
}

const WrappedLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedLoginForm
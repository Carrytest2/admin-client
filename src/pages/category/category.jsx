import React, { Component } from 'react'
import { Card ,Button,Icon,Table,Modal,message} from 'antd'
import  LinkButton from '../../components/link-button'
import {reqCategorys,reqAddCategory,reqUpdateCategory} from '../../api/index'
import CategoryForm from './category-from'


/**
 * 分类管理
 */

// const dataSource = [
//   {
//     "_id": "5c2ed631f352726338607046",
//     "name": "分类001"
//   },
//   {
//     "_id": "5c2ed647f352726338607047",
//     "name": "分类2"
//   },
//   {
//     "_id": "5c2ed64cf352726338607048",
//     "name": "1分类3"
//   }
// ];



export default class Category extends Component {
  showUpdate=(category)=>{
    this.category = category
    this.setState({
      showStatus:2
    })
  }

  initColumns=()=>{
     this.columns = [
      {
        title: '分类的名称名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        width:300,
        title: '操作',
         render: (category)=> <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
      },
      
    ];
  }

  setForm = (form) => {
    this.form = form
  }

  // 修改分类
  updateCategory=()=>{
    this.form.validateFields(async (error, values) => {
      if (!error) {
        // 重置输入框的值(变为初始值)
        this.form.resetFields()

        // 隐藏添加界面
        this.setState({
          showStatus: 0
        })

        const categoryId = this.category._id
        const categoryName = values.categoryName
        const result = await reqUpdateCategory(categoryId, categoryName)
        if (result.status===0) {
          message.success('修改分类成功')
          // 显示最新列表
          this.getCategorys()
        } else {
          message.error('修改失败: ' + result.msg)
        }
      }
    })
  }

// 添加分类
addCategory=()=>{
  this.form.validateFields(async (error, values) => {
    if (!error) { // 验证通过了

      

       // 重置输入框的值(变为初始值)
       this.form.resetFields()

      // 隐藏添加界面
      this.setState({
        showStatus:0
      })

      // 2. 收集数据
      const categoryName = values.categoryName

      // 3. 发请求添加
      const result = await reqAddCategory(categoryName)
      // 4. 根据请求结果做不同处理
      if (result.status===0) {
        message.success('添加分类成功')
        // 显示最新列表
        this.getCategorys()
      } else {
        message.error('添加失败: ' + result.msg)
      }
    }
  })
}

//隐藏对话框
handleCancel=()=>{

   // 重置输入框的值(变为初始值)
   this.form.resetFields()

  this.setState({
    showStatus:0
  })
}


  componentWillMount(){

       this.initColumns()


  }


  getCategorys=async()=>{
    // 发请求钱loading 应为true
    this.setState({
      loading:true
    })
    const result =  await  reqCategorys()

    // 请求完 拿到数据 loading 行为false
    this.setState({
      loading:true
    })
           //判断是否请求到数据  
           if(result.status===0){
             const categorys = result.data
             this.setState({
              Categorys:categorys
             })
           }

           this.setState({
            loading:false
          })
  }

   componentDidMount(){
     //发送获取分类列表请求
     this.getCategorys()
   }

  state = {
    Categorys:[],
    loading:false,
    showStatus:0   // 都不显示    1，显示添加 ，2 显示修改
  }
  render() {

    const {Categorys,loading,showStatus} =this.state
    const category = this.category || {}

    const extra =(
      <Button type='primary' onClick={()=>this.setState({showStatus:1})}>
        <Icon type='plus'/>
        添加
      </Button>
    )
    return (
      <Card  extra={extra}>
              <Table
              bordered = {true}
              rowKey="_id"
              loading={loading}
              pagination={ {pageSize:5} }
               dataSource={Categorys} columns={this.columns }
                />

      <Modal
          title="修改分类"
          visible={showStatus==2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
        >
          <CategoryForm categoryName={category.name} setForm={this.setForm}/>
        </Modal>


        <Modal
          title="添加分类"
          visible={showStatus==1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
        >
         <CategoryForm setForm={this.setForm}/>

        </Modal>

    </Card>
    )
  }
}

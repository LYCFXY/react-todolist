import React, {Component} from 'react';
import './UserDialog.css';
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud';

/*忘记密码组件*/
import ForgotPasswordForm from './ForgotPasswordForm';
/*登录注册互相切换组件*/
import SignInOrSignUp from './SignInOrSignUp';


export default class UserDialog extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedTab: 'signInOrSignUp',
            formData: {
                username: '',
                password: '',
                email: ''
            }
        }
    }

    render(){
      return (
          <div className="UserDialog-Wrapper">
              <div className="UserDialog-Wrapper-content">
                  <div className="left-img"><img src="http://s.gxtodo.com/dist/img/girls.png" alt=""/>
                  </div>
                  <div className="UserDialog">
                    {this.state.selectedTab === 'signInOrSignUp' ?
                    <SignInOrSignUp formData={this.state.formData}
                                    onSignUp={this.signUp.bind(this)}
                                    onSignIn={this.signIn.bind(this)}
                                    onChange={this.changeFormData.bind(this)}
                                    onForgotPassword={this.showForgotPassword.bind(this)} /> :
                    <ForgotPasswordForm
                                    formData={this.state.formData}
                                    value={this.state.formData.email}
                                    onChange={this.changeFormData.bind(this,event ,'email')}
                                    onClick={this.returnToSignIn.bind(this)}
                                    onSubmit={this.resetPassword.bind(this)} />}
                  </div>
              </div>
          </div>
      )
    }

    /*切换到登录注册页面 添加返回按钮 */
    returnToSignIn(e){
      e.preventDefault()
      e.stopPropagation()
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.selectedTab = 'signInOrSignUp'
      this.setState(stateCopy)
    }

    /* 重置密码触发leanCloud */
    resetPassword(e){
        e.preventDefault()
        e.stopPropagation()
        sendPasswordResetEmail(this.state.formData.email)
        alert("邮件已经发送, 请注意查收")
    }

    signUp(e){
        e.preventDefault()
        e.stopPropagation()
        let {email, username, password} = this.state.formData
        var reg =/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if(email.length === 0 || username.length ===0 || password.length ===0){
          alert('请填入完整信息')
          return
        };
        if(!reg.test(email)){
           alert("您输入的邮箱格式不正确")
           return
        }
        if(username.length<=3){
          alert("用户名必须大于三个字符")
          return
        }
        if(password.length<6){
          alert("密码必须不小于6个字符")
          return
        }

        let success = (user) =>{
            this.props.onSignUp.call(null, user)
        }
        let error = (error)=>{
            switch(error.code){
              case 200:
                alert('用户名或密码为空')
                break
              case 202:
                alert('用户名已经存在')
                break
              case 203:
                alert('此邮箱已经被注册')
                break
              case 502:
                alert('服务器正在维护中')
                break
              default:
                alert(error)
                break
            }
        }
        signUp(email, username, password, success, error)
    }

    signIn(e){
        e.preventDefault()
        e.stopPropagation()
        let {username, password} = this.state.formData

        if (username.length === 0 || password.length === 0) {
            alert('请完善登录信息')
            return
        }
        let success = (user)=>{
            this.props.onSignIn.call(null, user)
        }
        let error = (error)=>{
            /*alert(error)*/
            switch(error.code){
              case 210:
                alert('用户名与密码不匹配')
                break
              case 211:
                alert('用户名尚未注册')
                break
              default:
                alert(error)
                break
            }
        }
        signIn(username, password, success, error)
    }

    /* 点击忘记密码，重置密码页面出现 */
    showForgotPassword(e){
        e.preventDefault()
        e.stopPropagation()
        let stateCopy = JSON.parse(JSON.stringify(this.state));
        stateCopy.selectedTab = 'forgotPassword'
        this.setState(stateCopy)
    }

    /*输入框onChange触发，改变setState*/
    changeFormData(e, key){
        e.preventDefault()
        e.stopPropagation()
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)
    }

}
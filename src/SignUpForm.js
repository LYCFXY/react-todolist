import React, {Component} from 'react';

export default class SignUpForm extends Component {
   render () {
     return (
       <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}>
            {/* 注册*/}
            <div className="row">
               <label className="input-name">邮箱:</label>
               <input className="input-style"
                      placeholder="请输入邮箱"
                      type="text"
                      value={this.props.formData.email}
                      onChange={this.props.onChange.bind(null, 'email')}/>
            </div>
            <div className="row">
               <label className="input-name">用户名:</label>
               <input className="input-style"
                      placeholder="请输入用户名"
                      type="text"
                      value={this.props.formData.username}
                      onChange={this.props.onChange.bind(null, 'username')}/>
               {/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
            </div>
            <div className="row">
               <label className="input-name">密码:</label>
               <input className="input-style" placeholder="请输入密码" type="password" value={this.props.formData.password}
                 onChange={this.props.onChange.bind(null, 'password')}/>
            </div>
            <div className="row actions">
               <button className="submit" type="submit">注册</button>
            </div>
       </form>
     )
    }
}
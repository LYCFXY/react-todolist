import React, {Component} from 'react';

export default class SignInForm extends Component {
  render () {
    return (
      <form className="signIn" onSubmit={this.props.onSubmit}> {/* 登录*/}
        <div className="row">
          <label className="input-name">用户名:</label>
          <input className="input-style"
                 placeholder="请输入用户名"
                 type="text"
                 value={this.props.formData.username}
                 onChange={this.props.onChange.bind(null, 'username')}/>
        </div>
        <div className="row">
          <label className="input-name">密码:</label>
          <input className="input-style"
                 type="password"
                 placeholder="请输入密码"
                 value={this.props.formData.password}
                 onChange={this.props.onChange.bind(null, 'password')}/>
        </div>
        <div className="row actions">
          <a className="forget" href="#" onClick={this.props.onForgotPassword}>忘记密码了？</a>
          <button className="submit" type="submit">登录</button>
        </div>
      </form>
    )
    }
}
import React, { Component } from 'react';

/*忘记密码组件*/
export default class ForgotPasswordForm extends Component {
    render(){
        return (
            <div className="forgotPassword">
                <form className="panes forgotPassword" onSubmit={this.props.onSubmit}>
                    <div className="row">
                        <label className="input-name">注册邮箱:</label>
                        <input type="text"
                               placeholder="请输入邮箱"
                               className="input-style"
                               value={this.props.formData.email}
                               onChange={this.props.onChange.bind(null, 'email')} />
                    </div>
                    <div className="row actions">
                        <button type="submit" className="submit">发送重置邮件</button>
                        <a className="forget" href="#" onClick={this.props.onClick}>返回登录</a>
                    </div>
                </form>
            </div>
        )
    }
}
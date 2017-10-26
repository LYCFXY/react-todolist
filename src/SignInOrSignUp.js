import React, { Component } from 'react';
/*注册组件*/
import SignUpForm from './SignUpForm';
/*登录组件*/
import SignInForm from './SignInForm';
/*登录与注册相互切换组件*/
import './SignInOrSignUp.css';
export default class SignInOrSignUp extends Component {
    /*初始化*/
    constructor(props){
        super(props)
        this.state = {
            selected: 'signUp',
            classIn: 'switch-signIn',
            classUp: 'switch-signUp',
            classActiveUp: 'active',
            classActive: false
        }
    }

    render (){
        return (
            <div className="signInOrSignUp">
                  <nav className="sign-wrap">
                      {/*<label>
                        <input type="radio" value="signUp"
                         checked={this.state.selected === 'signUp'}
                         onChange={this.switch.bind(this)} />
                         注册
                      </label>
                      <label>
                        <input type="radio" value="signIn"
                            checked={this.state.selected === "signIn"}
                            onChange={this.switch.bind(this)} />
                            登录
                      </label>
                    */}
                      <div data-value="signUp"
                           className={this.state.classUp + " " + this.state.classActiveUp}
                           onClick={this.switch.bind(this)}>
                           注册
                      </div>
                      <div data-value="signIn"
                          className={this.state.classIn + " " + this.state.classActiveIn}
                          onClick={this.switch.bind(this)}>
                          登录
                      </div>
                  </nav>
                  <div className="panes">
                          {/*注册组件引用*/}
                          {this.state.selected === 'signUp' ?
                            <SignUpForm formData={this.props.formData}
                              onSubmit={this.props.onSignUp}
                              onChange={this.props.onChange}
                            />
                            : null}

                          {/*登录组件引用*/}
                          {this.state.selected === 'signIn' ?
                            <SignInForm formData={this.props.formData}
                               onSubmit={this.props.onSignIn}
                               onChange={this.props.onChange}
                               onForgotPassword={this.props.onForgotPassword}/>
                            : null}
                  </div>
            </div>
        )
    }

    /* 点击现在注册登录，进行切换 */
    /*switch(e){
        this.setState({
            selected: e.target.value
        })
    }*/
    switch(e){
      if(e.target.dataset.value == "signUp"){
        this.setState({
            selected: e.target.dataset.value,
            classActiveUp: 'active',
            classActiveIn: false
        })
      }else{
        this.setState({
            selected: e.target.dataset.value,
            classActiveIn: 'active',
            classActiveUp: false
        })
      }
    }
}
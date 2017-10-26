import React, { Component } from 'react';
import 'normalize.css';
import './reset.css';
import './App.css';
import UserDialog from './UserDialog';
import TodoTnput from './TodoInput';
import TodoItem from './TodoItem';
import {getCurrentUser, signOut, TodoModel, signIn} from './leanCloud';

import Menu from './showMenu';
import {dropImage} from './images.js';


class App extends Component {
      constructor(props){
          super(props)
          this.state = {
            user: getCurrentUser() || {},
            newTodo: '',
            todoList: [],
            menu: false,
            menustatus: true
        }

        {/*实际上获取的 Todo 是「所有用户」创建的 Todo，而不是当前用户创建的 Todo。*/}
        let user = getCurrentUser()
        if(user){
          TodoModel.getByUser(user, (todos) =>{
            let stateCopy = JSON.parse(JSON.stringify(this.state))
            stateCopy.todoList = todos
            this.setState(stateCopy)
          })
          }
      }

      render() {
        {/*过滤，让没有删除的显现出来*/}
        let todos = this.state.todoList
        .filter((item)=>{
            console.log(item.deleted)
            return !item.deleted}
        )
        .map((item,index)=>{
            return (
              <li key={index}>
                  <TodoItem todo={item}
                   onToggle={this.toggle.bind(this)}
                   onDelete={this.delete.bind(this)}/>
              </li>
            )
        });

        return (
          <div className="app"  onClick={this.hideMenu.bind(this)}>
              <nav className="nav-wrap">
              <h2>to<span>Do</span>List</h2>
                <div className="navbar">
                  <div style={dropImage}
                       onClick={this.changeMenu.bind(this)}
                       className="name">
                       Hi! {this.state.user.username || '我'}的待办
                  </div>

                {this.state.menu ? <Menu
                      quit={this.state.user.id}
                      clickSingOut={this.signOut.bind(this)}
                      clickStatus={this.selectStatus.bind(this)} menustatus={this.state.menustatus} /> : null}

                </div>
              </nav>
              <div className="inputWrapper">
                  <TodoTnput
                   content={this.state.newTodo}
                   changeContent={this.changeText.bind(this)}
                   onSubmit={this.addTodo.bind(this)} />

              </div>
              <ol className="todoList">
                  {todos}
              </ol>
              {this.state.user.id ?
                null :
                <UserDialog
                 onSignUp={this.onSignUpOrSignIn.bind(this)}
                 onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
          </div>
        )
      }

      selectStatus (event){
        event.stopPropagation();
        event.preventDefault();
        if(event.target.dataset.status == 'finished'){
          let stateCopy = JSON.parse(JSON.stringify(this.state))
          stateCopy.menustatus = false
          this.setState(stateCopy)
        }else if(event.target.dataset.status == 'unfinished'){
          let stateCopy = JSON.parse(JSON.stringify(this.state))
          stateCopy.menustatus = true
          this.setState(stateCopy)
        }
      }

      changeMenu(event){
        event.preventDefault();
        event.stopPropagation();
        if(this.state.menu){
          let stateCopy = JSON.parse(JSON.stringify(this.state))
          stateCopy.menu = false
          this.setState(stateCopy)
        }else if(!this.state.menu){
          let stateCopy = JSON.parse(JSON.stringify(this.state))
          stateCopy.menu = true
          this.setState(stateCopy)
        }
      }

      hideMenu(){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.menu = false
        this.setState(stateCopy)
      }


      signOut(event){
        event.preventDefault;
        event.stopPropagation();
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = {}
        this.setState(stateCopy)
      }

      onSignUpOrSignIn(user){
        event.preventDefault;
        event.stopPropagation();
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.user = user
        this.setState(stateCopy)
      }

      /*删除一条信息*/
      delete(event, todo){
        event.preventDefault;
        event.stopPropagation();
        TodoModel.destroy(todo.id, () => {
          todo.deleted = true
          this.setState(this.state)
        })
      }

      toggle(e, todo){
        event.preventDefault;
        event.stopPropagation();
        let oldStatus = todo.status
        todo.status = todo.status === 'completed' ? '' : 'completed'
        TodoModel.update(todo, () => {
          this.setState(this.state)
        }, (error) => {
          todo.status = oldStatus
          this.setState(this.state)
        })
      }

      changeText(event){
        this.setState({
          newTodo: event.target.value
        });
      }

      /*增加一条todo,回车的时候触发*/
      addTodo(event){
        let newTodo = {
          title: event.target.value,
          status: null,
          deleted: false
        }

        TodoModel.create(newTodo, (id) => {
          newTodo.id = id
          this.state.todoList.push(newTodo)
          this.setState({
            newTodo: '',
            todoList: this.state.todoList
          })
          }, (error) => {
          console.log(error)
      })
      }
}

export default App


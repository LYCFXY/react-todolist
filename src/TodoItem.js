import React, { Component } from 'react';
import './TodoItem.css'
import {deleteImage} from './images.js';

export default class TodoItem extends Component {
    render(){
        return(
                <div className="TodoItem">
                    <input type="checkbox"
                     className="finished"
                     toggleChecked={this.props.todo.status === 'completed'}
                     onChange={this.toggle.bind(this)} />
                    <span className="title">{this.props.todo.title}</span>
                    <div style={deleteImage} className="delete" onClick={this.delete.bind(this)}></div>
                </div>
              )
    }
    delete(e){
        this.props.onDelete(e, this.props.todo)
    }

    toggle(e){
        this.props.onToggle(e, this.props.todo)
    }
}
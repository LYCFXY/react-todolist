import React, {Component} from 'react';
import './TodoInput.css'

export default class TodoTnput extends Component {
    constructor(props){
        super(props);
        this.enterChange = this.enterChange.bind(this);
        this.changeText = this.changeText.bind(this);
    }

    render(){
        return( <div className="enter-text">
                    <input id="todoInputText" type="text"
                    className="todoInput"
                    value={this.props.content}
                    onChange={this.changeText}
                    onKeyPress={this.enterChange} />
                    <label className="todoInputStyle" for="todoInputText">
                        <span className="input-content">add task</span>
                    </label>
                </div>
                )
    }

    changeText(e){
        this.props.changeContent(e);
    }

    enterChange(e){
        if(e.key === 'Enter'){
            console.log('用户按回车了');
            this.props.onSubmit(e);
        }
    }
}


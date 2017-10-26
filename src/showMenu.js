import React, { Component } from 'react';
import {quitImage, finishedImageActive, finishedImage, unfinishedImage, unfinishedImageActive} from './images.js';

class Menu extends Component {
    constructor(props){
        super(props)
    }

    render(){

        let active = {
          color: '#00caff'
        }

        let clickActive = {
          ...unfinishedImageActive, ...active
        }

        let clickFinished = {
          ...finishedImageActive, ...active
        }

        return(
                <div className="hidden-nav">
                  <a
                    onClick = {this.props.clickStatus}
                    data-status = "unfinished"
                    style={ this.props.menustatus ? clickActive :unfinishedImage}
                     href="#">未完成
                  </a>
                  <hr/>
                  <a
                    onClick = {this.props.clickStatus}
                    style={this.props.menustatus ? finishedImage :clickFinished }
                     data-status = "finished"
                     href="#">已经完成
                  </a>
                  <hr/>
                  <a onClick={this.props.clickSingOut} style={quitImage} href="#">{this.props.quit ? <span className="quit" onClick={this.props.clickSingOut}>退出</span>:null}</a>
                  <hr/>
                </div>
            )
    }
}

export default Menu;
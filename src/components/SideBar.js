import React, { Component} from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types';
import views from '../views'
import lightBox from'../images/lightBox.png'
import darkBox from'../images/darkBox.png'

// Custom Styles
import '../css/qi.css'

class SideBar extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return(
      <div style={{paddingTop:10, position: 'relative'}}>
        <div style={{fontSize:'36px', color:'#A0A0A0', fontWeight:400, paddingTop:18, paddingBottom:40, textAlign:"center"}}>S</div>
        <div style={{textAlign:"center", mareginTop:20, marginBottom:20}}>
          <img src={darkBox}/>
        </div>
        <div style={{textAlign:"center", mareginTop:20, marginBottom:20}}>
          <img src={lightBox}/>
        </div>
        <div style={{textAlign:"center", mareginTop:20, marginBottom:20}}>
          <img src={lightBox}/>
        </div>
        <div style={{textAlign:"center", mareginTop:20, marginBottom:20}}>
          <img src={lightBox}/>
        </div>
        <div style={{textAlign:"center", mareginTop:20, marginBottom:20}}>
          <img src={lightBox}/>
        </div>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(SideBar))

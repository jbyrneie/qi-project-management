import React, { Component} from 'react'
import { observer, inject } from 'mobx-react'
import {navigate} from '../lib/utils'

// Custom Styles
import '../css/qi.css'

// MUI
import { Home, PieChart, Search, Keyboard, ThumbUp } from '@material-ui/icons'

class SideBar extends Component {
  render() {
    return(
      <div style={{paddingTop:10, position: 'relative'}}>
        <div style={{fontSize:'36px', color:'#A0A0A0', fontWeight:400, paddingTop:18, paddingBottom:40, textAlign:"center"}} onClick={navigate.bind(this, 'home')}>S</div>
        <div style={{textAlign:"center"}}>
          <Home color={this.props.myTasks?"primary":"disabled"} style={{fontSize:36, marginTop: 20, marginBottom:20}} onClick={navigate.bind(this, 'home')}/>
        </div>
        <div style={{textAlign:"center"}}>
          <Search color={this.props.feasability?"primary":"disabled"} style={{fontSize:36, marginTop: 20, marginBottom:20}} />
        </div>
        <div style={{textAlign:"center"}}>
          <Keyboard color={this.props.programming?"primary":"disabled"} style={{fontSize:36, marginTop: 20, marginBottom:20}} />
        </div>
        <div style={{textAlign:"center"}}>
          <ThumbUp color={this.props.fielding?"primary":"disabled"} style={{fontSize:36, marginTop: 20, marginBottom:20}} />
        </div>
        <div style={{textAlign:"center"}}>
          <PieChart color={this.props.reporting?"primary":"disabled"} style={{fontSize:36, marginTop: 20, marginBottom:20}} />
        </div>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(SideBar))

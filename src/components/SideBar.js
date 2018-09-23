import React, { Component} from 'react'
import { observer, inject } from 'mobx-react'
import views from '../views'
import lightBox from'../images/lightBox.png'
import darkBox from'../images/darkBox.png'

// Custom Styles
import '../css/qi.css'

// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

class SideBar extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  _navigate(route, event) {
    console.log('_navigate clicked');
    const {router: {goTo}} = this.props.store
    goTo(views[route], {}, this.props.store)
  }

  render() {
    const boxStyle = {
      width: '100%',
      paddingTop: 40,
    }

    return(
      <div className='sidebar-content'>
        <Card style={{boxShadow: 0}}>
          <CardContent>
            <div style={{paddingTop:10, position: 'relative'}}>
              <div style={{fontSize:'36px', color:'#A0A0A0', fontWeight:400, paddingBottom:40}}>QI</div>
              <img src={this.props.myTasks?darkBox:lightBox} alt='box' style={boxStyle} onClick={this._navigate.bind(this, 'home')}/>
              <img src={this.props.surveyLead?darkBox:lightBox} alt='box' style={boxStyle} onClick={this._navigate.bind(this, 'surveyLead')}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(SideBar))

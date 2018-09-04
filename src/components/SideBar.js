import React, { Component} from 'react'
import { observer, inject } from 'mobx-react'
import lightBox from'../images/lightBox.png'

// Custom Styles
import '../css/qi.css'

// MUI
import {Card, CardText} from 'material-ui/Card'

class SideBar extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const boxStyle = {
      width: '100%',
      paddingTop: 40
    }
    
    return(
      <div className='sidebar-content'>
        <Card>
          <CardText>
            <div style={{paddingTop:10, position: 'relative'}}>
              <div style={{fontSize:'36px', color:'#A0A0A0', fontWeight:400, paddingBottom:40}}>QI</div>
              <img src={lightBox} alt='box' style={boxStyle}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
              <img src={lightBox} alt='box' style={boxStyle}/>
            </div>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(SideBar))

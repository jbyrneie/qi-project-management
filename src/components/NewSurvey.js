import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from './AppBar'
import SideBar from './SideBar'

// Custom Styles
import '../css/qi.css'

class NewSurvey extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    return(
      <div className='container clearfix'>
        <SideBar/>
        <div className='main-content'>
          <AppBar title='New Survey'/>
          <div className='inner-content'>
            <div className='center-content'>
              <p>Create a new Survey</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(NewSurvey))

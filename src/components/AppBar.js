import React, { Component } from 'react'
import { observer, inject} from 'mobx-react'
import views from '../views'
import _ from 'lodash'

// MUI
import Button from '@material-ui/core/Button'

// Custom styles
import '../css/fonts.css'
import '../css/qi.css'

class AppBar extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return(
      <div className='container, appBar'>
        <div>
          <span className='appBarTitle'>{this.props.title}</span>
        </div>
        {this.props.subTitle?
          <div>
            <span className='appBarSubTitle'>{this.props.subTitle}</span>
          </div>
          :
          null
        }
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(AppBar))

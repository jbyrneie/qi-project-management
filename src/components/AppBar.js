import React, { Component } from 'react'
import { observer, inject} from 'mobx-react'
import views from '../views'

// MUI
import Button from '@material-ui/core/Button'
import {newSurveyButton} from '../styles/Buttons';

// Custom styles
import '../css/fonts.css'
import '../css/qi.css'

class AppBar extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  _surveyLead(event) {
    console.log('New Survey clicked....');
    const {router: {goTo}} = this.props.store
    goTo(views.surveyLead, {}, this.props.store)
  }

  render() {
    return(
      <div className='container, appBar'>
        <div>
          <span className='appBarTitle'>{this.props.title}</span>
          {this.props.newSurvey?
            <div className='navBar'>
              <div className='appBarButton'>
                <Button variant="contained" style={newSurveyButton} onClick={this._surveyLead.bind(this)}>
                  New Lead
                </Button>
              </div>
            </div>
            :
            null
          }
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

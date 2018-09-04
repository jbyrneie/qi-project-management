import React, { Component } from 'react'
import { observer, inject} from 'mobx-react'
import views from '../views'
import _ from 'lodash'

// MUI
import RaisedButton from 'material-ui/RaisedButton'
import {newSurveyButton, commonButton} from '../styles/Buttons';

// Custom styles
import '../css/fonts.css'
import '../css/qi.css'

class AppBar extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  _newSurvey(event) {
    console.log('New Survey clicked....');
    const {router: {goTo}} = this.props.store
    goTo(views.newSurvey, {}, this.props.store)
  }

  render() {
    return(
        <div className='container, appBar'>
          <span className='appBarTitle'>{this.props.title}</span>
          {this.props.newSurvey?
            <div className='navBar'>
              <div className='appBarButton'>
                <RaisedButton
                  backgroundColor={newSurveyButton.backgroundColor}
                  labelStyle={_.assign(newSurveyButton.labelStyle, commonButton.labelStyle)}
                  label='New Survey'
                  onClick={this._newSurvey.bind(this)}
                />
              </div>
            </div>
            :
            null
          }
        </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(AppBar))

import React, { Component } from 'react'
import { observer, inject} from 'mobx-react'
import views from '../views'
import _ from 'lodash'

// MUI
import Button from '@material-ui/core/Button'
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

  _surveyLead(event) {
    console.log('New Survey clicked....');
    const {router: {goTo}} = this.props.store
    goTo(views.surveyLead, {}, this.props.store)
  }

  render() {
    const styles = theme => ({
      button: {
        margin: theme.spacing.unit,
        backgroundColor: newSurveyButton.backgroundColor
      },
    });

    return(
        <div className='container, appBar'>
          <span className='appBarTitle'>{this.props.title}</span>
          {this.props.newSurvey?
            <div className='navBar'>
              <div className='appBarButton'>
                <Button variant="contained" style={newSurveyButton} onClick={this._surveyLead.bind(this)}>
                  New Survey
                </Button>
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

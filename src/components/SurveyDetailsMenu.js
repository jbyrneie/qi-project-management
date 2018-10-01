import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import {navigate} from '../lib/utils'

// MUI
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// Custom Styles
import '../css/qi.css'

class SurveyDetailsMenu extends Component {
  render() {
    let tab = this.props!=='undefined'?this.props.tab:'quote';
    console.log('tab: ', tab);

    return(
      <div style={{borderBottom: '3px solid #e9ebed', marginBottom: 35}}>
        <Tabs
          value={tab}
          indicatorColor="primary"
        >
          <Tab value="quote" style={{fontWeight: tab==="quote"?900:100}} label="Quote" onClick={navigate.bind(this, 'quote')}/>
          <Tab value="settings" style={{fontWeight: tab==="settings"?900:100}} label="Settings" onClick={navigate.bind(this, 'settings')}/>
          <Tab value="invites" style={{fontWeight: tab==="invites"?900:100}} label="Invites" onClick={navigate.bind(this, 'invites')}/>
          <Tab value="performance" style={{fontWeight: tab==="performance"?900:100}} label="Performance" />
          <Tab value="activity" style={{fontWeight: tab==="activity"?900:100}} label="Activity" />
        </Tabs>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(SurveyDetailsMenu))

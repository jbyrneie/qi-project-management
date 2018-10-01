import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from './AppBar'
import SideBar from './SideBar'

// MUI
import Grid from '@material-ui/core/Grid';

// Custom Styles
import '../css/qi.css'

class Fielding extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    return(
        <div className='container clearfix'>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <SideBar fielding={true}/>
          </Grid>
          <Grid item xs={11}>
          <div className='main-content'>
            <AppBar title='Fielding'/>
            <div className='inner-content'>
              <div className='center-content' style={{width:'100%'}}>
                <div>Fielding stuff n stuff</div>
              </div>
            </div>
          </div>
          </Grid>
        </Grid>
        </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Fielding))

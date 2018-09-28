import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from './AppBar'
import SideBar from './SideBar'
import MyTasks from './MyTasks'
import _ from 'lodash'
import views from '../views'

// MUI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

// Custom Styles
import '../css/qi.css'

class Home extends Component {
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
    const myTasks = this.props.store.qiStore.myTasks
    const styles = theme => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
    });

    return(
      <div className='container clearfix'>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <SideBar myTasks={true}/>
          </Grid>
          <Grid item xs={11}>
            <div className='main-content'>
              <AppBar title='Surveys'/>
                <div className='center-content'>
                  Home TBD
                </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Home))

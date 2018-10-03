import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from './AppBar'
import SideBar from './SideBar'
import MyTasks from './MyTasks'
import ProgrammingTasks from './ProgrammingTasks'
import FeasabilityTasks from './FeasabilityTasks'
import HomeDefault from './HomeDefault'
import HomeByPerson from './HomeByPerson'
import _ from 'lodash'
import {STATUS} from '../lib/utils'

// MUI
import Grid from '@material-ui/core/Grid';
import { Search } from '@material-ui/icons'

// Custom Styles
import '../css/qi.css'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { groupBy: '0' }
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  _handleStatusBy(event) {
    console.log('_handleStatusBy: ', event.target.value);
    this.setState({groupBy: event.target.value})
  }

  _filterBy(event) {
    console.log('_handleStatusBy: ', event.target.value);
    this.setState({filterBy: event.target.value})
  }

  render() {
    console.log('groupBy: ', this.state.groupBy);
    return(
      <div className='container clearfix'>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <SideBar myTasks={true}/>
          </Grid>
          <Grid item xs={11}>
            <div className='main-content'>
              <AppBar title='Surveys' newSurvey={true}/>
                <div className='center-content'>
                  <div style={{display: 'inline-block'}}>
                    <div className="inner-addon left-addon" style={{display: 'inline-block', marginRight: 40}}>
                      <Search className="glyphicon glyphicon-search" />
                      <input type="text" onChange={this._filterBy.bind(this)} className="form-control" style={{fontSize:18, color: '#A0A0A0', height: 40, marginBottom:20, paddingLeft:40}} placeholder="Filter by Client, ID, Title" />
                    </div>
                    <select onChange={this._handleStatusBy.bind(this)} style={{display: 'inline-block', height: 50, fontSize: 18, color: '#A0A0A0', backgroundColor: '#fff', paddingLeft:5, paddingRight:5, border: '1px solid #ccc', borderRadius: 4}}>
                      <option value='0'>Group by Status</option>
                      <option value='1'>Group by Person</option>
                    </select>
                  </div>
                  <MyTasks />
                  {this.state.groupBy==='0'?
                    <HomeDefault/>
                    :
                    <HomeByPerson/>
                  }
                </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Home))

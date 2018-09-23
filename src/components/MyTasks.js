import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from './AppBar'
import SideBar from './SideBar'
import _ from 'lodash'
import views from '../views'

// MUI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Custom Styles
import '../css/qi.css'

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  _surveyDetails(tasks, event) {
    console.log('_surveyDetails: %s %s', JSON.stringify(event), JSON.stringify(tasks));
    const {router: {goTo}} = this.props.store
    goTo(views.newSurvey, {}, this.props.store)
  }

  render() {
    const myTasks = this.props.store.qiStore.myTasks

    return(
        <div className='container clearfix'>
          <SideBar myTasks={true}/>
          <div className='main-content'>
            <AppBar title='My Tasks' newSurvey={true}/>
            <div className='inner-content'>
              <div className='center-content'>
                <Table selectable={true} onRowSelection={this._surveyDetails.bind(this, myTasks)}>
                  <TableHead style={{fontWeight: '900', color: 'yellow'}}
                    displaySelectAll={false}
                    adjustForCheckbox={false}
                    enableSelectAll={false}
                  >
                    <TableRow>
                      <TableCell style={{fontWeight: '900', color:'black'}}>PROJECT</TableCell>
                      <TableCell style={{fontWeight: '900', color:'black'}}>STATUS</TableCell>
                      <TableCell style={{fontWeight: '900', color:'black'}}>DAYS IN STATUS</TableCell>
                      <TableCell style={{fontWeight: '900', color:'black'}}>ACTION</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    displayRowCheckbox={false}
                    deselectOnClickaway={true}
                    showRowHover={true}
                  >
                    {myTasks.map((task, index) => (
                      <TableRow key={index}>
                        <TableCell style={{color: '#A0A0A0'}}>{task.project}</TableCell>
                        <TableCell style={{color: '#A0A0A0'}}>{task.status}</TableCell>
                        <TableCell style={{color: '#A0A0A0'}}>{task.daysInStatus}</TableCell>
                        <TableCell style={{color: '#A0A0A0'}}>{task.action}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Profile))

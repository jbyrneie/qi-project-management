import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Fade from 'react-fade-opacity';
import AppBar from './AppBar'
import SideBar from './SideBar'
import _ from 'lodash'
import views from '../views'

// MUI
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

// Custom Styles
import '../css/qi.css'

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      in: true,
      interval: 20,
      delay: 50
    };
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  _surveyDetails(tasks, event) {
    console.log('_surveyDetails: %s %s', JSON.stringify(event), JSON.stringify(tasks));
    /*
    const {router: {goTo}} = this.props.store
    goTo(views.newSurvey, {}, this.props.store)
    */
  }
  
  render() {
    const surveyInfo = this.props.store.qiStore.surveyInfo.info
    const myTasks = [
                        {
                          project: 'John Smith',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Randal White',
                          status: 'Unemployed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Stephanie Sanders',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Steve Brown',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Joyce Whitten',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Samuel Roberts',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Adam Moore',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                      ];
                          
    return(
      <Fade {...this.state}>
        <div className='container clearfix'>
          <SideBar/>
          <div className='main-content'>
            <AppBar title='My Tasks' newSurvey={true}/>
            <div className='inner-content'>
              <div className='center-content'>
                <Table selectable={true} onRowSelection={this._surveyDetails.bind(this, myTasks)}>
                  <TableHeader style={{fontWeight: '900', color: 'yellow'}} 
                    displaySelectAll={false} 
                    adjustForCheckbox={false}
                    enableSelectAll={false}
                  >
                    <TableRow>
                      <TableHeaderColumn style={{fontWeight: '900', color:'black'}}>PROJECT</TableHeaderColumn>
                      <TableHeaderColumn style={{fontWeight: '900', color:'black'}}>STATUS</TableHeaderColumn>
                      <TableHeaderColumn style={{fontWeight: '900', color:'black'}}>DAYS IN STATUS</TableHeaderColumn>
                      <TableHeaderColumn style={{fontWeight: '900', color:'black'}}>ACTION</TableHeaderColumn>
                    </TableRow>
                  </TableHeader>
                  <TableBody
                    displayRowCheckbox={false}
                    deselectOnClickaway={true}
                    showRowHover={true}
                  >
                    {myTasks.map((task, index) => (
                      <TableRow key={index}>
                        <TableRowColumn style={{color: '#A0A0A0'}}>{task.project}</TableRowColumn>
                        <TableRowColumn style={{color: '#A0A0A0'}}>{task.status}</TableRowColumn>
                        <TableRowColumn style={{color: '#A0A0A0'}}>{task.daysInStatus}</TableRowColumn>
                        <TableRowColumn style={{color: '#A0A0A0'}}>{task.action}</TableRowColumn>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Profile))

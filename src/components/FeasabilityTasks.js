import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import views from '../views'
import {surveyDetails, taskTitle} from '../lib/utils'
import _ from 'lodash'

// MUI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

// Custom Styles
import '../css/qi.css'

class FeasabilityTasks extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    const tasks = this.props.tasks

    return(
      <Card style={{marginBottom:30}}>
        <CardHeader
          title={taskTitle('Feasability', tasks.length)}
        />
        <CardContent>
          <Table selectable="true">
            <TableHead style={{fontWeight: '900', color: 'yellow'}}
              displayselectall="false"
              adjustforcheckbox="false"
              enableselectall="false"
            >
              <TableRow>
                <TableCell style={{fontWeight: '900', color:'black'}}>PROJECT</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>TIME LEFT</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>DAYS</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>TEAM</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              displayrowcheckbox="false"
              deselectonclickaway="true"
              showrowhover="true"
            >
              {tasks.map((task, index) => (
                <TableRow key={index} onClick={surveyDetails.bind(this, index, tasks)}>
                  <TableCell style={{color: '#A0A0A0'}}>{task.project}</TableCell>
                  <TableCell style={{color: '#A0A0A0'}}>5 days</TableCell>
                  <TableCell style={{color: '#A0A0A0'}}>2</TableCell>
                  <TableCell style={{color: '#A0A0A0'}}>Assign</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(FeasabilityTasks))

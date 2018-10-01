import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import views from '../views'
import moment from 'moment'
import numeral from 'numeral'
import _ from 'lodash'
import {surveyDetails, taskTitle, statusButton} from '../lib/utils'

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

class TasksbyPerson extends Component {
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
          title={taskTitle(this.props.person, tasks.length)}
        />
        <CardContent>
          <Table selectable="true">
            <TableHead style={{fontWeight: '900'}}
              displayselectall="false"
              adjustforcheckbox="false"
              enableselectall="false"
            >
              <TableRow>
                <TableCell style={{fontWeight: '900', color:'black'}}>PROJECT</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}></TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>REVENUE</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>INVITE</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>START</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>OQ</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>SO</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>DROPOUT</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>COMPLETE</TableCell>
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
                    <TableCell style={{color: '#A0A0A0'}}>{statusButton(task.status.statusId)}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>${numeral(task.revenue).format('0,0')}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{task.status.stats.invite}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{task.status.stats.start}&nbsp;&nbsp;{Math.round((task.status.stats.start/task.status.stats.invite)*100)}%</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{task.status.stats.oq}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{task.status.stats.ir}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{task.status.stats.dropout}&nbsp;&nbsp;{Math.round((task.status.stats.dropout/task.status.stats.invite)*100)}%</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{task.status.stats.complete}&nbsp;&nbsp;{Math.round((task.status.stats.complete/task.status.stats.invite)*100)}%</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(TasksbyPerson))

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import views from '../views'
import moment from 'moment'
import numeral from 'numeral'
import _ from 'lodash'
import {daysLeft, daysDuration, surveyDetails, taskTitle, asigneesAbbreviation} from '../lib/utils'

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

class ProgrammingTasks extends Component {
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
          title={taskTitle('Programming', tasks.length)}
        />
        <CardContent>
          <Table selectable="true">
            <TableHead style={{fontWeight: '900', color: 'yellow'}}
              displayselectall="false"
              adjustforcheckbox="false"
              enableselectall="false"
            >
              {this.props.summary?
                <TableRow>
                  <TableCell style={{fontWeight: '900', color:'black'}}>PROJECT</TableCell>
                  <TableCell style={{fontWeight: '900', color:'black'}}>TEAM</TableCell>
                  <TableCell style={{fontWeight: '900', color:'black'}}>TIME LEFT</TableCell>
                  <TableCell style={{fontWeight: '900', color:'black'}}>DAYS</TableCell>
                  <TableCell style={{fontWeight: '900', color:'black'}}>REVENUE</TableCell>
                </TableRow>
                :
                <TableRow>
                  <TableCell style={{fontWeight: '900', color:'black'}}>PROJECT</TableCell>
                  <TableCell style={{fontWeight: '900', color:'black'}}>REVENUE</TableCell>
                  <TableCell style={{fontWeight: '900', color:'black'}}>TIME LEFT</TableCell>
                  <TableCell style={{fontWeight: '900', color:'black'}}>DAYS</TableCell>
                  <TableCell style={{fontWeight: '900', color:'black'}}>PROGRAMMER</TableCell>
                </TableRow>
              }
            </TableHead>
            <TableBody
              displayrowcheckbox="false"
              deselectonclickaway="true"
              showrowhover="true"
            >
              {tasks.map((task, index) => (
                this.props.summary?
                  <TableRow key={index} onClick={surveyDetails.bind(this, index, tasks)}>
                    <TableCell style={{color: '#A0A0A0'}}>{task.project}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{asigneesAbbreviation(task.asignees)}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{daysLeft(task.dueDate)} day(s) - {moment(task.dueDate).format("MMMM Do")}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{daysDuration(task.createDate)}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>${numeral(task.revenue).format('0,0')}</TableCell>
                  </TableRow>
                :
                  <TableRow key={index} onClick={surveyDetails.bind(this, index, tasks)}>
                    <TableCell style={{color: '#A0A0A0'}}>{task.project}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>${numeral(task.revenue).format('0,0')}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{daysLeft(task.dueDate)} day(s) - {moment(task.dueDate).format("MMMM Do")}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{daysDuration(task.createDate)}</TableCell>
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

export default inject((allStores) => ({ ...allStores }))(observer(ProgrammingTasks))

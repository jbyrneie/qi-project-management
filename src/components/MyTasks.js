import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import views from '../views'
import {statusButton, daysLeft, daysDuration, surveyDetails, mapStatusToAction} from '../lib/utils'
import moment from 'moment'
import numeral from 'numeral'

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

class MyTasks extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    const myTasks = this.props.store.qiStore.myTasks

    return(
      <Card style={{marginBottom:30}}>
        <CardHeader
          title="My Tasks"
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
                <TableCell style={{fontWeight: '900', color:'black'}}></TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>REVENUE</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>TIME LEFT</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>DAYS</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              displayrowcheckbox="false"
              deselectonclickaway="true"
              showrowhover="true"
            >
              {myTasks.map((task, index) => (
                <TableRow key={index} onClick={surveyDetails.bind(this, index, myTasks)}>
                  <TableCell style={{color: '#A0A0A0'}}>{task.project}</TableCell>
                  <TableCell style={{color: '#A0A0A0'}}>
                    {statusButton(task.status.statusId)}
                  </TableCell>
                  <TableCell style={{color: '#A0A0A0'}}>${numeral(task.revenue).format('0,0')}</TableCell>
                  <TableCell style={{color: '#A0A0A0'}}>{daysLeft(task.dueDate)} day(s) - {moment(task.dueDate).format("MMMM Do")}</TableCell>
                  <TableCell style={{color: '#A0A0A0'}}>{daysDuration(task.createDate)}</TableCell>
                  <TableCell style={{color: '#A0A0A0'}}>{mapStatusToAction(task.status.statusId)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(MyTasks))

import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from './AppBar'
import SideBar from './SideBar'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import _ from 'lodash'

// MUI
import Grid from '@material-ui/core/Grid';
import { Search } from '@material-ui/icons'
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

class VendorSurveysBySurvey extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  render() {
    const vendorSurveys = this.props.store.qiStore.selectedVendorSurveys
    console.log('vendorSurveys: ', JSON.stringify(vendorSurveys));

    return(
      <Card style={{marginBottom:30}}>
        <CardHeader
          title="Performance by Survey"
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
                <TableCell style={{fontWeight: '900', color:'black'}}>STARTS</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>%</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>OVER QUOTA</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>%</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>INCIDENCE</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>%</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>DROPOUT</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>%</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>COMPLETED</TableCell>
                <TableCell style={{fontWeight: '900', color:'black'}}>%</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              displayrowcheckbox="false"
              deselectonclickaway="true"
              showrowhover="true"
            >
              {vendorSurveys.map((survey, index) => {
                const total = survey.status.stats.start + survey.status.stats.oq + survey.status.stats.ir + survey.status.stats.dropout + survey.status.stats.complete
                const percentStarts = Math.round((survey.status.stats.start/total)*100)
                const percentOverQuota = Math.round((survey.status.stats.oq/total)*100)
                const percentIncidence = Math.round((survey.status.stats.ir/total)*100)
                const percentDropOuts = Math.round((survey.status.stats.dropout/total)*100)
                const percentCompleted = Math.round((survey.status.stats.complete/total)*100)

                return (
                  <TableRow key={index}>
                    <TableCell style={{color: '#A0A0A0'}}>{survey.project}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{survey.status.stats.start}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{percentStarts}%</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{survey.status.stats.oq}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{percentOverQuota}%</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{survey.status.stats.ir}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{percentIncidence}%</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{survey.status.stats.dropout}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{percentDropOuts}%</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{survey.status.stats.complete}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{percentCompleted}%</TableCell>
                  </TableRow>
                )}
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(VendorSurveysBySurvey))

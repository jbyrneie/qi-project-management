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

class VendorSurveysByCategory extends Component {
  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  _getCategories(surveys) {
    const grouped = _.uniqBy(surveys, 'category');
    //console.log('grojuped: ', JSON.stringify(grouped));
    let categories = []
    _.forEach(grouped, function(survey) {
      //console.log('category: ', JSON.stringify(survey));
      categories.push(survey.category)
    });
    return categories
  }

  _getStatsByCatgory(category, surveys) {
    let total = 0
    let startTotal = 0
    let oqTotal = 0
    let irTotal = 0
    let dropOutTotal = 0
    let completeTotal = 0

    _.forEach(surveys, function(survey) {
      if (survey.category === category) {
        total += survey.status.stats.start + survey.status.stats.oq + survey.status.stats.ir + survey.status.stats.dropout + survey.status.stats.complete;
        startTotal += survey.status.stats.start
        oqTotal += survey.status.stats.oq
        irTotal += survey.status.stats.ir
        dropOutTotal += survey.status.stats.dropout
        completeTotal += survey.status.stats.complete
      }
    });

    const stats = {total: total,
                   start: startTotal,
                   percentStart: Math.round((startTotal/total)*100),
                   oq: oqTotal,
                   percentOverQuota: Math.round((oqTotal/total)*100),
                   ir: irTotal,
                   percentIncidence: Math.round((irTotal/total)*100),
                   dropOut: dropOutTotal,
                   percentDropOut: Math.round((dropOutTotal/total)*100),
                   complete: completeTotal,
                   percentComplete: Math.round((completeTotal/total)*100)
                 }
   return stats
  }

  render() {
    const vendorSurveys = this.props.store.qiStore.selectedVendorSurveys
    const categories = this._getCategories(vendorSurveys)

    return(
      <Card style={{marginBottom:30}}>
        <CardHeader
          title="Performance by Category"
        />
        <CardContent>
          <Table selectable="true">
            <TableHead style={{fontWeight: '900', color: 'yellow'}}
              displayselectall="false"
              adjustforcheckbox="false"
              enableselectall="false"
            >
              <TableRow>
                <TableCell style={{fontWeight: '900', color:'black'}}>CATEGORY</TableCell>
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
              {categories.map((category, index) => {
                const stats = this._getStatsByCatgory(category, vendorSurveys)

                return (
                  <TableRow key={index}>
                    <TableCell style={{color: '#A0A0A0'}}>{category}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{stats.start}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{stats.percentStart}%</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{stats.oq}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{stats.percentOverQuota}%</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{stats.ir}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{stats.percentIncidence}%</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{stats.dropOut}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{stats.percentDropOut}%</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{stats.complete}</TableCell>
                    <TableCell style={{color: '#A0A0A0'}}>{stats.percentComplete}%</TableCell>
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

export default inject((allStores) => ({ ...allStores }))(observer(VendorSurveysByCategory))

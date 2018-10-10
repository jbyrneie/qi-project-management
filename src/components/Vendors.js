import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from './AppBar'
import SideBar from './SideBar'
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import _ from 'lodash'
import views from '../views'

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

class Vendors extends Component {
  constructor(props) {
    super(props);
    this.state = { groupBy: '0', filterBy: '0' }
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
    this.props.store.qiStore.getVendors()
    .then(() => {
    })
  }

  _handleSortBy(event) {
    console.log('_handleSortBy: ', event.target.value);
    this.setState({sortBy: event.target.value})
  }

  _filterBy(event) {
    console.log('_filterBy: ', event.target.value);
    this.setState({filterBy: event.target.value})
  }

  _vendorSurveys(index, vendors, event) {
    console.log('_vendorSurveys: %s %s', index, JSON.stringify(vendors[index]));
    this.props.store.qiStore.setSelectedVendor(vendors[index])
    const {router: {goTo}} = this.props.store
    goTo(views.vendorSurveys, {}, this.props.store.selectedVendor)
  }

  render() {
    const vendors = this.props.store.qiStore.vendors

    return(
      <div className='container clearfix'>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <SideBar vendors={true}/>
          </Grid>
          <Grid item xs={11}>
            <div className='main-content'>
              <AppBar title='Vendors' newSurvey={true}/>
                <div className='center-content'>
                  <div style={{display: 'inline-block'}}>
                    <div className="inner-addon left-addon" style={{display: 'inline-block', marginRight: 40}}>
                      <select onChange={this._handleSortBy.bind(this)} style={{display: 'inline-block', height: 50, fontSize: 18, color: '#A0A0A0', backgroundColor: '#fff', paddingLeft:5, paddingRight:5, border: '1px solid #ccc', borderRadius: 4}}>
                        <option value='0'>Sort By Completion Rate</option>
                        <option value='1'>Sort By Excluded Rate</option>
                      </select>
                    </div>
                    <select onChange={this._filterBy.bind(this)} style={{display: 'inline-block', height: 50, fontSize: 18, color: '#A0A0A0', backgroundColor: '#fff', paddingLeft:5, paddingRight:5, border: '1px solid #ccc', borderRadius: 4}}>
                      <option value='0'>All Categories</option>
                      <option value='1'>Other</option>
                    </select>
                  </div>
                  <Card style={{marginTop:30, marginBottom:30}}>
                    <CardContent>
                      <Table selectable="true">
                        <TableHead style={{fontWeight: '900'}}
                          displayselectall="false"
                          adjustforcheckbox="false"
                          enableselectall="false"
                        >
                          <TableRow>
                            <TableCell style={{fontWeight: '900', color:'black'}}>VENDOR</TableCell>
                            <TableCell style={{fontWeight: '900', color:'black'}}>COMPLETION</TableCell>
                            <TableCell style={{fontWeight: '900', color:'black'}}>EXCLUDED</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          displayrowcheckbox="false"
                          deselectonclickaway="true"
                          showrowhover="true"
                        >
                          {vendors.map((vendor, index) => {
                            const percentCompleted = Math.round((vendor.completed/(vendor.completed + vendor.excluded))*100)
                            const percentCompletedSymbol = `${percentCompleted}%`
                            const percentExcluded = Math.round((vendor.excluded/(vendor.completed + vendor.excluded))*100)
                            const percentExcludedSymbol = `${percentExcluded}%`
                            return (
                              <TableRow key={index} onClick={this._vendorSurveys.bind(this, index, vendors)}>
                                <TableCell style={{color: '#A0A0A0'}}>{vendor.name}</TableCell>
                                <TableCell style={{color: '#A0A0A0'}}><Progress
                                                                        theme={{
                                                                          success: {
                                                                            color: 'rgb(223, 105, 180)',
                                                                            symbol: percentCompletedSymbol
                                                                          },
                                                                        }}
                                                                        percent={percentCompleted}
                                                                        status="success"
                                                                      />
                                </TableCell>
                                <TableCell style={{color: '#A0A0A0', marginRight:10}}><Progress
                                                                                        theme={{
                                                                                          error: {
                                                                                            color: 'red',
                                                                                            symbol: percentExcludedSymbol
                                                                                          },
                                                                                        }}
                                                                                        percent={percentExcluded}
                                                                                        status="error"
                                                                                      />
                                </TableCell>
                              </TableRow>
                            )}
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(Vendors))

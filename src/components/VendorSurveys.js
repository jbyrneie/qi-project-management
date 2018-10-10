import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import AppBar from './AppBar'
import SideBar from './SideBar'
import VendorSurveysByCategory from './VendorSurveysByCategory'
import VendorSurveysBySurvey from './VendorSurveysBySurvey'
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

class VendorSurveys extends Component {
  constructor(props) {
    super(props);
    this.state = { groupBy: '0', filterBy: '0' }
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  _handleSortBy(event) {
    console.log('_handleSortBy: ', event.target.value);
    this.setState({sortBy: event.target.value})
  }

  _filterBy(event) {
    console.log('_filterBy: ', event.target.value);
    this.setState({filterBy: event.target.value})
  }

  _vendorDetails(event) {
    console.log('_vendorDetails');
  }

  render() {
    const vendorSurveys = this.props.store.qiStore.selectedVendorSurveys
    console.log('vendorSurveys: ', JSON.stringify(vendorSurveys));

    return(
      <div className='container clearfix'>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <SideBar vendors={true}/>
          </Grid>
          <Grid item xs={11}>
            <div className='main-content'>
              <AppBar title='EMI'/>
                <div className='center-content'>
                  <VendorSurveysByCategory />
                  <VendorSurveysBySurvey />
                </div>
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(VendorSurveys))

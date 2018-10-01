import React from 'react';
import { observer, inject } from 'mobx-react'
import _ from 'lodash';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from './AppBar'
import SideBar from './SideBar'
import SurveyDetailsMenu from './SurveyDetailsMenu'
import moment from 'moment'
import { whiteButton } from '../styles/Buttons'

// Custom Styles
import '../css/qi.css'

// MUI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Person } from '@material-ui/icons'
import Checkbox from '@material-ui/core/Checkbox';

class Invites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      populationFilter: 'All Populations',
      statusFilter: 'All Statuses',
      survey: {},
      filteredSurvey: {}
    };
  }

  componentWillMount() {
    console.log('Invites WillMount');
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
    const survey = this.props.store.qiStore.selectedSurvey
    this.setState({survey: survey, filteredSurvey: survey})
  }

  componentDidMount() {
    console.log('Invites DidMount');
    const survey = this.props.store.qiStore.selectedSurvey
    this.setState({survey: survey, filteredSurvey: survey})
  }

  componentWillReceiveProps(props) {
      console.log('Invites componentWillReceiveProps ', JSON.stringify(props));
  }

  _inviteCM(event) {
    console.log('_inviteCM called: ');
  }

  _filterCM(event) {
    console.log('_filterCM called: ');
  }

  _unattachCM(event) {
    console.log('_unattachCM called: ');
  }

  _blockCM(event) {
    console.log('_blockCM called: ');
  }

  _newList(event) {
    console.log('_newList called: ');
  }

  _filterPopulation(cms) {
    const filtered = _.uniqBy(cms, 'title');
    let population = []
    _.forEach(filtered, function(cm) {
      population.push({value: cm.title, label: cm.title})
    });
    return population
  }

  _filterStatus(cms) {
    const filtered = _.uniqBy(cms, 'status');
    let statuses = []
    _.forEach(filtered, function(cm) {
      statuses.push({value: cm.status, label: cm.status})
    });
    return statuses
  }

  _filterCMByPopulation(survey, event) {
    let filtered = _.cloneDeep(survey)
    console.log('_filterCMByPopulation ', JSON.stringify(survey), event.target.value);
    console.log('b4 this.state.survey: ', JSON.stringify(this.state.survey));

    let filterOptions = {}
    if (event.target.value!=='All Populations')
      filterOptions.title = event.target.value
    if (this.state.statusFilter !== 'All Statuses')
      filterOptions.status = this.state.statusFilter

    filtered.cms = _.filter(this.state.survey.cms, filterOptions)
    //filtered.cms = _.filter(filtered.cms, { title: filter})
    console.log('filtered: ', JSON.stringify(survey));
    /*
    let cms = _.filter(filtered.cms, { title: filter})
    console.log('filtered CMs: ', JSON.stringify(cms));
    */

    console.log('af1 this.state.survey: ', JSON.stringify(this.state.survey));
    this.setState({filteredSurvey: filtered, populationFilter: event.target.value})
    console.log('af2 this.state.survey: ', JSON.stringify(this.state.survey));
  }

  _filterCMByStatus(survey, event) {
    let filtered = _.cloneDeep(survey)
    let filterOptions = {}
    if (event.target.value!=='All Statuses')
      filterOptions.status = event.target.value
    if (this.state.populationFilter !== 'All Populations')
      filterOptions.title = this.state.populationFilter

    filtered.cms = _.filter(this.state.survey.cms, filterOptions)

    this.setState({filteredSurvey: filtered, statusFilter: event.target.value})
  }


  render() {
    const survey = this.state.filteredSurvey
    console.log('survey...: ', JSON.stringify(survey));
    console.log('render state survey...: ', JSON.stringify(this.state.survey));
    const population = this._filterPopulation(survey.cms)
    const statuses = this._filterStatus(survey.cms)
    const createdOn = `Created on ${moment(survey.createDate).format("MMMM Do YYYY")}`

    console.log('render invites population: ', JSON.stringify(population));

    const styles = theme => ({
      root: {
        flexGrow: 1,
      },
      divider: {
        height: theme.spacing.unit * 2,
      },
      paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      label: {
        fontWeight: 900,
        fontSize: 36
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: 0,
        width: 200,
      },
      menu: {width: 200},
      button: {
        marginLeft: 20,
        marginRight: 20
      },
      snackbar: {
        margin: theme.spacing.unit,
      },
      checkbox: {
        marginRight: 16,
      },
      person: {
        marginTop: 20,
        paddingTop: 20
      },
    })

    return (
      <div className='container clearfix'>
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <SideBar newSurvey={true}/>
          </Grid>
          <Grid item xs={11}>
            <div className='main-content'>
              <AppBar title={survey.project} subTitle={createdOn}/>
              <div className='inner-content'>
                <div className='center-content' style={{width:'100%'}}>
                  <SurveyDetailsMenu tab='invites'/>
                  <div style={{marginLeft:40, marginTop:50, marginBottom:40}}>
                    <div style={{float:'left'}}>
                      <TextField
                        variant="contained"
                        select
                        styles={{margin: 0}}
                        value={this.state.populationFilter}
                        onChange={this._filterCMByPopulation.bind(this, survey)}
                        SelectProps={{
                          MenuProps: {
                            className: styles.menu,
                          },
                        }}
                      >
                        <MenuItem key='All Populations' value='All Populations'>
                          All Populations
                        </MenuItem>
                        {population.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <Button variant="contained" style={whiteButton} onClick={this._inviteCM.bind(this)}>
                        INVITE
                      </Button>
                      <Button variant="contained" style={whiteButton} onClick={this._unattachCM.bind(this)}>
                        UNATTACH
                      </Button>
                      <Button variant="contained" style={whiteButton} onClick={this._blockCM.bind(this)}>
                        BLOCK
                      </Button>
                      <Button variant="contained" style={whiteButton} onClick={this._newList.bind(this)}>
                        CREATE NEW LIST
                      </Button>
                    </div>
                    <div style={{float:'right'}}>
                      <span style={{fontWeight: '900', fontSize: 18, color:'black', marginRight:20}}>{survey.cms.length} Invites</span>
                      <TextField
                        variant="contained"
                        select
                        styles={{margin: 0}}
                        value={this.state.statusFilter}
                        onChange={this._filterCMByStatus.bind(this, survey)}
                        SelectProps={{
                          MenuProps: {
                            className: styles.menu,
                          },
                        }}
                      >
                        <MenuItem style={{paddingLeft:10, paddingRight:20}} key='All Statuses' value='All Statuses'>
                          All Statuses
                        </MenuItem>
                        {statuses.map(option => (
                          <MenuItem style={{paddingLeft:10, paddingRight:20}} key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div style={{marginTop:60, color:'white'}}>x</div>
                  <div style={{marginTop: 60}}>
                    <Table selectable={true}>
                      <TableHead style={{fontWeight: '900'}}
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                      >
                        <TableRow>
                          <TableCell style={{fontWeight: '900', color:'black'}}><Checkbox style={styles.checkbox}/></TableCell>
                          <TableCell style={{fontWeight: '900', color:'black'}}>LOCATION</TableCell>
                          <TableCell style={{fontWeight: '900', color:'black'}}>POPULATION</TableCell>
                          <TableCell style={{fontWeight: '900', color:'black'}}>RATE</TableCell>
                          <TableCell style={{fontWeight: '900', color:'black'}}>STATUS</TableCell>
                          <TableCell style={{fontWeight: '900', color:'black'}}>INVITE DATE</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                      >
                        {survey.cms.map((cm, index) => (
                          <TableRow key={index}>
                            <TableCell style={{color: '#A0A0A0'}}>
                              <div>
                                <span style={styles.checkbox}><Checkbox/></span>
                                <span style={styles.person}><Person color="primary"/></span>
                              </div>
                            </TableCell>
                            <TableCell style={{color: '#A0A0A0'}}>{cm.location}</TableCell>
                            <TableCell style={{color: '#A0A0A0'}}>{cm.title}</TableCell>
                            <TableCell style={{color: '#A0A0A0'}}>${cm.rate}</TableCell>
                            <TableCell style={{color: '#A0A0A0'}}>{cm.status}</TableCell>
                            <TableCell style={{color: '#A0A0A0'}}>{cm.statusDate}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default inject((allStores) => ({ ...allStores }))(observer((Invites)))

import React from 'react';
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from './AppBar'
import SideBar from './SideBar'
import TypeAhead from './TypeAhead'
import { getClientSuggestions, getContactSuggestions } from '../lib/suggestions'
import { newSurveyButton } from '../styles/Buttons'

class SurveyLead extends React.Component {
  popperNode = null;
  constructor(props) {
    super(props);

    this.state = {
      client_name: '',
      client_contact: '',
      suggestions: [],
      priority: 'Medium',
    };
  }

  componentWillMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.outerHTML = ''
    }
  }

  _getClientSuggestions(value) {
    console.log('_getClientSuggestions: ', value);
    return getClientSuggestions(value)
  }

  _getContactSuggestions(value) {
    console.log('_getContactSuggestions: ', value);
    return getContactSuggestions(value)
  }

  _handleClientNameChange(value) {
    console.log('handleClientNameChange: ', value);
    this.setState({
      client_name: value,
    });
  };

  _handleContactNameChange(value) {
    console.log('handleContactNameChange: ', value);
    this.setState({
      client_contact: value,
    });
  };

  _handlePriorityChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

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
        marginRight: 100
      },
    })

    const priorities = [
      {
        value: 'Low',
        label: 'Low',
      },
      {
        value: 'Medium',
        label: 'Medium',
      },
      {
        value: 'High',
        label: 'High',
      },
    ];

    return (
      <div className='container clearfix'>
        <SideBar surveyLead={true}/>
        <div className='main-content'>
          <AppBar title='New Lead'/>
          <div className='inner-content'>
            <div className='center-content' style={{width:'60%'}}>
              <div className={styles.root}>
                <Grid container spacing={24}>
                  <Grid item xs={12} style={{fontSize:18, fontWeight:900}}>Client Information</Grid>
                  <Grid item xs={6}>
                    <TypeAhead
                      label='Client Name'
                      placeholder='Start typing Client Name'
                      value={this.state.client_contact}
                      handle_change={this._handleContactNameChange.bind(this)}
                      getSuggestions={this._getContactSuggestions.bind(this)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TypeAhead
                      label='Client Company'
                      placeholder='Start typing Client Company'
                      value={this.state.client_name}
                      handle_change={this._handleClientNameChange.bind(this)}
                      getSuggestions={this._getClientSuggestions.bind(this)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TypeAhead
                      label='Research Manager'
                      placeholder='Start typing research Manager'
                      value={this.state.client_contact}
                      handle_change={this._handleContactNameChange.bind(this)}
                      getSuggestions={this._getContactSuggestions.bind(this)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TypeAhead
                      label='Survey Manager'
                      placeholder='Start typing Survey Manager'
                      value={this.state.client_name}
                      handle_change={this._handleClientNameChange.bind(this)}
                      getSuggestions={this._getClientSuggestions.bind(this)}
                    />
                  </Grid>
                  <Grid item xs={12} style={{fontSize:18, fontWeight:900}}>Survey Information</Grid>
                  <Grid item xs={6}>
                    <TextField
                      required
                      id="standard-required"
                      label="Project Title"
                      styles={{margin: 0}}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="standard-select-priority"
                      select
                      label="PRIORITY"
                      styles={{margin: 0}}
                      value={this.state.priority}
                      onChange={this._handlePriorityChange('priority')}
                      SelectProps={{
                        MenuProps: {
                          className: styles.menu,
                        },
                      }}
                    >
                      {priorities.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-textarea"
                      label="Project Description"
                      multiline
                      fullWidth
                      rows={4}
                      margin="normal"
                      variant="filled"
                    />
                  </Grid>
                  <Grid item xs={12} style={{marginBottom:20}}>
                    <Button variant="contained" style={newSurveyButton}>
                      SAVE
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SurveyLead.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default inject((allStores) => ({ ...allStores }))(observer((SurveyLead)))

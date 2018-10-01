import React from 'react';
import { observer, inject } from 'mobx-react'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AppBar from './AppBar'
import SideBar from './SideBar'
import SurveyDetailsMenu from './SurveyDetailsMenu'
import Notification from './Notification'
import TypeAhead from './TypeAhead'
import { getClientSuggestions, getContactSuggestions } from '../lib/suggestions'
import { enabledButton, disabledButton } from '../styles/Buttons'

// Custom Styles
import '../css/qi.css'

class Settings extends React.Component {
  popperNode = null;
  constructor(props) {
    super(props);

    this.state = {
      client_name: '',
      client_contact: '',
      research_manager: '',
      survey_manager: '',
      title: '',
      description: '',
      suggestions: [],
      priority: 'Medium',
      valid: false,
      leadSaved: false,
      snackBarOpen: true
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

  _handleChange(field, event) {
    console.log('_handleChange: ', field, event.target.name, event.target.value);
    this.setState(
      { [field]: event.target.value},
      () => {
        this.setState({valid: this._validate()})
        console.log('desc: %s title: %s', this.state.title, this.state.description);
      }
    );
  };

  _handleClientNameChange(value) {
    console.log('handleClientNameChange: ', value);
    this.setState(
      { client_name: value },
      () => this.setState({valid: this._validate()})
    );
  };

  _handleContactNameChange(value) {
    console.log('handleContactNameChange: ', value);
    this.setState(
      { client_contact: value },
      () => this.setState({valid: this._validate()})
    );
  };

  _handleResearchManagerChange(value) {
    console.log('_handleResearchManagerChange: ', value);
    this.setState(
      { research_manager: value },
      () => this.setState({valid: this._validate()})
    );
  };

  _handleSurveyManagerChange(value) {
    console.log('_handleSurveyManagerChange: ', value);
    this.setState(
      { survey_manager: value },
      () => this.setState({valid: this._validate()})
    );
  };

  _handlePriorityChange = name => event => {
    this.setState({
      [name]: event.target.value,
      valid: this._validate()
    });
  };

  _validate() {
    console.log('_validate client: %s contact: %s',this.state.client_name, this.state.client_contact);
    if (this.state.client_name.length > 0 &&
        this.state.client_contact.length > 0 &&
        this.state.research_manager.length > 0 &&
        this.state.survey_manager.length > 0 &&
        this.state.title.length > 0 &&
        this.state.description.length > 0
        )
      return true
    else return false
  }

  _save(event) {
    console.log('save called: ', this.state.client_contact);
    if (this.state.valid) {
      console.log('I can save....');
      this.props.store.qiStore.saveSurveyLead({client_name: this.state.client_name,
                                               client_contact: this.state.client_contact,
                                               research_manager: this.state.research_manager,
                                               survey_manager: this.state.survey_manager,
                                               priority: this.state.priority,
                                               title: this.state.title,
                                               description: this.state.description
                                             })
      this.setState({leadSaved:true})
    }
  }

  _closeSnackBar = (event) => {
    this.setState({ snackBarOpen: false });
  };

  render() {
    console.log('render settings...');

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
      snackbar: {
        margin: theme.spacing.unit,
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
        <Grid container spacing={0}>
          <Grid item xs={1}>
            <SideBar newSurvey={true}/>
          </Grid>
          <Grid item xs={11}>
            <div className='main-content'>
              <AppBar title='Project Settings'/>
              <div className='inner-content'>
                <div className='center-content' style={{width:'100%'}}>
                  <SurveyDetailsMenu tab='settings'/>
                  <div className={styles.root} style={{width:'60%'}}>
                    <Grid container spacing={24}>
                      <Grid item xs={12} style={{fontSize:18, fontWeight:900}}>Client Information</Grid>
                      <Grid item xs={6}>
                        <TypeAhead
                          required
                          label='Client Name'
                          placeholder='Start typing Client Name'
                          value={this.state.client_name}
                          handle_change={this._handleClientNameChange.bind(this)}
                          getSuggestions={this._getClientSuggestions.bind(this)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TypeAhead
                          required
                          label='Client Contact'
                          placeholder='Start typing Client Contact'
                          value={this.state.client_contact}
                          handle_change={this._handleContactNameChange.bind(this)}
                          getSuggestions={this._getContactSuggestions.bind(this)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TypeAhead
                          required
                          label='Research Manager'
                          placeholder='Start typing Research Manager'
                          value={this.state.research_manager}
                          handle_change={this._handleResearchManagerChange.bind(this)}
                          getSuggestions={this._getClientSuggestions.bind(this)}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TypeAhead
                          required
                          label='Survey Manager'
                          placeholder='Start typing Survey Manager'
                          value={this.state.survey_manager}
                          handle_change={this._handleSurveyManagerChange.bind(this)}
                          getSuggestions={this._getClientSuggestions.bind(this)}
                        />
                      </Grid>
                      <Grid item xs={12} style={{fontSize:18, fontWeight:900}}>Survey Information</Grid>
                      <Grid item xs={6}>
                        <TextField
                          required
                          label="Project Title"
                          variant="outlined"
                          styles={{margin: 0}}
                          onChange={this._handleChange.bind(this, 'title')}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          required
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
                          required
                          id="outlined-textarea"
                          label="Project Description"
                          multiline
                          fullWidth
                          rows={4}
                          margin="normal"
                          variant="filled"
                          onChange={this._handleChange.bind(this, 'description')}
                        />
                      </Grid>
                      <Grid item xs={12} style={{marginBottom:20}}>
                        <Button variant="contained" style={this.state.valid?enabledButton:disabledButton} onClick={this._save.bind(this)}>
                          SAVE
                        </Button>
                      </Grid>
                    </Grid>
                    {this.state.leadSaved?
                      <Notification variant="warning" message="I loves React" open={true}/>
                      :
                      null
                    }
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

export default inject((allStores) => ({ ...allStores }))(observer((Settings)))

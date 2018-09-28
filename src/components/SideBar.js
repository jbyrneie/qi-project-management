import React, { Component} from 'react'
import { observer, inject } from 'mobx-react'
import PropTypes from 'prop-types';
import views from '../views'
import lightBox from'../images/lightBox.png'
import darkBox from'../images/darkBox.png'

// Custom Styles
import '../css/qi.css'

// MUI
import SvgIcon from '@material-ui/core/SvgIcon';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import { Home, List, AccessAlarm, AttachFile, PieChart, Search, Keyboard, ThumbUp } from '@material-ui/icons'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: red[800],
    },
  },
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

class SideBar extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  _navigate(route, event) {
    console.log('_navigate clicked');
    const {router: {goTo}} = this.props.store
    goTo(views[route], {}, this.props.store)
  }

  render() {
    const styles1 = theme => ({
      root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      icon: {
        margin: theme.spacing.unit * 2,
      },
      iconHover: {
        margin: theme.spacing.unit * 2,
        '&:hover': {
          color: red[800],
        },
      },
    });

    return(
      <div style={{paddingTop:10, position: 'relative'}}>
        <div style={{fontSize:'36px', color:'#A0A0A0', fontWeight:400, paddingTop:18, paddingBottom:40, textAlign:"center"}} onClick={this._navigate.bind(this, 'home')}>S</div>
        <div style={{textAlign:"center"}}>
          <HomeIcon color={this.props.myTasks?"primary":"disabled"} style={{fontSize:36, marginTop: 20, marginBottom:20}} onClick={this._navigate.bind(this, 'home')}/>
        </div>
        <div style={{textAlign:"center"}}>
          <Search color={this.props.feasability?"primary":"disabled"} style={{fontSize:36, marginTop: 20, marginBottom:20}} onClick={this._navigate.bind(this, 'feasability')}/>
        </div>
        <div style={{textAlign:"center"}}>
          <Keyboard color={this.props.programming?"primary":"disabled"} style={{fontSize:36, marginTop: 20, marginBottom:20}} onClick={this._navigate.bind(this, 'programming')}/>
        </div>
        <div style={{textAlign:"center"}}>
          <ThumbUp color={this.props.fielding?"primary":"disabled"} style={{fontSize:36, marginTop: 20, marginBottom:20}} onClick={this._navigate.bind(this, 'fielding')}/>
        </div>
        <div style={{textAlign:"center"}}>
          <PieChart color={this.props.reporting?"primary":"disabled"} style={{fontSize:36, marginTop: 20, marginBottom:20}} onClick={this._navigate.bind(this, 'reporting')}/>
        </div>
      </div>
    )
  }
}

export default inject((allStores) => ({ ...allStores }))(observer(SideBar))

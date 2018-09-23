import {extendObservable, action} from 'mobx';
import {get, post} from '../lib/http'
import request from 'superagent-bluebird-promise'
import _ from 'lodash'
import Cookie from 'js-cookie'
import moment from 'moment'

class QiStore {
  constructor() {
    extendObservable(this, {
      myTasks: [],
      surveyInfo: {info: 'stuff'}
    });
  }

  getSurveyInfo = action((cmId) => {
    return this.surveyInfo
  });

  getMyTasks = action(() => {
    const context = this
    return new Promise(function(resolve, reject) {
      const tasks = [
                          {
                            project: 'BCG - Internet of things',
                            status: 'Lead',
                            daysInStatus: 10,
                            action: 'Create Quote'
                          },
                          {
                            project: 'Bain - Asia - Internet Software and Services Industry (Survey #12345)',
                            status: 'Quote',
                            daysInStatus: 10,
                            action: 'Close Quote | Accept Quote'
                          },
                          {
                            project: 'BCG - Internet of things',
                            status: 'Lead',
                            daysInStatus: 10,
                            action: 'Create Quote'
                          },
                          {
                            project: 'BCG - Transportation of stuff and loads of other stuff',
                            status: 'Fielding',
                            daysInStatus: 10,
                            action: 'Not on target - Add CMs'
                          },
                          {
                            project: 'BCG - Internet of things',
                            status: 'Lead',
                            daysInStatus: 10,
                            action: 'Create Quote'
                          },
                          {
                            project: 'BCG - Internet of things',
                            status: 'Lead',
                            daysInStatus: 10,
                            action: 'Create Quote'
                          },
                          {
                            project: 'BCG - Internet of things',
                            status: 'Lead',
                            daysInStatus: 10,
                            action: 'Create Quote'
                          },
                        ];
        context.myTasks = tasks
        resolve()
    });
  });

}

export default QiStore;

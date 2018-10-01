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
      surveyInfo: {info: 'stuff'},
      selectedSurvey: {}
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
                            project: 'BCG - Internet of things1',
                            status: {statusId:10,
                                     stats: {invite:600, start:200, oq:50, ir:20, dropout:50, complete:20},
                                     asignees:[{first_name: 'Jack ', last_name: 'Byrne10'}, {first_name: 'Christina ', last_name: 'Dobi10'}, {first_name: 'Arti ', last_name: 'Singhapakdi10'}]},
                            daysInStatus: 10,
                            action: 'Create Quote',
                            createDate: '2018-09-10',
                            dueDate: '2018-09-24',
                            revenue: 600
                          },
                          {
                            project: 'Bain - Asia - Internet Software and Services Industry (Survey #12345)2',
                            status: {statusId: 10,
                                     stats: {invite:700, start:200, oq:50, ir:20, dropout:50, complete:20},
                                     asignees:[{first_name: 'Jack ', last_name: 'Byrne10'}, {first_name: 'Christina ', last_name: 'Dobi10'}, {first_name: 'Arti ', last_name: 'Singhapakdi10'}]},
                            daysInStatus: 10,
                            action: 'Close Quote | Accept Quote',
                            createDate: '2018-09-11',
                            dueDate: '2018-09-25',
                            revenue: 700
                          },
                          {
                            project: 'BCG - Internet of things3',
                            status: {statusId: 11,
                                     stats: {invite:800, start:200, oq:50, ir:20, dropout:50, complete:20},
                                     asignees:[{first_name: 'Jack ', last_name: 'Byrne11'}, {first_name: 'Christina ', last_name: 'Dobi11'}, {first_name: 'Arti ', last_name: 'Singhapakdi11'}]},
                            daysInStatus: 10,
                            action: 'Create Quote',
                            createDate: '2018-09-12',
                            dueDate: '2018-09-26',
                            revenue: 800
                          },
                          {
                            project: 'BCG - Transportation of stuff and loads of other stuff4',
                            status: {statusId:12,
                                     stats: {invite:900, start:200, oq:50, ir:20, dropout:50, complete:20},
                                     asignees:[{first_name: 'Jack ', last_name: 'Byrne12'}, {first_name: 'Christina ', last_name: 'Dobi12'}, {first_name: 'Arti ', last_name: 'Singhapakdi12'}]},
                            daysInStatus: 10,
                            action: 'Not on target - Add CMs',
                            createDate: '2018-09-13',
                            dueDate: '2018-09-27',
                            revenue: 900
                          },
                          {
                            project: 'BCG - Internet of things5',
                            status: {statusId:12,
                                     stats: {invite:1000, start:200, oq:50, ir:20, dropout:50, complete:20},
                                     asignees:[{first_name: 'Jack ', last_name: 'Byrne12'}, {first_name: 'Christina ', last_name: 'Dobi12'}, {first_name: 'Arti ', last_name: 'Singhapakdi12'}]},
                            daysInStatus: 10,
                            action: 'Create Quote',
                            createDate: '2018-09-14',
                            dueDate: '2018-09-28',
                            revenue: 1000
                          },
                          {
                            project: 'BCG - Internet of things6',
                            status: {statusId:13,
                                     stats: {invite:1100, start:200, oq:50, ir:20, dropout:50, complete:20},
                                     asignees:[{first_name: 'Jack ', last_name: 'Byrne13'}, {first_name: 'Christina ', last_name: 'Dobi13'}, {first_name: 'Arti ', last_name: 'Singhapakdi13'}]},
                            daysInStatus: 10,
                            action: 'Create Quote',
                            createDate: '2018-09-15',
                            dueDate: '2018-09-29',
                            revenue: 1100
                          },
                          {
                            project: 'BCG - Internet of things7',
                            status: {statusId:14,
                                     stats: {invite:1200, start:200, oq:50, ir:20, dropout:50, complete:20},
                                     asignees:[{first_name: 'Jack ', last_name: 'Byrne14'}, {first_name: 'Christina ', last_name: 'Dobi14'}, {first_name: 'Arti ', last_name: 'Singhapakdi14'}]},
                            daysInStatus: 10,
                            action: 'Create Quote',
                            createDate: '2018-09-15',
                            dueDate: '2018-09-30',
                            revenue: 1100
                          },
                          {
                            project: 'BCG - Internet of things8',
                            status: {statusId:10,
                                     stats: {invite:1300, start:200, oq:50, ir:20, dropout:50, complete:20},
                                     asignees:[{first_name: 'Jack ', last_name: 'Byrne10'}, {first_name: 'Evelyn', last_name: 'Kavanagh10'}, {first_name: 'Arti ', last_name: 'Singhapakdi10'}]},
                            action: 'Create Quote',
                            createDate: '2018-09-15',
                            dueDate: '2018-10-01',
                            revenue: 1100
                          },
                        ];
        context.myTasks = tasks
        resolve()
    });
  });

  saveSurveyLead = action((lead) => {
    console.log('saveSurveyLead: ', JSON.stringify(lead));
  });

  setSelectedSurvey = action((survey) => {
    survey.cms = [{title:'Director Level', location:'United States', rate:30, status: 'Attached', statusDate: '2018-07-09'},
                  {title:'Director Level1', location:'United States', rate:30, status: 'Invited', statusDate: '2018-07-10'},
                  {title:'Director Level1', location:'United States', rate:30, status: 'Invited', statusDate: '2018-07-11'},
                  {title:'Director Level2', location:'United States', rate:30, status: 'Accepted', statusDate: '2018-07-12'},
                  {title:'Director Level2', location:'United States', rate:30, status: 'Blocked', statusDate: '2018-07-13'},
                  {title:'Director Level2', location:'United States', rate:30, status: 'Invited', statusDate: '2018-07-14'}
                 ]
    this.selectedSurvey = survey
  });
}

export default QiStore;

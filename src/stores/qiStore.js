import {extendObservable, action} from 'mobx';
import {get, post} from '../lib/http'
import request from 'superagent-bluebird-promise'
import _ from 'lodash'
import Cookie from 'js-cookie'
import moment from 'moment'

class QiStore {
  constructor() {
    extendObservable(this, {
      surveyInfo: {"info": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
    });
  }

  getSurveyInfo = action((cmId) => {
    return this.surveyInfo
  });
  
  getMyTasks = action(() => {
    const myTasks = [
                        {
                          project: 'John Smith',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Randal White',
                          status: 'Unemployed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Stephanie Sanders',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Steve Brown',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Joyce Whitten',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Samuel Roberts',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                        {
                          project: 'Adam Moore',
                          status: 'Employed',
                          daysInStatus: 10,
                          action: 'stuff'
                        },
                      ];
    return myTasks
  });

}

export default QiStore;

import moment from 'moment';

import getData from '../../logics/getData';

import { indivisibleUrl } from '../constants';

import IndEvent from './model';

export const setEvents = events => ({
  events,
  type: 'SET_EVENTS',
});

export const setFeaturesHome = featuresHome => ({
  featuresHome,
  type: 'SET_FEATURES_HOME',
});

export const updateColorMap = colorMap => ({
  colorMap,
  type: 'UPDATE_COLORS',
});

const filterRecurring = (acc, indEvent) => {
  if (indEvent.isRecurring) {
    const currentSoonestIndex = acc.findIndex(ele => ele.mobilizeId === indEvent.mobilizeId);
    const currentSoonest = acc[currentSoonestIndex];
    if (currentSoonestIndex === -1) {
      acc.push(indEvent);
    } else if (moment(indEvent.starts_at).isBefore(currentSoonest.starts_at)) {
      currentSoonest.starts_at = indEvent.starts_at;
      acc[currentSoonestIndex] = currentSoonest;
    }
  } else {
    acc.push(indEvent);
  }
  return acc;
};

const include = event => event.issueFocus === 'Impeachment Inquiry' || event.actionMeetingType === 'Town Hall' || event.actionMeetingType === 'Office Hours';

export const startSetEvents = () => (dispatch) => {
  const url = `${indivisibleUrl}/indivisible_public_events.json`;
  return getData(url).then((result) => {
    const allevents = result.body;
    const events = Object.keys(allevents)
      .map(id => new IndEvent(allevents[id]))
      .filter(event => moment(event.starts_at).isAfter() && include(event))
      .sort((a, b) => ((moment(a.starts_at).isSameOrAfter(moment(b.starts_at))) ? 1 : -1));
    return (dispatch(setEvents(events)));
  });
};

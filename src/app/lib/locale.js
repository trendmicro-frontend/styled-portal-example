import cookie from 'js-cookie';
import moment from 'moment';
import i18n from 'app/lib/i18n';

/**
 * Get the timezone offset from the account, and if that fails, return browser's timezone offset.
 */
const getTimezoneOffset = () => {
  let tzOffset = Number.parseInt(cookie.get('tz_offset'), 10); // in secounds

  if (Number.isNaN(tzOffset)) {
    tzOffset = (new Date()).getTimezoneOffset(); // Use browser's timezone offset
    return tzOffset; // it already contains daylight saving
  }

  return 0 - Math.round(tzOffset / 60); // returns the time difference between UTC time and local time, in minutes.
};

const toTZString = (tzOffset) => {
  tzOffset = tzOffset ?? getTimezoneOffset();
  return moment().utcOffset(0 - tzOffset).format('Z');
};

const toDateTimeString = (dt, tzOffset) => {
  tzOffset = tzOffset ?? getTimezoneOffset();
  return moment.unix(dt).utcOffset(0 - tzOffset).format(i18n.t('locale:moment.format.dateTime'));
};

const toFileDateString = (dt, tzOffset) => {
  tzOffset = tzOffset ?? getTimezoneOffset();
  return moment.unix(dt).utcOffset(0 - tzOffset).format(i18n.t('locale:moment.format.fileDate'));
};

const toFileDateTimeString = (dt, tzOffset) => {
  tzOffset = tzOffset ?? getTimezoneOffset();
  return moment.unix(dt).utcOffset(0 - tzOffset).format(i18n.t('locale:moment.format.fileDateTime'));
};

const toISOString = (dt, tzOffset) => {
  tzOffset = tzOffset ?? getTimezoneOffset();
  return moment.unix(dt).utcOffset(0 - tzOffset).format(i18n.t('locale:moment.format.iso'));
};

// @param {string} period A period string starts with a digit and ends with a valid unit.
//
// Units (https://momentjs.com/docs/#/parsing/object/)
// y, year, years
// M, month, months
// d, day, days
// h, hour, hours
// m, minute, minutes
// s, second, seconds
// ms, millisecond, milliseconds
const mapPeriodToTimeRange = (period) => {
  const utcOffset = (0 - getTimezoneOffset());
  const unit = String(period).replace(/[0-9]/g, '').toLowerCase();
  const value = parseInt(period, 10) || 0;
  const startOfUnit = moment().startOf(unit);
  const endOfUnit = moment().endOf(unit);
  const from = moment(startOfUnit)
    .utcOffset(utcOffset)
    .subtract((value > 0) ? (value - 1) : 0, unit)
    .unix();
  const to = moment(endOfUnit)
    .utcOffset(utcOffset)
    .unix();

  return [from, to];
};

export default {
  getTimezoneOffset,
  toTZString,
  toDateTimeString,
  toFileDateString,
  toFileDateTimeString,
  toISOString,
  mapPeriodToTimeRange,
};

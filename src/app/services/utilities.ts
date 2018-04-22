export class Utilities {

  constructor() { }

  static formatDate(date: Date, format?: string): string {
    const day = date.getDate();
    const dd = (day < 10 ? '0' : '') + day.toString();
    const d = day.toString();

    const month = date.getMonth() + 1;
    const MM = (month < 10 ? '0' : '') + month.toString();
    const M = month.toString();

    const year = date.getFullYear();
    const yy = year.toString().substring(2);
    const yyyy = year.toString();

    const hours = date.getHours();
    const hours12 = hours > 12 ? hours - 12 : hours;
    const HH = (hours < 10 ? '0' : '') + hours.toString();
    const H = hours.toString();
    const hh = (hours12 < 10 ? '0' : '') + hours12.toString();
    const h = hours12.toString();

    const minutes = date.getMinutes();
    const mm = (minutes < 10 ? '0' : '') + minutes.toString();
    const m = minutes.toString();

    const seconds = date.getSeconds();
    const ss = (seconds < 10 ? '0' : '') + seconds.toString();
    const s = seconds.toString();

    const milliseconds = date.getMilliseconds();
    const ms = milliseconds.toString();

    const tt = hours >= 12 ? 'PM' : 'AM';
    const t = hours >= 12 ? 'P' : 'A';

    let result = '';
    if (format) {
      result = format;
      result = result.replace('yyyy', yyyy);
      result = result.replace('yy', yy);
      result = result.replace('MM', MM);
      result = result.replace('M', M);
      result = result.replace('dd', dd);
      result = result.replace('d', d);
      result = result.replace('HH', HH);
      result = result.replace('H', H);
      result = result.replace('hh', hh);
      result = result.replace('h', h);
      result = result.replace('mm', mm);
      result = result.replace('m', m);
      result = result.replace('ss', ss);
      result = result.replace('s', s);
      result = result.replace('ms', ms);
      if (format.includes('h') || format.includes('hh')) {
        result = result.replace('tt', tt);
        result = result.replace('t', t);
      }
    } else {
      result = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
    return result;
  }
}

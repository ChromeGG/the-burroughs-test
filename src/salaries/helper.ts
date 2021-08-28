import { formatISO } from 'date-fns';

export function toIsoDate(date: Date): string {
  return formatISO(date, { representation: 'date' });
}

export function removeTimeZone(date: Date): Date {
  return new Date(date.toISOString().slice(0, 10));
}

export function getDayFromMonth(day: Date, dayOfMonth = 1) {
  let month = (day.getMonth() + 1).toString();
  if (month.length === 1) {
    month = `0${month}`;
  }
  return new Date(`${day.getFullYear()}-${month}-${dayOfMonth}`);
}

// TODO Add library to convert
export function convertToCSV(arr = []) {
  const array = [Object.keys(arr[0])].concat(arr);

  return array
    .map((it) => {
      return Object.values(it).toString();
    })
    .join('\n');
}

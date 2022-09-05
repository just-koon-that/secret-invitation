import {format, formatDistanceToNow} from 'date-fns';
import {ko} from 'date-fns/locale';

export function formatDate(date: Date | number | string) {
  const d = new Date(date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;
  if (diff < 60 * 1) {
    return '방금 전';
  }
  if (diff < 60 * 60 * 1) {
    return '조금 전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(d, {addSuffix: true, locale: ko});
  }
  return format(d, 'p LLL do', {locale: ko});
}

export function isExpired(date: Date | number | string) {
  const d = new Date(+date);
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000;

  return diff > 60 * 60 * 24 * 7;
}
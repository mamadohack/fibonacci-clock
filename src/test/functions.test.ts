import * as _ from '../lib/util/helper'
import boxes from '../lib/util/boxes'


test('should round to midnight when', () => {
  const obj = {
    hours: 12,
    minutes: 0
}
    expect(_.formatTime(11,57,28)).toEqual(obj);
  });

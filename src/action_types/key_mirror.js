import * as R from 'ramda';

export const keyMirror = obj => {
    let newObj = {};
    R.map(item => {
      newObj[item] = {};
      newObj[item]['LOAD'] = `LOAD_${item}`;
      newObj[item]['SUCCESS'] = `${item}_SUCCESS`;
      newObj[item]['FAIL'] = `${item}_FAIL`;
    }, R.keys(obj));
    return newObj;
}


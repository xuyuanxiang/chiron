import { WxApiRequestOptions } from 'chiron-core';
import { build } from '../utils';
import { isArrayBuffer } from 'lodash-es';

export const request = build(function request({
  url,
  data,
  header = {},
  method = 'GET',
  dataType = 'json',
  responseType = 'text',
}: WxApiRequestOptions) {
  return new Promise<any>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.withCredentials = true;
    if (dataType === 'json') {
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    }
    if (typeof header === 'object') {
      Object.keys(header).forEach(key => {});
    }
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
      }
    };
    if (typeof data === 'string') {
      xhr.send(data);
    } else if (typeof data === 'object') {
      if (isArrayBuffer(data)) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    } else {
      xhr.send();
    }
  });
});

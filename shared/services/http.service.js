export const HttpService = {

  async _request(method, url) {
    return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.send();

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };

      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
    });
  },

  async get(url) {
    return this._request('GET', url);
  },

  async post(url) {
    return this._request('POST', url);
  },
  
  async put(url) {
    return this._request('PUT', url);
  },

  async delete(url) {
    return this._request('DELETE', url);
  }
}




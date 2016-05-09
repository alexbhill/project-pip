/* jshint worker: true */
onmessage = function (e) {
  const model = e.data.model,
    match = e.data.match,
    key = e.data.filterBy;

  postMessage(model.filter(function (item) {
    return match.length ? item[key][0] === match[0] : item[key] === match;
  }));
};

/* jshint worker: true */
onmessage = function (e) {
  const model = e.data.model,
    match = e.data.match,
    key = e.data.filterBy;

  postMessage(model.filter(function (item) {
    return item[key] === match;
  }));
};

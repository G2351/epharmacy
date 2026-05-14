const _ = require('lodash');
const removeEmpty = (obj) => {
     return _.omitBy(obj, value =>
          _.isNil(value) ||
          (_.isObject(value))
     );
}
module.exports = removeEmpty; 
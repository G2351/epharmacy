const validStatuses = ['pending', 'accepted', 'rejected', "confirmed"];

function isValidStatus(status) {
     return validStatuses.includes(status);
}
module.exports = isValidStatus;
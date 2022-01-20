const helpers = {};

helpers.getTimeLeft = (key) => {
    return (this.content[key].expires - Date.now())
}

module.exports = helpers;
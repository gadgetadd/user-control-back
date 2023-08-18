const bcrypt = require('bcrypt');

const hashPassword = function (next) {
    const hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
    next();
};

module.exports = hashPassword;
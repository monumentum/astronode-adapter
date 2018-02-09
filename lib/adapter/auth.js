class AuthAdapter {
    constructor({api, tokenActions}) {
        this._api = api;
        this.tokenActions = tokenActions;

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(body) {
        const query = {};

        this._api.fieldsToCheck.forEach(key => {
            query[key] = body[key];
        });

        return this._api.modelGetter(query).then(item => {
            if (!item) throw new Error('NotFound');
            return this.tokenActions.create(item);
        });
    }

    logout(id) {
        return this.tokenActions.remove(id);
    }
}

module.exports = AuthAdapter;
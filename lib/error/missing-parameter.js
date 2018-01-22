class MissingParameter extends Error {
    static renderTemplate(method, param) {
        return `Method ${method} is missing the param(s): ${param}.`;
    }

    constructor(method, param) {
        super(MissingParameter.renderTemplate(method, param));
        Error.captureStackTrace(this, MissingParameter);
    }
}

module.exports = MissingParameter;
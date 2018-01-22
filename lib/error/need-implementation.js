class NeedImplementation extends Error {
    static renderTemplate(method) {
        return `Miss implementation for method ${method}, check the docs.`;
    }

    constructor(method) {
        super(NeedImplementation.renderTemplate(method));
        Error.captureStackTrace(this, NeedImplementation);
    }
}

module.exports = NeedImplementation;
module.exports = promise => (req, res) =>
    promise(req)
        .then(response => res.status(200).json(response))
        .catch(error => res.status(500).json({ error }));
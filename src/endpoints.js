module.exports = function (app) {
    app.get("/users/:id", (req, res) => {
        const filter = req.query.filter;

        return res.status(404).send(true);
    });
};

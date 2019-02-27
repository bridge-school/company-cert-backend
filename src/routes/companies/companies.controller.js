const db = require("../../db");

const companiesController = (req, res) => {
    db.collection('companies')
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data()))
    .then(data=>{
        res.json({
            data
        })
    })
    .catch (error => console.error('companies data error', error));
};

module.exports = {
    companiesController
}

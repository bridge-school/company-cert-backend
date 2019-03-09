const db = require('../../db');

// exports.index = get all the companies
exports.index = (req, res) => {
  db.collection('companies')
    .get()
    .then(snapshot =>
      snapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
      })
    )
    .then(data => {
      res.json({
        data
      });
    })
    .catch(error => console.error('companies data error', error));
};

// exports.store = create a new company
exports.store = (req, res) => {
  db.collection('companies')
    .add({
      name: req.body.companyName,
      interview_date: req.body.interviewDate,
      score: req.body.score,
      checked_checklist_ids: req.body.checkedIds,
      industry: req.body.industry,
      tech: req.body.tech,
      created_at: new Date().getTime()
    })
    .then(data => {
      // @TODO define structure for responses as a group
      res.json({
        id: data.id
      });
    })
    .catch(error => console.error('Error adding document: ', error));
};

// exports.show = get one company
exports.show = (req, res) => {
  db.collection('companies')
    .doc(req.params.id)
    .get()
    .then(doc => res.json(doc.data()))
    .catch(error => console.error('Error getting company data: ', error));
};

// exports.update = update a company
// exports.destroy = delete a company

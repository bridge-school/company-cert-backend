const axios = require('axios');
const db = require('../../db');
const matchStudentWithCompanies = require('../../matches');

exports.index = (req, res) => {
  db.collection('students')
    .get()
    .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    .then(data => res.json(data))
    .catch(err => console.error('Error getting student data', err));
};

exports.store = (req, res) => {
  db.collection('students')
    .add({
      name: req.body.studentName,
      interview_date: req.body.interviewDate,
      industry: req.body.industry,
      tech: req.body.tech,
      created_at: new Date().toISOString()
    })
    .then(data => {
      res.json({
        id: data.id
      });
    })
    .then(() => {
      // Get all certified companies --- refactor
      const companiesRef = db.collection('companies');
      let dbQuery = companiesRef;
      if (req.query.filter === 'certified') {
        dbQuery = companiesRef.where('score', '>=', 6); // Needs to be updated
      }
      return dbQuery
        .get()
        .then(snapshot =>
          snapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id };
          })
        )
        .then(companies => {
          // Run the matching algorithm
          const student = req.body;
          console.log(req.body);
          return matchStudentWithCompanies.matches(student, companies);
        });
    })
    .then(data => {
      // Post message to Slack
      console.log('The matches: ', data);
      const numberOfMatches = data.length;
      axios
        .post(process.env.SLACK_WEBHOOK, {
          text: `${
            req.body.studentName
          } has been matched up with ${numberOfMatches} companies.\nView the matches here: http://company-cert-frontend.bridgeschoolapp.io/`
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => console.error('Error adding document: ', error));
};

exports.show = (req, res) => {
  db.collection('students')
    .doc(req.params.id)
    .get()
    .then(doc => res.json(doc.data()))
    .catch(error => console.error('Error getting student data: ', error));
};

const axios = require('axios');
const db = require('../../db');
const matchStudentWithCompanies = require('../../matches');
const frontendDataRespository = require('../frontend-data/frontend-data.repository');

exports.index = (req, res) => {
  db.collection('students')
    .get()
    .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    .then(data => res.json(data))
    .catch(err => console.error('Error getting student data', err));
};

exports.store = (req, res) => {
  // Save the results of a promise for later use
  let studentId;
  db.collection('students')
    .add({
      name: req.body.studentName,
      interview_date: req.body.interviewDate,
      industry: req.body.industry,
      tech: req.body.tech,
      created_at: new Date().toISOString()
    })
    .then(student => {
      studentId = student.id;
      res.json({
        id: studentId
      });
    })
    .then(() => {
      // Get checklist questions count to calculate score
      return frontendDataRespository.getQuestionsCount();
    })
    .then(count => {
      // Get all certified companies
      const minScore = Math.round(count * 0.6);

      // Create a reference to the companies collection
      const companiesRef = db.collection('companies');

      // Create a query against the collection
      const dbQuery = companiesRef.where('score', '>=', minScore).orderBy('score', 'desc');

      return dbQuery
        .orderBy('name', 'asc')
        .get()
        .then(snapshot =>
          snapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id };
          })
        )
        .then(companies => {
          // Run the matching algorithm
          const student = req.body;
          return matchStudentWithCompanies.matches(student, companies);
        });
    })
    .then(matches => {
      // Post message to Slack
      const numberOfMatches = matches.length;
      const noun = numberOfMatches === 1 ? 'company' : 'companies';

      if (numberOfMatches > 0) {
        axios
          .post(process.env.SLACK_WEBHOOK, {
            text: `*${
              req.body.studentName
            }* has been matched up with *${numberOfMatches} ${noun}*.\nView the matches here: http://company-cert-frontend.bridgeschoolapp.io/students/${studentId}`
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      }
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

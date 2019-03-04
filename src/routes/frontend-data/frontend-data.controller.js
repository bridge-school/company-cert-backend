/* 
*  This is the end point for fetching all the
*  Front end data  
*/

const db = require('../../db');

// exports.index = get all the front end data for render
exports.index = (req, res) => {
  db.collection('front_end_data')
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data()))
    .then(data => data.reduce((acc,curr)=>{
      return {
        ...acc,
        ...curr
      }
    },{}))
    .then(data => {
      res.json({
        ...data
      });
    })
    .catch(error => console.error('frontend-data collection error', error));
};

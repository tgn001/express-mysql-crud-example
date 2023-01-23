var express = require('express');
const connection = require('../config/database-config');
var router = express.Router();

/* GET all employees listing. */
router.get('/employees', function(req, resp, next) {

  connection.query('SELECT * FROM employees', (err, res) => {
    if (err) return next(err);

    resp.send(res);
  });
  
});

/* Get employee based on id*/
router.get('/employee/:id', (req, resp, next) => {
  connection.query('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, res) => {
    if (err) return next(err);

    resp.send(res);
  });
});

/* Add new employee*/
router.post('/employee', (req, resp, next) => {
  const { name, role } = req.body;

  connection.query(
    'INSERT INTO employees(name, role) VALUES(?, ?)',
    [name, role],
    (err, res) => {
      if (err) return next(err);

      resp.send(res);
    }
  );
});

/* Edit existing employee based on id*/
router.put('/employee/:id', (req, resp, next) => {
  const employees = ['name', 'role'];
  const records = [];

  employees.forEach(emp => {
    if (req.body[emp]) records.push(emp);
  });

  records.forEach((rec, index) => {
    connection.query(
      `UPDATE employees SET ${rec}=? WHERE id=?`,
      [req.body[rec], req.params.id],
      (err, res) => {
        if (err) return next(err);

        if (index === records.length - 1) 
        resp.send(res);
      }
    )
  });
});

/* Delete employee based on id*/
router.delete('/employee/:id', (req, resp, next) => {

  connection.query('DELETE FROM employees WHERE id=?', [req.params.id], (err, res) => {
    if (err) return next(err);

    resp.send(res);
  });
});

/* Delete all employees*/
router.delete('/employees', (req, resp, next) => {

  connection.query('DELETE FROM employees ', (err, res) => {
    if (err) return next(err);

    resp.send(res);
  });
});
module.exports = router;

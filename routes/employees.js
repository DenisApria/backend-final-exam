var express = require('express');
var router = express.Router();

const employeeService = require('../services/employeeService');

router.get('/all', employeeService.getAll);
router.get('/:id', employeeService.getOne);
router.post('/add', employeeService.add);
router.put('/:id', employeeService.update);

router.post('/search', employeeService.search);

module.exports = router;
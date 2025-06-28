const { createTask, fetchAllTask, updateTaskById, deleteTaskById } = require('../Controllers/CreateTaskController');

const router = require('express').Router();

// Methods

router.post('/',createTask);

router.get('/',fetchAllTask);

router.put('/:id',updateTaskById);

router.delete('/:id',deleteTaskById);

module.exports = router;
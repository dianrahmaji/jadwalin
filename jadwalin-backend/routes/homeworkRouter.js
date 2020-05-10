const router = require('express').Router();
const auth = require('../middlewares/authentication');
const homeworkController = require('../controllers/homeworkController');

router.post('/add', auth.verifyToken, homeworkController.addHomework);
router.get('/get/:user_id', auth.verifyToken, homeworkController.getAllHomeworks);
router.put('/done/:homework_id', auth.verifyToken, homeworkController.markHomeworkDone);
router.delete('/delete/:homework_id', auth.verifyToken, homeworkController.deleteHomework);

module.exports = router;
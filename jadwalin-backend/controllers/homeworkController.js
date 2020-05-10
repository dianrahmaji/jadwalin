const jwt = require('jsonwebtoken');
const Homework = require('../models/homeworkModel');

async function addHomework(req, res, next) {
  try {
    const data = req.body;
    const token = req.headers['authorization'];
    const decoded = await jwt.decode(token.split(' ')[1]);
    const id = decoded.userToken.id;

    const homework = new Homework({
      title: data.title,
      course: data.course,
      due_date: data.due_date,
      difficulty: data.difficulty,
      user_id: id,
    });

    const savedHomework = await homework.save();
    res.status(200).json({
      message: 'homework saved',
      homework: savedHomework
    })
  } catch(err) {
    res.status(500).json({ message: 'error server' });
    console.log(err);
  }
}

async function getAllHomeworks(req, res, next) {
  try {
    const user_id = req.params.user_id;
    const homework = await Homework.find({user_id}).sort('status');
    if(!!homework) {
      res.status(200).json({message: 'data found', homework})
    } else {
      res.status(404).json({message: 'data not found'})
    }
  } catch(err) {
    res.status(500).json({ message: 'error server' });
  }
};

async function markHomeworkDone(req, res, next) {
  try {
    let data = req.params.homework_id;
    const homework = await Homework.findByIdAndUpdate(data, {status: 'done'});
    if(!!homework) {
      res.status(200).json({message: 'data changed', homework})
    } else {
      res.status(404).json({message: 'data not found'})
    }
  } catch {
    res.status(500).json({ message: 'error server' });
  }
};

async function deleteHomework(req, res, next) {
  try {
    let data = req.params.homework_id;
    const homework = await Homework.findByIdAndDelete(data);
    if(!!homework) {
      res.status(200).json({message: 'data deleted', homework})
    } else {
      res.status(404).json({message: 'data not found'})
    }
  } catch(err) {
    res.status(500).json({ message: 'error server' });
  }
}

exports.addHomework = addHomework;
exports.getAllHomeworks = getAllHomeworks;
exports.markHomeworkDone = markHomeworkDone;
exports.deleteHomework = deleteHomework;
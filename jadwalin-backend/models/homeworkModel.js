const mongoose = require('mongoose');

const homeworkSchema = new mongoose.Schema({
  title: { type: String },
  course: { type: String },
  due_date: { type: Date },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'] },
  status: { type: String, enum: ['ongoing', 'done', 'overdue'], default: 'ongoing' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'  },
});

const Homework = mongoose.model('Homework', homeworkSchema);

module.exports = Homework;
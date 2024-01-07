import { Schema, model } from 'mongoose';

interface CourseType {
  _id: string;
  courseId: string;
  courseName: string;
  numberOfStudents: number;
  dateOfWeeks: string[];
  dateOfEnd: string;
  dateOfStart: string;
  status: string;
  sessions: number;
  dates: string[];
}

const CourseSchema = new Schema({
  courseId: {
    type: String,
    unique: true,
    required: [true, 'Course ID is required']
  },
  courseName: {
    type: String,
    required: [true, 'Book name is required']
  },
  numberOfStudents: {
    type: Number,
    default: 0,
    required: [true, 'Number of students is required']
  },
  dateOfWeeks: {
    type: [
      {
        type: String
      }
    ],
    required: [true, 'Date of week is required']
  },

  dateOfEnd: {
    type: String
  },
  dateOfStart: {
    type: String,
    required: [true, 'Date of start is required']
  },
  dates: {
    type: [
      {
        type: String
      }
    ],
    required: [true, 'Dates is required']
  },
  sessions: {
    type: Number,
    required: [true, 'Sessions is required']
  },
  status: {
    type: String,
    enum: ['đang học', 'đã kết thúc', 'chưa học'],
    default: 'đang học'
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = model<CourseType>('Course', CourseSchema);
export default Course;

import { Schema, model } from 'mongoose';

interface CourseType {
  _id: string;
  student: string;
  course: string;
  firstGrade: number;
  secondGrade: number;
  thirdGrade: number;
  createdAt: Date;
}

const CourseSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  },
  course: {
    type: String,
    required: [true, 'Course ID is required']
  },
  firstGrade: {
    type: Number
  },
  secondGrade: {
    type: Number
  },
  thirdGrade: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = model<CourseType>('Course', CourseSchema);
export default Course;

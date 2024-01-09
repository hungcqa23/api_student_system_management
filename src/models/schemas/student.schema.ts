import { Query, Schema, model } from 'mongoose';
export interface StudentType {
  _id: string;
  studentId: string;
  courseId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  dateOfBirth: string;
  address: string;
  courses: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema = new Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  dateOfBirth: {
    type: String,
    required: [true, 'Date of birth is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  status: {
    type: String,
    enum: ['đang học', 'đã học', 'thôi học'],
    default: 'đang học'
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  updatedAt: {
    type: Date,
    default: Date.now
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

StudentSchema.index({ email: 1, courseId: 1 }, { unique: true });
StudentSchema.index({ studentId: 1, courseId: 1 }, { unique: true });

StudentSchema.pre(/^find/, function (next) {
  (this as Query<any, any, {}, any, 'find'>).populate({
    path: 'courseId',
    select: 'courseId courseName'
  });
  next();
});

const Student = model<StudentType>('Student', StudentSchema);
export default Student;

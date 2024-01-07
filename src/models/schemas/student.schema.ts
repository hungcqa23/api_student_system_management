import { Schema, model } from 'mongoose';

interface StudentType {
  _id: string;
  studentId: string;
  fullName: string;
  phoneNumber: string;
  phoneNumberRelative: string;
  fullNameRelative: string;
  addressRelative: string;
  email: string;
  dateOfBirth: Date;
  address: string;
  password: string;
  status: string;
  courses: string;
  createdAt: Date;
  updatedAt: Date;
}
const UserSchema = new Schema({
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
  phoneNumberRelative: {
    type: String
  },
  fullNameRelative: {
    type: String
  },
  addressRelative: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  status: {
    type: String,
    enum: ['đang học', 'đã học', 'thôi học'],
    default: 'đang học'
  },
  course: {
    type: [Schema.Types.ObjectId],
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

const Student = model<StudentType>('Student', UserSchema);
export default Student;

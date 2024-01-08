import { Query, Schema, model } from 'mongoose';

export interface AttendanceType {
  _id: string;
  studentId: string;
  courseId: string;
  attendanceDates: boolean[];
}
const AttendanceSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  attendanceDates: [Boolean]
});

AttendanceSchema.pre(/^find/, function (next) {
  const query = this as Query<any, any, {}, any, 'find'>;
  // Populate studentId and filter out documents with null studentId
  query.populate({
    path: 'studentId',
    select: 'fullName studentId',
    match: { active: true }
  });

  next();
});

const Attendance = model<AttendanceType>('Attendance', AttendanceSchema);

export default Attendance;

import { Schema, model } from 'mongoose';

interface AttendanceType {
  _id: string;
  studentId: string;
  attendanceDates: {
    date: Date;
    status: string;
  }[];
}
const attendanceSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  attendanceDates: [
    {
      date: {
        type: String,
        required: true
      },
      status: {
        type: String,
        enum: ['yes', 'no'],
        default: 'no'
      }
    }
  ]
});

const Attendance = model<AttendanceType>('Attendance', attendanceSchema);

export default Attendance;

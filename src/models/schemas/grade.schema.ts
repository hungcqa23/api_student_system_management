import { Query, Schema, model } from 'mongoose';

export interface GradeType {
  _id: string;
  student: string;
  course: string;
  grades: Record<number, number>;
  createdAt: Date;
}

const GradeSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student'
  },
  course: {
    type: Schema.Types.ObjectId,
    required: [true, 'Course ID is required']
  },
  grades: {
    type: Map,
    of: Number,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

GradeSchema.pre(/^find/, function (next) {
  (this as Query<any, any, {}, any, 'find'>).populate({
    path: 'student',
    select: 'fullName studentId',
    match: { active: true }
  });
  next();
});

const Grade = model<GradeType>('Grade', GradeSchema);
export default Grade;

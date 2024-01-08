import { Query, Schema, model } from 'mongoose';

export interface TuitionFeeType {
  _id: string;
  studentId: string;
  courseId: string;
  hasTuitionFee: boolean;
}
const TuitionFeeSchema = new Schema({
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
  hasTuitionFee: {
    type: Boolean,
    required: true,
    default: false
  }
});

TuitionFeeSchema.pre(/^find/, function (next) {
  const query = this as Query<any, any, {}, any, 'find'>;
  // Populate studentId and filter out documents with null studentId
  query.populate({
    path: 'studentId',
    select: 'fullName studentId email phoneNumber status',
    match: { active: true }
  });

  next();
});

const TuitionFee = model<TuitionFeeType>('tuition_fee', TuitionFeeSchema);

export default TuitionFee;

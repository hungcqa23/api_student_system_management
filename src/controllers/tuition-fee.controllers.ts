import factory from './factory.controllers';
import catchAsync from '~/utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '~/constants/messages';
import AppError from '~/utils/app-error';
import TuitionFee, { TuitionFeeType } from '~/models/schemas/tuition-fee.schema';

const getTuitionFee = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tuitionFees: TuitionFeeType[] | null = await TuitionFee.find({
    courseId: req.params.id
  });

  if (!tuitionFees) {
    return next(new AppError(MESSAGES.NO_DOCUMENT_WAS_FOUND, 404));
  }

  // Filter out entries where studentId is null
  const doc = tuitionFees.filter(tuitionFee => tuitionFee.studentId !== null);

  res.status(200).json({
    status: 'success',
    data: {
      doc
    }
  });
});

const getAllTuitionFees = factory.getAll(TuitionFee);
const createTuitionFee = factory.createOne(TuitionFee);
const deleteTuitionFee = factory.deleteOne(TuitionFee);
const updateTuitionFee = factory.updateOne(TuitionFee);

export default {
  getAllTuitionFees,
  createTuitionFee,
  getTuitionFee,
  deleteTuitionFee,
  updateTuitionFee
};

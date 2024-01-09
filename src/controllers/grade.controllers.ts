import factory from './factory.controllers';
import catchAsync from '~/utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '~/constants/messages';
import { calculateEndDate } from '~/utils/date';
import AppError from '~/utils/app-error';
import Grade, { GradeType } from '~/models/schemas/grade.schema';

const getAllGrades = factory.getAll(Grade);

const getGrade = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const grades: GradeType[] | null = await Grade.find({
    course: req.params.id
  });

  if (!grades) {
    return next(new AppError(MESSAGES.NO_DOCUMENT_WAS_FOUND, 404));
  }

  // Filter out entries where studentId is null
  const doc = grades.filter(grade => grade.student !== null);

  res.status(200).json({
    status: 'success',
    data: {
      doc
    }
  });
});

const deleteGrade = factory.deleteOne(Grade);
const updateGrade = factory.updateOne(Grade);

export default {
  getAllGrades,
  getGrade,
  deleteGrade,
  updateGrade
};

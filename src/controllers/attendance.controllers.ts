import factory from './factory.controllers';
import catchAsync from '~/utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '~/constants/messages';
import { calculateEndDate } from '~/utils/date';
import Attendance from '~/models/schemas/attendance.schema';
import AppError from '~/utils/app-error';

const createAttendance = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { courseId, courseName, dateOfWeeks, dateOfStart, sessions } = req.body;
  const dates: string[] = [];
  const dateOfEnd = calculateEndDate({
    dateOfStart: dateOfStart,
    numberOfSessions: sessions,
    weeklySchedule: dateOfWeeks,
    dates
  });

  const doc = await Attendance.create({
    courseId,
    courseName,
    dateOfWeeks,
    dateOfEnd,
    dateOfStart,
    dates,
    sessions
  });

  res.status(201).json({
    status: MESSAGES.CREATED_SUCCESSFULLY,
    data: {
      doc
    }
  });
});

const getAllAttendances = factory.getAll(Attendance);

const getAttendance = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.params.id);
  const doc = await Attendance.find({
    courseId: req.params.id
  });

  if (!doc) {
    return next(new AppError(MESSAGES.NO_DOCUMENT_WAS_FOUND, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      doc
    }
  });
});

const deleteAttendance = factory.deleteOne(Attendance);
const updateAttendance = factory.updateOne(Attendance);

export default {
  getAllAttendances,
  getAttendance,
  createAttendance,
  deleteAttendance,
  updateAttendance
};

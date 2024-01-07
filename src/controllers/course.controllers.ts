import Course from '~/models/schemas/course.schema';
import factory from './factory.controllers';
import catchAsync from '~/utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '~/constants/messages';
import { calculateEndDate } from '~/utils/date';

const createCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { courseId, courseName, dateOfWeeks, dateOfStart, sessions } = req.body;
  const dates: string[] = [];
  const dateOfEnd = calculateEndDate({
    dateOfStart: dateOfStart,
    numberOfSessions: sessions,
    weeklySchedule: dateOfWeeks,
    dates
  });

  const doc = await Course.create({
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

const getAllCourse = factory.getAll(Course);
const getCourse = factory.getOne(Course);
const deleteCourse = factory.deleteOne(Course);
const updateCourse = factory.updateOne(Course);

export default {
  getAllCourse,
  getCourse,
  createCourse,
  deleteCourse,
  updateCourse
};

import Course from '~/models/schemas/course.schema';
import factory from './factory.controllers';
import catchAsync from '~/utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '~/constants/messages';
import { calculateEndDate } from '~/utils/date';
import Student, { StudentType } from '~/models/schemas/student.schema';

const createCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId, courseName, dateOfWeeks, dateOfStart, sessions, tuitionFee } = req.body;
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
    dateOfEnd: dates[dates.length - 1] || dateOfEnd,
    dateOfStart,
    dates,
    sessions,
    tuitionFee
  });

  res.status(201).json({
    status: MESSAGES.CREATED_SUCCESSFULLY,
    data: {
      doc
    }
  });
});

const getStatistics = catchAsync(async (req: Request, res: Response) => {
  const courses = await Course.find({
    active: true
  });
  const students: StudentType[] = await Student.find({
    active: true
  });
  const studentsSet = new Set(students.map(student => student.email));

  res.status(201).json({
    status: MESSAGES.CREATED_SUCCESSFULLY,
    data: {
      numberCourses: courses.length,
      numberStudents: studentsSet.size
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
  updateCourse,
  getStatistics
};

import factory from './factory.controllers';
import catchAsync from '~/utils/catchAsync';
import { Request, Response, NextFunction } from 'express';
import { MESSAGES } from '~/constants/messages';
import Student, { StudentType } from '~/models/schemas/student.schema';
import Course, { CourseType } from '~/models/schemas/course.schema';
import AppError from '~/utils/app-error';
import Attendance from '~/models/schemas/attendance.schema';
import TuitionFee from '~/models/schemas/tuition-fee.schema';
import Grade from '~/models/schemas/grade.schema';

const createStudent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { studentId, fullName, phoneNumber, dateOfBirth, address, email, courseId } = req.body;

  const doc = await Student.create({
    studentId,
    fullName,
    phoneNumber,
    dateOfBirth,
    address,
    email,
    courseId
  });

  const course: CourseType | null = await Course.findByIdAndUpdate(courseId, {
    $inc: { numberOfStudents: 1 }
  });

  if (!course) {
    return next(new AppError(MESSAGES.NO_DOCUMENT_WAS_FOUND, 404));
  }
  const dates = Array.from({ length: course.sessions }).fill(false);

  await Promise.all([
    Attendance.create({
      studentId: doc._id,
      courseId: course?._id,
      attendanceDates: dates
    }),
    TuitionFee.create({
      studentId: doc._id,
      courseId: course?._id,
      hasTuitionFee: false
    }),
    Grade.create({
      student: doc._id,
      course: course?._id,
      grades: []
    })
  ]);

  res.status(201).json({
    status: MESSAGES.CREATED_SUCCESSFULLY,
    data: {
      doc
    }
  });
});

// const getAllStudent = factory.getAll(Student);
const getAllStudent = factory.getAll(Student);
const getStudent = factory.getOne(Student);
const deleteStudent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const student: StudentType | null = await Student.findByIdAndUpdate(req.params.id, { active: false });

  if (!student) {
    return next(new AppError(MESSAGES.NO_DOCUMENT_WAS_FOUND, 404));
  }

  await Course.findByIdAndUpdate(student.courseId, {
    $inc: { numberOfStudents: -1 }
  });

  res.status(204).json({
    status: MESSAGES.DELETED_SUCCESSFULLY
  });
});
const updateStudent = factory.updateOne(Student);
const recoverStudent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const student: StudentType | null = await Student.findByIdAndUpdate(
    req.params.id,
    { active: true },
    {
      new: true
    }
  );
  if (!student) {
    return next(new AppError(MESSAGES.NO_DOCUMENT_WAS_FOUND, 404));
  }
  await Course.findByIdAndUpdate(student.courseId, {
    $inc: { numberOfStudents: 1 }
  });

  res.status(200).json({
    status: MESSAGES.UPDATED_SUCCESSFULLY,
    data: {
      student
    }
  });
});

export default {
  getAllStudent,
  getStudent,
  createStudent,
  deleteStudent,
  updateStudent,
  recoverStudent
};

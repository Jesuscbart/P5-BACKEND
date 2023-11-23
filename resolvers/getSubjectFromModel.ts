import { Subject } from "../types.ts";
import { SubjectModelType } from "../db/subject.ts";
import { TeacherModel } from "../db/teacher.ts";
import { StudentModel } from "../db/student.ts";

export const getSubjectFromModel = async (subject: SubjectModelType): Promise => {
    
    try{

        const id = req.params.id;
        const subject = await SubjectModel.findById(id).exec();
        if (!subject) {
            res.status(404).json({ error: "Subject not found" }).send();
        }

        const teacher = await TeacherModel.findById(subject?.teacherID);
        const students = await StudentModel.find({ _id: { $in: subject?.studentsID }});

        const subjectResponse = {
            id: subject.id,
            name: subject.name,
            year: subject.year,
            teacher: {
                id: teacher!.id,
                name: teacher!.name,
                email: teacher!.email,
            },
            students: students.map(student => ({
                id: student.id,
                name: student.name,
                email: student.email,
            }))
        };

        }


    }
     

    
    
}
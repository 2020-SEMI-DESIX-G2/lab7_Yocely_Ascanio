const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  nombre: { type: String },
  edad: { type: String },
});

const Estudiantes = mongoose.model('Estudiantes', schema);

module.exports = Estudiantes;

const students = [];


exports.getStudents = function (req, res) {
    if (students.length === 0) {
        return res.status(400).json({ message: `no hay estudiantes.` });
    }
    res.send(students);
}


exports.addStudent = function (req, res) {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const id = students.length + 1;

    students.push({ id, name, lastname });

    res.send(students);

}

exports.getSpecificStudent = function (req, res) {
    const id = req.params.id;

    let student = students.filter(student => {
        return student.id == id;
    })[0];

    if (student) {
        return res.send(student);
    }
    res.json({ message: `Student ${id} doesn't exist.` });
}

exports.updateStudent = function (req, res) {
    const id = req.params.id;

    let student = students.filter(student => {
        return student.id == id;
    })[0];

    if (student) {
        const index = students.indexOf(student);

        const keys = Object.keys(req.body);

        keys.forEach(key => {
            student[key] = req.body[key];
        });

        students[index] = student;

        return res.send(students[index]);
    }

    res.json({ message: `Student ${id} doesn't exist.` });
}


exports.deleteStudent = function (req, res) {
    const id = req.params.id;

    let student = students.filter(student => {
        return student.id == id;
    })[0];

    if (student) {

        const index = students.indexOf(student);

        students.splice(index, 1);

        return res.json({ message: `Student ${id} deleted.` });
    }

    res.json({ message: `Student ${id} doesn't exist.` });
    }
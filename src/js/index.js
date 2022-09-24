import {controller} from './controller.js';

const table = document.getElementById('table');
const addForm = document.getElementById('add');
const addInput = document.getElementById('addInput');

addForm.addEventListener('submit', async e => {
    e.preventDefault();
    
    const name = addInput.value;

    const isExist = await checkName(name);

    if(!isExist) {
        let body = {
            name,
            marks: [0,0,0,0,0,0,0,0,0,0],
            email: "first{{i}}.last{{i}}@mail.com"
        };
    
        await controller('/students/', 'POST', body);

        let studentList = await controller('/students');
        let newStudent = await studentList.find(student => student.name === name);

        renderStudent(newStudent);
    } else {
        alert(`Student ${name} is already in table!`)
    };
});

function renderStudent(student) {
        const tr = document.createElement('tr');
        const tdName = document.createElement('td');
        const button = document.createElement('button');

        button.classList.add('dlt-btn');
        button.innerText = 'X';

        button.addEventListener('click', () => {
            controller(`/students/${student.id}`, 'DELETE');
            tr.remove();
        });

        tdName.append(button);
        tdName.append(student.name);
        tr.append(tdName);

        student.marks.forEach((mark, i) => {
            const tdMark = document.createElement('td');
            const input = document.createElement('input');

            input.classList.add('markInput');
            input.setAttribute('value', `${mark}`);

            input.addEventListener('change', () => {
                student.marks[i] = +input.value;
                let body = Object.assign({}, student);
                delete body.id;

                controller(`/students/${student.id}`, 'PUT', body);
            });

            tdMark.append(input);
            tr.append(tdMark);
        });

        table.append(tr);
};

async function renderTable() {
    const studentList = await controller('/students');

    studentList.forEach(student => renderStudent(student));
};

async function checkName(name) {
    const studentList = await controller('/students');
    return studentList.some(student => student.name === name);
};

renderTable();

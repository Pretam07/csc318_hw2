document.addEventListener('DOMContentLoaded', () => {
    const courseRows = document.getElementById('course-rows');
    const addRowBtn = document.getElementById('add-row');
    const calculateBtn = document.getElementById('calculate');
    const resetBtn = document.getElementById('reset');
    const gpaOutput = document.getElementById('gpa');

    const gradePoints = {
        'A': 4.0,
        'B+': 3.5,
        'B': 3.0,
        'C+': 2.5,
        'C': 2.0,
        'D': 1.0,
        'F': 0.0
    };

    function addRow() {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="course-checkbox" checked></td>
            <td><input type="text" placeholder="Course #"></td>
            <td>
                <select>
                    <option value="">--</option>
                    <option value="A">A</option>
                    <option value="B+">B+</option>
                    <option value="B">B</option>
                    <option value="C+">C+</option>
                    <option value="C">C</option>                    
                    <option value="D">D</option>
                    <option value="F">F</option>
                </select>
            </td>
            <td><input type="number" placeholder="Credits"></td>
            <td><button class="remove-row">x</button></td>
        `;
        courseRows.appendChild(row);
    }

    function calculateGPA() {
        let totalPoints = 0;
        let totalCredits = 0;

        document.querySelectorAll('#course-rows tr').forEach(row => {
            const checkbox = row.querySelector('.course-checkbox');
            if (checkbox.checked) {
                const grade = row.querySelector('td:nth-child(3) select').value.toUpperCase();
                const credits = parseFloat(row.querySelector('td:nth-child(4) input').value);

                if (gradePoints[grade] !== undefined && !isNaN(credits) && credits > 0) {
                    totalPoints += gradePoints[grade] * credits;
                    totalCredits += credits;
                }
            }
        });

        const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00';
        gpaOutput.value = gpa;
    }

    function resetTable() {
        courseRows.innerHTML = '';
        gpaOutput.value = '';
        for (let i = 0; i < 6; i++) {
            addRow();
        }
    }

    addRowBtn.addEventListener('click', addRow);
    calculateBtn.addEventListener('click', calculateGPA);
    resetBtn.addEventListener('click', resetTable);

    courseRows.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-row')) {
            e.target.closest('tr').remove();
        }
    });

    // Add initial six rows
    resetTable();
    //new changes made
});
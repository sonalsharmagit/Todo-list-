let tasks = [];

const addtask = () => {
    const taskinput = document.getElementById('taskinput');
    const text = taskinput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskinput.value = ''; // Clear the input after adding
        updateTasksList();
        updateProgress();
    }
};

const updateTasksList = () => {
    const tasklist = document.getElementById('tasklist');
    tasklist.innerHTML = '';

    tasks.forEach((task, index) => {
        const listitem = document.createElement('li');

        listitem.innerHTML = `
            <div class="taskitem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <i class="fa-solid fa-pen-to-square" onclick="editTask(${index})"></i>
                    <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>
                </div>
            </div>
        `;

        listitem.querySelector('input').addEventListener('change', () => {
            toggleTaskComplete(index);
        });

        tasklist.append(listitem);
    });

    updateProgress(); // Update progress after listing tasks
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateProgress();
};

const editTask = (index) => {
    const newTask = prompt('Edit your task:', tasks[index].text);
    if (newTask) {
        tasks[index].text = newTask.trim();
        updateTasksList();
        updateProgress();
    }
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updateProgress();
};

const updateProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const progressBar = document.getElementById('progress');
    const numbers = document.getElementById('numbers');

    progressBar.style.width = `${progress}%`;
    numbers.textContent = `${completedTasks}/${totalTasks}`;

    // Show party popper if all tasks are complete
    if (totalTasks > 0 && completedTasks === totalTasks) {
        showPartyPopper();
    } else {
        hidePartyPopper();
    }
};

const showPartyPopper = () => {
    hidePartyPopper(); // Ensure only one instance is active

    // Create popper and message elements
    const partyPopper = document.createElement('div');
    partyPopper.classList.add('party-popper');
    partyPopper.innerHTML = '<div class="popper">🎉</div><div class="message">Congrats! All Tasks are completed!</div>';
    
    document.body.appendChild(partyPopper);

    setTimeout(() => {
        partyPopper.classList.add('popper-active');
    }, 100); // Add a slight delay for effect

    // Add event listener to hide popper on click anywhere
    document.addEventListener('click', hidePartyPopperOnClick, { once: true });
};

const hidePartyPopper = () => {
    const partyPopper = document.querySelector('.party-popper');
    if (partyPopper) {
        partyPopper.remove(); // Remove the popper from the DOM
    }
};

// Function to hide popper on click
const hidePartyPopperOnClick = () => {
    hidePartyPopper();
};

document.getElementById('newtask').addEventListener('click', function(e) {
    e.preventDefault();
    addtask();
});

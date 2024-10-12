// Handling the form submission and saving schedule to localStorage
document.getElementById("schedule-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const task = document.getElementById("task").value;
    const time = document.getElementById("time").value;
    const reminderTime = document.getElementById("reminder-time").value;

    const schedule = {
        task,
        time,
        reminderTime,
        completed: false
    };

    // Save the schedule to localStorage
    saveScheduleToLocalStorage(schedule);
    alert("Schedule saved successfully!");

    // Clear form
    document.getElementById("schedule-form").reset();
});

// Save schedule to localStorage
function saveScheduleToLocalStorage(schedule) {
    let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    schedules.push(schedule);
    localStorage.setItem("schedules", JSON.stringify(schedules));
}

// Checking if it's time to remind the user
setInterval(checkReminders, 60000); // Every 1 minute

function checkReminders() {
    let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

    const now = new Date();
    const currentTime = now.toTimeString().substr(0, 5); // Get current time in HH:MM format

    schedules.forEach(schedule => {
        if (schedule.reminderTime === currentTime && !schedule.completed) {
            showReminder(schedule);
        }
    });
}

// Show reminder modal
function showReminder(schedule) {
    const modal = document.getElementById("reminder-modal");
    const message = document.getElementById("reminder-message");

    message.textContent = `Reminder: ${schedule.task}`;
    modal.style.display = "block";

    // Mark as completed in localStorage
    markScheduleAsCompleted(schedule);

    // Close modal when clicking the close button
    document.querySelector(".close").onclick = function () {
        modal.style.display = "none";
    };
}

// Mark schedule as completed
function markScheduleAsCompleted(scheduleToMark) {
    let schedules = JSON.parse(localStorage.getItem("schedules")) || [];

    schedules = schedules.map(schedule => {
        if (schedule.task === scheduleToMark.task && schedule.time === scheduleToMark.time) {
            schedule.completed = true;
        }
        return schedule;
    });

    localStorage.setItem("schedules", JSON.stringify(schedules));
}

document.getElementById("schedule-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const task = document.getElementById("task").value;
    const time = document.getElementById("time").value;
    const reminderTime = document.getElementById("reminder-time").value;

    // New: Get custom background color and image
    const bgColor = document.getElementById("bg-color").value;
    const bgImageFile = document.getElementById("bg-image").files[0];

    let bgImageUrl = null;
    if (bgImageFile) {
        const reader = new FileReader();
        reader.onloadend = function () {
            bgImageUrl = reader.result; // Get the image base64 URL
            saveSchedule(task, time, reminderTime, bgColor, bgImageUrl);
        };
        reader.readAsDataURL(bgImageFile); // Convert image to base64
    } else {
        saveSchedule(task, time, reminderTime, bgColor, null);
    }
});

// Save schedule to localStorage with custom styles
function saveSchedule(task, time, reminderTime, bgColor, bgImageUrl) {
    const schedule = {
        task,
        time,
        reminderTime,
        bgColor,
        bgImageUrl,
        completed: false
    };

    let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    schedules.push(schedule);
    localStorage.setItem("schedules", JSON.stringify(schedules));

    alert("Schedule saved successfully!");
    document.getElementById("schedule-form").reset();
}

// Display schedules with custom background and colors
function displaySchedules() {
    let schedules = JSON.parse(localStorage.getItem("schedules")) || [];
    const scheduleList = document.getElementById("schedule-list");

    scheduleList.innerHTML = "";
    schedules.forEach(schedule => {
        const scheduleItem = document.createElement("div");
        scheduleItem.classList.add("schedule-custom");

        // Apply custom background color and image
        scheduleItem.style.backgroundColor = schedule.bgColor;
        if (schedule.bgImageUrl) {
            scheduleItem.style.backgroundImage = `url(${schedule.bgImageUrl})`;
        }

        scheduleItem.innerHTML = `<p>${schedule.task} - ${schedule.time}</p>`;
        scheduleList.appendChild(scheduleItem);
    });
}

displaySchedules();

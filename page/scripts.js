// Function to save the plan to local storage
function savePlan() {
    const title = document.getElementById('planTitle').value;
    const time = document.getElementById('planTime').value;
    const details = document.getElementById('planDetails').value;
    const planImage = document.getElementById('planImage').files[0];

    if (title && time && details) {
        const plan = {
            title,
            time,
            details,
            image: planImage ? URL.createObjectURL(planImage) : null
        };

        let plans = JSON.parse(localStorage.getItem('plans')) || [];
        plans.push(plan);
        localStorage.setItem('plans', JSON.stringify(plans));

        window.location.href = 'plans.html'; // Redirect to personal plans page
    } else {
        alert('Please fill in all fields');
    }
}

// Function to load stored plans on the personal plans page
function loadPlans() {
    const planList = document.getElementById('planList');
    const plans = JSON.parse(localStorage.getItem('plans')) || [];

    plans.forEach(plan => {
        const div = document.createElement('div');
        div.className = 'plan-item';

        const img = plan.image ? `<img src="${plan.image}" alt="Plan Background" style="max-width:100%; border-radius: 10px;">` : '';
        div.innerHTML = `
            <h3>${plan.title}</h3>
            <p><strong>Time:</strong> ${plan.time}</p>
            <p><strong>Details:</strong> ${plan.details}</p>
            ${img}
            <button onclick="editPlan('${plan.title}')">Edit</button>
        `;

        planList.appendChild(div);
    });
}

// Function to edit a stored plan
function editPlan(title) {
    const plans = JSON.parse(localStorage.getItem('plans')) || [];
    const planToEdit = plans.find(plan => plan.title === title);

    if (planToEdit) {
        localStorage.setItem('editPlan', JSON.stringify(planToEdit));
        window.location.href = 'index.html'; // Redirect to editor for editing
    }
}

// Function to load plan for editing
function loadEditPlan() {
    const editPlan = JSON.parse(localStorage.getItem('editPlan'));

    if (editPlan) {
        document.getElementById('planTitle').value = editPlan.title;
        document.getElementById('planTime').value = editPlan.time;
        document.getElementById('planDetails').value = editPlan.details;
        // For image, we don't pre-load because it involves security risks with local files
    }
}

// Event listener to load plans on the personal plans page
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('planList')) {
        loadPlans();
    }

    if (document.getElementById('planTitle')) {
        loadEditPlan();
    }
});

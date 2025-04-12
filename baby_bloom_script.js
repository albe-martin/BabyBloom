// Store activities/reminders
let activities = [];
let deletedActivities = [];
let currentActivityType = null;
let reminderEnabled = false;
let editingActivityId = null;
let previousScreen = null;
let activityToDelete = null;
let babyInfo = {
  name: "Emma",
  dob: "15/03/2025",
  height: "52 cm",
  weight: "3.2 kg",
  gender: "Female"
};

// Track user type
let isGuestUser = false;
let isBabysitter = false;
let babysitterReminderTimeout = null;

// Initialize date and time values
const today = new Date();
document.getElementById('day').textContent = String(today.getDate()).padStart(2, '0');
document.getElementById('month').textContent = String(today.getMonth() + 1).padStart(2, '0');
document.getElementById('year').textContent = today.getFullYear();
document.getElementById('hour').textContent = String(today.getHours() % 12 || 12).padStart(2, '0');
document.getElementById('minute').textContent = String(today.getMinutes()).padStart(2, '0');
document.getElementById('ampm').textContent = today.getHours() >= 12 ? 'pm' : 'am';

// Function to generate share code
function generateShareCode() {
  alert("Your share code is: r4sS0Ld");
}

// Guest modal functions
function showGuestModal() {
  document.getElementById('guestModal').style.display = 'flex';
}

function closeGuestModal() {
  document.getElementById('guestModal').style.display = 'none';
}

// Babysitter reminder functions
function showBabysitterReminder() {
  document.getElementById('babysitterReminderModal').style.display = 'flex';
}

function closeBabysitterReminder() {
  document.getElementById('babysitterReminderModal').style.display = 'none';
}

function snoozeReminder() {
  closeBabysitterReminder();
  // Show again after 5 minutes (300000 ms)
  babysitterReminderTimeout = setTimeout(showBabysitterReminder, 300000);
}

// Join as babysitter function
function joinAsBabysitter() {
  isBabysitter = true;
  isGuestUser = false;
  showScreen('joinCodeScreen');
}

// Continue as guest function
function continueAsGuest() {
  isGuestUser = true;
  isBabysitter = false;
  showScreen('joinCodeScreen');
}

function resetFlags() {
  isGuestUser = false;
  isBabysitter = false;
}

// Function to disable guest actions
function disableGuestActions() {
  if (isGuestUser) {
    // Disable the plus icon in taskbar
    document.getElementById('addIcon').classList.add('disabled');

    // Disable edit buttons in reminders
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.classList.add('disabled');
    });
  } else {
    // Enable the plus icon in taskbar
    document.getElementById('addIcon').classList.remove('disabled');

    // Enable edit buttons in reminders
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.classList.remove('disabled');
    });
  }
}

// Function to switch between screens
function showScreen(screenId) {
  // Store previous screen for back functionality
  const currentScreen = document.querySelector('.screen.active');
  if (currentScreen) {
    previousScreen = currentScreen.id;
  }

  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });

  // Show selected screen
  document.getElementById(screenId).classList.add('active');

  // Show/hide taskbar based on screen
  const taskbarScreens = ['homeScreen', 'trackerScreen', 'analyticsScreen', 'personalInfoScreen', 'createActivityScreen', 'editActivityScreen'];
  if (taskbarScreens.includes(screenId)) {
    document.getElementById('mainTaskbar').style.display = 'flex';

    // Highlight active icon
    document.querySelectorAll('.taskbar-icon').forEach(icon => {
      icon.classList.remove('active');
    });

    if (screenId === 'homeScreen') {
      document.getElementById('homeIcon').classList.add('active');
    } else if (screenId === 'trackerScreen') {
      document.getElementById('trackerIcon').classList.add('active');
    } else if (screenId === 'createActivityScreen' || screenId === 'editActivityScreen') {
      document.getElementById('addIcon').classList.add('active');
    } else if (screenId === 'analyticsScreen') {
      document.getElementById('analyticsIcon').classList.add('active');
    } else if (screenId === 'personalInfoScreen') {
      document.getElementById('profileIcon').classList.add('active');
    }
  } else {
    document.getElementById('mainTaskbar').style.display = 'none';
  }

  // If we're showing the home or tracker screen, refresh the reminders
  if (screenId === 'homeScreen' || screenId === 'trackerScreen') {
    renderReminders();
  } else if (screenId === 'personalInfoScreen') {
    loadBabyInfo();
  }

  // Disable guest actions if needed
  disableGuestActions();
}

// Load baby info into display fields
function loadBabyInfo() {
  document.getElementById('displayBabyName').textContent = babyInfo.name;
  document.getElementById('displayBabyDOB').textContent = babyInfo.dob;
  document.getElementById('displayBabyHeight').textContent = babyInfo.height;
  document.getElementById('displayBabyWeight').textContent = babyInfo.weight;
  document.getElementById('displayBabyGender').textContent = babyInfo.gender;

  // Also load into edit fields
  document.getElementById('editBabyName').value = babyInfo.name;
  document.getElementById('editBabyDOB').value = babyInfo.dob;
  document.getElementById('editBabyHeight').value = babyInfo.height;
  document.getElementById('editBabyWeight').value = babyInfo.weight;
  document.getElementById('editBabyGender').value = babyInfo.gender;
}

// Enable edit mode for baby info
function enableEditMode() {
  document.getElementById('babyInfoDisplay').style.display = 'none';
  document.getElementById('babyInfoEdit').style.display = 'block';
}

// Cancel edit mode for baby info
function cancelEditBabyInfo() {
  document.getElementById('babyInfoDisplay').style.display = 'block';
  document.getElementById('babyInfoEdit').style.display = 'none';
}

// Update baby info
function updateBabyInfo() {
  babyInfo = {
    name: document.getElementById('editBabyName').value || babyInfo.name,
    dob: document.getElementById('editBabyDOB').value || babyInfo.dob,
    height: document.getElementById('editBabyHeight').value || babyInfo.height,
    weight: document.getElementById('editBabyWeight').value || babyInfo.weight,
    gender: document.getElementById('editBabyGender').value || babyInfo.gender
  };

  // Update display fields
  loadBabyInfo();

  // Switch back to display mode
  document.getElementById('babyInfoDisplay').style.display = 'block';
  document.getElementById('babyInfoEdit').style.display = 'none';

  // Show success message
  document.getElementById('updateModal').style.display = 'flex';
}

// Close update confirmation modal
function closeUpdateModal() {
  document.getElementById('updateModal').style.display = 'none';
}

// Print report function
function printReport() {
  // In a real app, this would actually print the report
  // For now, just show a success message
  document.getElementById('printModal').style.display = 'flex';
}

// Close print confirmation modal
function closePrintModal() {
  document.getElementById('printModal').style.display = 'none';
}

// Show history screen
function showHistory() {
  const historyReminderList = document.getElementById('historyReminderList');
  historyReminderList.innerHTML = '<div class="timeline-line"></div>';

  // Combine active and deleted activities
  const allActivities = [...activities, ...deletedActivities];

  if (allActivities.length === 0) {
    historyReminderList.innerHTML = '<div class="timeline-line"></div><p>No history yet.</p>';
    return;
  }

  // Sort activities by timestamp (newest first)
  const sortedActivities = [...allActivities].sort((a, b) => b.timestamp - a.timestamp);

  // Group activities by day
  const activitiesByDay = {};
  sortedActivities.forEach(activity => {
    const dateKey = `${activity.day}/${activity.month}/${activity.year}`;
    if (!activitiesByDay[dateKey]) {
      activitiesByDay[dateKey] = [];
    }
    activitiesByDay[dateKey].push(activity);
  });

  // Create history items grouped by day
  for (const [date, dayActivities] of Object.entries(activitiesByDay)) {
    // Add day separator
    const daySeparator = document.createElement('div');
    daySeparator.className = 'day-separator';
    daySeparator.textContent = date;
    historyReminderList.appendChild(daySeparator);

    // Add activities for this day
    dayActivities.forEach(activity => {
      historyReminderList.appendChild(createHistoryElement(activity));
    });
  }

  showScreen('historyScreen');
}

// Create a history element for a given activity
function createHistoryElement(activity) {
  const historyEl = document.createElement('div');
  historyEl.className = 'reminder';

  // Map activity types to emojis
  const typeEmojis = {
    diaper: '🧷',
    feeding: '🍼',
    play: '🪀',
    sleep: '💤',
    other: '✨'
  };

  // Check if this activity is deleted
  const isDeleted = deletedActivities.some(a => a.id === activity.id);

  historyEl.innerHTML = `
    <div class="reminder-info">
      <div class="reminder-time">${activity.month}/${activity.day}/${activity.year} ${activity.hour}:${activity.minute} ${activity.ampm}</div>
      <div class="reminder-title">${typeEmojis[activity.type]} ${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</div>
      <div class="reminder-note">${activity.note}</div>
      ${isDeleted ? '<div style="color: #ff6b6b; font-size: 12px;">(Deleted)</div>' : ''}
    </div>
  `;

  return historyEl;
}

// Validation functions for forms
function checkSignupFields() {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (username && password && confirmPassword) {
    showScreen('babyScreen');
  } else {
    alert('Please fill in all fields');
  }
}

function checkBabyFields() {
  const name = document.getElementById('babyName').value;
  const dob = document.getElementById('babyDOB').value;
  const height = document.getElementById('babyHeight').value;
  const weight = document.getElementById('babyWeight').value;
  const gender = document.getElementById('babyGender').value;

  if (name && dob && height && weight && gender) {
    // Save baby info
    babyInfo = {
      name: name,
      dob: dob,
      height: height,
      weight: weight,
      gender: gender
    };
    showScreen('homeScreen');
  } else {
    alert('Please fill in all fields');
  }
}

function checkJoinCode() {
  const joinCode = document.getElementById('joinCode').value;

  if (joinCode) {
    showScreen('homeScreen');

    // If user is babysitter, show reminder immediately
    if (isBabysitter) {
      showBabysitterReminder();
    }
  } else {
    alert('Please enter a join code');
  }
}

function checkLoginFields() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  if (username && password) {
    showScreen('homeScreen');
  } else {
    alert('Please fill in all fields');
  }
}

// Activity creation functions
function selectActivityType(element) {
  if (isGuestUser) {
    showGuestModal();
    return;
  }

  // Remove active class from all icons
  document.querySelectorAll('.activity-icon').forEach(icon => {
    icon.classList.remove('active');
  });

  // Add active class to selected icon
  element.classList.add('active');

  // Store selected activity type
  currentActivityType = element.getAttribute('data-type');
}

function incrementDateTime(unit) {
  const element = document.getElementById(unit);
  let value = parseInt(element.textContent);

  switch(unit) {
    case 'day':
      value = value < 31 ? value + 1 : 1;
      break;
    case 'month':
      value = value < 12 ? value + 1 : 1;
      break;
    case 'year':
      value = value + 1;
      break;
    case 'hour':
      value = value < 12 ? value + 1 : 1;
      break;
    case 'minute':
      value = value < 59 ? value + 1 : 0;
      break;
  }

  element.textContent = String(value).padStart(2, '0');
}

function decrementDateTime(unit) {
  const element = document.getElementById(unit);
  let value = parseInt(element.textContent);

  switch(unit) {
    case 'day':
      value = value > 1 ? value - 1 : 31;
      break;
    case 'month':
      value = value > 1 ? value - 1 : 12;
      break;
    case 'year':
      value = value - 1;
      break;
    case 'hour':
      value = value > 1 ? value - 1 : 12;
      break;
    case 'minute':
      value = value > 0 ? value - 1 : 59;
      break;
  }

  element.textContent = String(value).padStart(2, '0');
}

function toggleAmPm() {
  const element = document.getElementById('ampm');
  element.textContent = element.textContent === 'am' ? 'pm' : 'am';
}

function toggleReminder() {
  if (isGuestUser) {
    showGuestModal();
    return;
  }

  reminderEnabled = !reminderEnabled;
  const toggle = document.getElementById('reminderToggle');

  if (reminderEnabled) {
    toggle.style.left = '21px';
    toggle.parentElement.style.backgroundColor = '#e2ff7f';
  } else {
    toggle.style.left = '1px';
    toggle.parentElement.style.backgroundColor = '#ddd';
  }
}

function createActivity() {
  if (isGuestUser) {
    showGuestModal();
    return;
  }

  if (!currentActivityType) {
    alert('Please select an activity type');
    return;
  }

  // Get date and time values
  const day = document.getElementById('day').textContent;
  const month = document.getElementById('month').textContent;
  const year = document.getElementById('year').textContent;
  const hour = document.getElementById('hour').textContent;
  const minute = document.getElementById('minute').textContent;
  const ampm = document.getElementById('ampm').textContent;

  // Get note
  const note = document.getElementById('activityNote').value;

  // Create new activity object
  const newActivity = {
    id: Date.now(), // Use timestamp as unique ID
    type: currentActivityType,
    day: day,
    month: month,
    year: year,
    hour: hour,
    minute: minute,
    ampm: ampm,
    note: note,
    reminder: reminderEnabled,
    completed: false,
    timestamp: new Date(`${month}/${day}/${year} ${hour}:${minute} ${ampm}`).getTime()
  };

  // Add to activities array
  activities.push(newActivity);

  // Sort activities by timestamp (newest first)
  activities.sort((a, b) => b.timestamp - a.timestamp);

  // Reset form and return to home screen
  resetActivityForm();
  showScreen('homeScreen');
}

// Reset activity form
function resetActivityForm() {
  // Reset activity type
  document.querySelectorAll('.activity-icon').forEach(icon => {
    icon.classList.remove('active');
  });
  currentActivityType = null;

  // Reset note
  document.getElementById('activityNote').value = '';

  // Reset reminder toggle
  reminderEnabled = false;
  const toggle = document.getElementById('reminderToggle');
  toggle.style.left = '1px';
  toggle.parentElement.style.backgroundColor = '#ddd';

  // Reset date and time to current
  const today = new Date();
  document.getElementById('day').textContent = String(today.getDate()).padStart(2, '0');
  document.getElementById('month').textContent = String(today.getMonth() + 1).padStart(2, '0');
  document.getElementById('year').textContent = today.getFullYear();
  document.getElementById('hour').textContent = String(today.getHours() % 12 || 12).padStart(2, '0');
  document.getElementById('minute').textContent = String(today.getMinutes()).padStart(2, '0');
  document.getElementById('ampm').textContent = today.getHours() >= 12 ? 'pm' : 'am';
}

// Render reminders on home and tracker screens
function renderReminders() {
  const homeReminderList = document.getElementById('homeReminderList');
  const trackerReminderList = document.getElementById('trackerReminderList');
  const moreRemindersText = document.getElementById('moreRemindersText');

  // Clear existing reminders
  homeReminderList.innerHTML = '';
  trackerReminderList.innerHTML = '<div class="timeline-line"></div>';

  // Check if we have any activities
  if (activities.length === 0) {
    homeReminderList.innerHTML = '<p>No activities yet. Click the + button to add one!</p>';
    trackerReminderList.innerHTML = '<div class="timeline-line"></div><p>No activities yet. Click the + button to add one!</p>';
    moreRemindersText.classList.add('hidden');
    return;
  }

  // Sort activities by timestamp (newest first)
  const sortedActivities = [...activities].sort((a, b) => b.timestamp - a.timestamp);

  // Create home screen reminders (limit to 3)
  const homeActivities = sortedActivities.slice(0, 3);
  homeActivities.forEach(activity => {
    homeReminderList.appendChild(createReminderElement(activity));
  });

  // Show "more reminders" text if needed
  if (sortedActivities.length > 3) {
    moreRemindersText.classList.remove('hidden');
  } else {
    moreRemindersText.classList.add('hidden');
  }

  // Create tracker screen reminders (grouped by day)
  const activitiesByDay = {};
  sortedActivities.forEach(activity => {
    const dateKey = `${activity.day}/${activity.month}/${activity.year}`;
    if (!activitiesByDay[dateKey]) {
      activitiesByDay[dateKey] = [];
    }
    activitiesByDay[dateKey].push(activity);
  });

  // Add activities to tracker screen grouped by day
  for (const [date, dayActivities] of Object.entries(activitiesByDay)) {
    // Add day separator
    const daySeparator = document.createElement('div');
    daySeparator.className = 'day-separator';
    daySeparator.textContent = date;
    trackerReminderList.appendChild(daySeparator);

    // Add activities for this day
    dayActivities.forEach(activity => {
      trackerReminderList.appendChild(createReminderElement(activity));
    });
  }

  // Disable guest actions if needed
  disableGuestActions();
}

// Create a reminder element for a given activity
function createReminderElement(activity) {
  const reminderEl = document.createElement('div');
  reminderEl.className = 'reminder';
  if (activity.completed) {
    reminderEl.classList.add('completed');
  }

  // Map activity types to emojis
  const typeEmojis = {
    diaper: '🧷',
    feeding: '🍼',
    play: '🪀',
    sleep: '💤',
    other: '✨'
  };

  reminderEl.innerHTML = `
    <div class="reminder-info">
      <div class="reminder-time">${activity.month}/${activity.day}/${activity.year} ${activity.hour}:${activity.minute} ${activity.ampm}</div>
      <div class="reminder-title">${typeEmojis[activity.type]} ${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</div>
      <div class="reminder-note">${activity.note}</div>
    </div>
    <div class="reminder-actions">
      <span class="edit-btn ${isGuestUser ? 'disabled' : ''}" onclick="${isGuestUser ? 'showGuestModal()' : 'editActivity(' + activity.id + ')'}">Edit</span>
      <span class="delete-btn ${isGuestUser ? 'disabled' : ''}" onclick="${isGuestUser ? 'showGuestModal()' : 'showDeleteModal(' + activity.id + ')'}">✕</span>
      <input type="checkbox" class="reminder-checkbox" ${activity.completed ? 'checked' : ''} onchange="toggleActivityCompletion(${activity.id}, this)">
    </div>
  `;

  return reminderEl;
}

// Toggle activity completion status
function toggleActivityCompletion(activityId, checkbox) {
  const activity = activities.find(a => a.id === activityId);
  if (activity) {
    activity.completed = checkbox.checked;

    // Update the appearance of the reminder box
    const reminderEl = checkbox.closest('.reminder');
    if (activity.completed) {
      reminderEl.classList.add('completed');
    } else {
      reminderEl.classList.remove('completed');
    }
  }
}

// Show delete confirmation modal
function showDeleteModal(activityId) {
  if (isGuestUser) {
    showGuestModal();
    return;
  }

  activityToDelete = activityId;
  document.getElementById('deleteModal').style.display = 'flex';
}

// Close delete confirmation modal
function closeDeleteModal() {
  document.getElementById('deleteModal').style.display = 'none';
  activityToDelete = null;
}

// Confirm delete action
function confirmDelete() {
  if (!activityToDelete) {
    closeDeleteModal();
    return;
  }

  // Find activity in array
  const activityIndex = activities.findIndex(a => a.id === activityToDelete);

  if (activityIndex !== -1) {
    // Move to deleted activities
    deletedActivities.push(activities[activityIndex]);
    // Remove from active activities
    activities.splice(activityIndex, 1);

    // Refresh display
    renderReminders();
  }

  closeDeleteModal();
}

// Edit activity
function editActivity(activityId) {
  if (isGuestUser) {
    showGuestModal();
    return;
  }

  const activity = activities.find(a => a.id === activityId);

  if (!activity) return;

  // Set editing activity ID
  editingActivityId = activityId;

  // Populate edit form with activity data
  document.querySelectorAll('#editActivityScreen .activity-icon').forEach(icon => {
    if (icon.getAttribute('data-type') === activity.type) {
      icon.classList.add('active');
    } else {
      icon.classList.remove('active');
    }
  });

  document.getElementById('editDay').textContent = activity.day;
  document.getElementById('editMonth').textContent = activity.month;
  document.getElementById('editYear').textContent = activity.year;
  document.getElementById('editHour').textContent = activity.hour;
  document.getElementById('editMinute').textContent = activity.minute;
  document.getElementById('editAmpm').textContent = activity.ampm;
  document.getElementById('editActivityNote').value = activity.note;

  // Set reminder toggle
  const toggle = document.getElementById('editReminderToggle');
  if (activity.reminder) {
    toggle.style.left = '21px';
    toggle.parentElement.style.backgroundColor = '#e2ff7f';
  } else {
    toggle.style.left = '1px';
    toggle.parentElement.style.backgroundColor = '#ddd';
  }

  // Show edit screen
  showScreen('editActivityScreen');
}

// Edit activity functions
function selectEditActivityType(element) {
  if (isGuestUser) {
    showGuestModal();
    return;
  }

  // Remove active class from all icons
  document.querySelectorAll('#editActivityScreen .activity-icon').forEach(icon => {
    icon.classList.remove('active');
  });

  // Add active class to selected icon
  element.classList.add('active');
}

function incrementEditDateTime(unit) {
  const element = document.getElementById('edit' + unit.charAt(0).toUpperCase() + unit.slice(1));
  let value = parseInt(element.textContent);

  switch(unit) {
    case 'day':
      value = value < 31 ? value + 1 : 1;
      break;
    case 'month':
      value = value < 12 ? value + 1 : 1;
      break;
    case 'year':
      value = value + 1;
      break;
    case 'hour':
      value = value < 12 ? value + 1 : 1;
      break;
    case 'minute':
      value = value < 59 ? value + 1 : 0;
      break;
  }

  element.textContent = String(value).padStart(2, '0');
}

function decrementEditDateTime(unit) {
  const element = document.getElementById('edit' + unit.charAt(0).toUpperCase() + unit.slice(1));
  let value = parseInt(element.textContent);

  switch(unit) {
    case 'day':
      value = value > 1 ? value - 1 : 31;
      break;
    case 'month':
      value = value > 1 ? value - 1 : 12;
      break;
    case 'year':
      value = value - 1;
      break;
    case 'hour':
      value = value > 1 ? value - 1 : 12;
      break;
    case 'minute':
      value = value > 0 ? value - 1 : 59;
      break;
  }

  element.textContent = String(value).padStart(2, '0');
}

function toggleEditAmPm() {
  const element = document.getElementById('editAmpm');
  element.textContent = element.textContent === 'am' ? 'pm' : 'am';
}

function toggleEditReminder() {
  if (isGuestUser) {
    showGuestModal();
    return;
  }

  const toggle = document.getElementById('editReminderToggle');
  const isEnabled = toggle.style.left === '21px';

  if (!isEnabled) {
    toggle.style.left = '21px';
    toggle.parentElement.style.backgroundColor = '#e2ff7f';
  } else {
    toggle.style.left = '1px';
    toggle.parentElement.style.backgroundColor = '#ddd';
  }
}

function updateActivity() {
  if (!editingActivityId) return;

  // Find activity in array
  const activityIndex = activities.findIndex(a => a.id === editingActivityId);

  if (activityIndex === -1) return;

  // Get selected activity type
  let selectedType = null;
  document.querySelectorAll('#editActivityScreen .activity-icon').forEach(icon => {
    if (icon.classList.contains('active')) {
      selectedType = icon.getAttribute('data-type');
    }
  });

  if (!selectedType) {
    alert('Please select an activity type');
    return;
  }

  // Get date and time values
  const day = document.getElementById('editDay').textContent;
  const month = document.getElementById('editMonth').textContent;
  const year = document.getElementById('editYear').textContent;
  const hour = document.getElementById('editHour').textContent;
  const minute = document.getElementById('editMinute').textContent;
  const ampm = document.getElementById('editAmpm').textContent;

  // Get note
  const note = document.getElementById('editActivityNote').value;

  // Get reminder status
  const reminderToggle = document.getElementById('editReminderToggle');
  const reminderEnabled = reminderToggle.style.left === '21px';

  // Update activity
  activities[activityIndex] = {
    ...activities[activityIndex],
    type: selectedType,
    day: day,
    month: month,
    year: year,
    hour: hour,
    minute: minute,
    ampm: ampm,
    note: note,
    reminder: reminderEnabled,
    timestamp: new Date(`${month}/${day}/${year} ${hour}:${minute} ${ampm}`).getTime()
  };

  // Sort activities by timestamp (newest first)
  activities.sort((a, b) => b.timestamp - a.timestamp);

  // Reset editing ID and return to previous screen
  editingActivityId = null;
  cancelEdit();
}

function cancelEdit() {
  // Return to previous screen (home or tracker)
  if (previousScreen === 'homeScreen' || previousScreen === 'trackerScreen') {
    showScreen(previousScreen);
  } else {
    showScreen('homeScreen');
  }

  // Reset editing ID
  editingActivityId = null;
}

// Add some sample activities for demonstration
function addSampleActivities() {
  const sampleActivities = [
    {
      id: 1,
      type: 'feeding',
      day: '12',
      month: '03',
      year: '2025',
      hour: '09',
      minute: '30',
      ampm: 'am',
      note: 'Formula, 4 oz',
      reminder: true,
      completed: false,
      timestamp: new Date('03/12/2025 09:30 am').getTime()
    },
    {
      id: 2,
      type: 'diaper',
      day: '12',
      month: '03',
      year: '2025',
      hour: '08',
      minute: '15',
      ampm: 'am',
      note: 'Wet diaper only',
      reminder: false,
      completed: false,
      timestamp: new Date('03/12/2025 08:15 am').getTime()
    },
    {
      id: 3,
      type: 'sleep',
      day: '11',
      month: '03',
      year: '2025',
      hour: '10',
      minute: '00',
      ampm: 'pm',
      note: 'Slept through the night!',
      reminder: true,
      completed: false,
      timestamp: new Date('03/11/2025 10:00 pm').getTime()
    },
    {
      id: 4,
      type: 'other',
      day: '10',
      month: '03',
      year: '2025',
      hour: '02',
      minute: '30',
      ampm: 'pm',
      note: 'Doctor appointment',
      reminder: true,
      completed: false,
      timestamp: new Date('03/10/2025 02:30 pm').getTime()
    }
  ];

  activities = sampleActivities;
  renderReminders();
}

// Initialize with sample data
addSampleActivities();

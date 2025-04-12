# Baby Bloom Web App – Final Version

**Developer:** 
Bhumika Karhana | bhumika.karhana@ucalgary.ca
Sunwoo Back | sunwoo.back@ucalgary.ca
Jaden John | jaden.john@ucalgary.ca
Albe Martin | albe.martin@ucalgary.ca
Qusai Dahodwalla | qusai.dahodwalla@gmail.com 

Welcome to the Baby Bloom web app! This document explains everything you need to know about the final version of this project. You will find a list of all source code and data files along with detailed instructions on every feature and special case built into the system. Whether you are a parent, babysitter, or a guest user, this step-by-step guide will walk you through the entire process—from launching the app to using each control exactly as required.

---

## Project Files

Ensure that these files are in the same folder on your computer:

- **Baby_Bloom.html** – The primary HTML file that constructs the user interface.
- **baby_bloom_style.css** – The CSS file that provides the look and feel.
- **baby_bloom_script.js** – The JavaScript file that contains all the app’s logic and functions.
- **images** - A folder that contains our images.
    - **loginImage.png** – The image displayed on the login screen.
- **README.md** – This instruction file.

---

## Key Functions and Use Cases

The system has been designed to cover several major scenarios, with special handling for certain user roles. The key cases and functions include:

1. **User Navigation and Authentication**
   - **Start Screen:** Displays a hero image, the title “Baby Bloom,” a tagline, and a **Get Started** button.
   - **Create Profile Options:**  
     - **Create New Family:** Allows full account creation.
     - **Join as Family:** Joins an existing family with a join code.
     - **Join as Babysitter:** Sets the user type as a babysitter (_activates babysitter reminders_).
     - **Continue as Guest:** Sets the user as a guest (_disables certain modifications_).
   - **Log In:** For existing accounts (signup and login fields are validated via functions `checkSignupFields()` and `checkLoginFields()`).

2. **Baby Information**
   - **Baby Info Entry:** Uses `checkBabyFields()` to capture the baby’s name, date of birth, height, weight, and gender.
   - **Editing Baby Info:** Functions such as `loadBabyInfo()`, `enableEditMode()`, and `updateBabyInfo()` enable review and modification of baby details.
   - **Share Code Generation:** The function `generateShareCode()` shows a pop-up with a join code for families.

3. **Activity Management**
   - **Creating an Activity:**  
     - **Select Activity Type:** Choose among icons (Diaper 🧷, Feeding 🍼, Play 🪀, Sleep 💤, Other ✨) using `selectActivityType()`.
     - **Set Date & Time:** Adjust date and time fields (day, month, year, hour, minute, am/pm) by clicking the corresponding arrows. Functions `incrementDateTime()`, `decrementDateTime()`, and `toggleAmPm()` are used.
     - **Enter Notes:** Type activity notes into a text area.
     - **Toggle Reminder:** Click the reminder slider (handled by `toggleReminder()`) to set or remove a reminder.
     - **Save the Activity:** Click “Create Activity” to add the activity to the list using `createActivity()`.
   - **Editing an Activity:**  
     - **Open Edit Form:** Click the “Edit” button on an activity (calls `editActivity()`).
     - **Modify Activity Details:** Change the type, date/time, note, or reminder toggle.
     - **Update Activity:** Click “Update Activity” (using `updateActivity()`) to save your changes.
   - **Deleting an Activity:**  
     - **Open Delete Confirmation:** Click the delete (✕) icon, which displays a confirmation modal.
     - **Confirm or Cancel Deletion:** Select “Delete Task” or “Keep Task” via functions `showDeleteModal()`, `confirmDelete()`, and `closeDeleteModal()`.
   - **Mark as Complete:** Toggle the completion checkbox next to each activity. The function `toggleActivityCompletion()` updates the activity state.

4. **Additional Features and Special Cases**

   ### a. Babysitter Specific Pop-Up
   - **Join as Babysitter:**
     - **Activation:** On the Create Profile screen, when the **Join as baby sitter** button is clicked, the system sets the user type as babysitter.
     - **Flow:** The user is redirected to the Join Code Screen. Once a join code is entered (using `checkJoinCode()`), if the babysitter flag is set (`isBabysitter = true`), the system immediately displays a babysitter reminder pop-up with the message “Feed the Baby Now.”
     - **Reminder Handling:** The babysitter pop-up is managed by `showBabysitterReminder()`, and you can choose to **Snooze** (using `snoozeReminder()`) or dismiss it with **OK**.

   ### b. Guest User Restrictions
   - **Continue as Guest:**
     - **Activation:** On the Create Profile screen, clicking **Continue as guest** sets the user as a guest.
     - **Restricted Actions:**  
       - Guest users **cannot add or edit activities.**  
       - When a guest user clicks on the plus icon (or tries to edit an activity), the system will display a modal stating, “Guest users cannot add or edit activities. Please create an account or join a family.” This is handled by functions like `showGuestModal()` and by checking the `isGuestUser` flag.
       - Certain buttons (like the **Edit** and **Add** icons) get a disabled look, and clicking them brings up the guest modal.

   ### c. Activity Reminders and Analytics
   - **Reminder Toggle:** When creating or editing an activity, toggling the reminder changes the visual slider (the small circle moves and the slider background changes color).
   - **Analytics Screen:** View statistics (such as average sleep hours, number of feedings, and diaper changes) along with a simple pie chart.

---

## Detailed Walkthrough and What to Enter

Follow these steps exactly, noting the fields, controls, and buttons:

### 1. Launching the Application

- **Step 1:** Navigate to the project folder containing:
  - `Baby_Bloom.html`
  - `baby_bloom_style.css`
  - `baby_bloom_script.js`
  - `README.md`
- **Step 2:** Open `Baby_Bloom.html` by double-clicking the file or by using your browser’s “Open File” option.
- **Result:** The app loads in your default web browser and you see the Start Screen.

### 2. Start Screen

- **On Screen:** A hero image, the title “Baby Bloom”, a tagline, and the **Get Started** button.
- **Action:**  
  - **Click “Get Started”.**

### 3. Create Profile Screen

- **On Screen:** Four buttons are available:
  - **Create new family**
  - **Join as family**
  - **Join as baby sitter**
  - **Continue as guest**
  - Also a **Log in** link.
- **For a full-featured account:**
  - **Option A:** Click **Create new family**.
- **For babysitter access:**
  - **Option B:** Click **Join as baby sitter**.
    - **Result:** The app sets `isBabysitter = true`.  
    - **After entering a join code (see next steps), a pop-up appears prompting “Feed the Baby Now”.**
- **For guest access (limited features):**
  - **Option C:** Click **Continue as guest**.
    - **Result:** The app sets `isGuestUser = true` and disables adding/editing activities (if you try to modify, a guest modal will display).
- **For existing accounts:**
  - **Option D:** Click **Log in**.

_For this walkthrough, we assume the user chooses to **Create new family**._

### 4. Signing Up (Create New Family)

- **On the Sign Up screen:**  
  - **Username Field:** Type your username (e.g., `myFamilyUser`).
  - **Password Field:** Enter your password (e.g., `Password123`).
  - **Confirm Password Field:** Repeat the password (e.g., `Password123`).
- **Action:**  
  - **Click “Sign Up”.**  
    - This triggers the `checkSignupFields()` function to ensure no field is empty.
- **Result:** You move to the **Baby Info** screen.

### 5. Entering Baby Information

- **On the Baby Info screen:** Enter the following:
  - **Baby name:** Type `Emma`.
  - **DOB (date of birth):** In the format `dd/mm/yyyy`, type `15/03/2025`.
  - **Height:** Type `52 cm`.
  - **Weight:** Type `3.2 kg`.
  - **Gender:** Type `Female`.
- **Action:**  
  - **Click “Start”.**
    - The `checkBabyFields()` function will save the information.
- **Result:** You are taken to the **Home Screen**.

### 6. Home Screen: Viewing and Managing Activities

- **On Screen:**  
  - You see **Upcoming Activities** (sample activities may be displayed).
  - At the top-right, there is an icon for baby tips.
- **Note:** Guest and babysitter differences will affect what actions you can take later.

### 7. Creating a New Activity

#### a) Navigating to the Create Activity Screen

- **Action:**  
  - Go to the Taskbar at the bottom and **click the Plus (+) icon**.
  - This opens the **Create Activity** screen.
  - **(Note for guest users:** If you are logged in as a guest, clicking the plus icon will trigger a modal that says “Guest users cannot add or edit activities.”)

#### b) Selecting an Activity Type

- **Options Displayed:**  
  - Diaper (🧷), Feeding (🍼), Play (🪀), Sleep (💤), and Other (✨)
- **Action:**  
  - For example, **click the Feeding icon (🍼).**
  - The clicked icon will become highlighted.
  - This calls `selectActivityType()` and sets the current activity type.

#### c) Setting the Date and Time

- **Controls Displayed:**  
  - Separate controls for **day, month, year, hour, minute, and am/pm**.
- **Action:**  
  - Adjust **day:** Click the up/down arrow until the value shows `12`.
  - Adjust **month:** Click until the value is `03`.
  - Adjust **year:** Click until it shows `2025`.
  - Adjust **hour:** Set to `09`.
  - Adjust **minute:** Set to `30`.
  - Ensure the **am/pm toggle** shows `am` (if it shows `pm`, click the toggle arrow to change it).
- **This uses:** `incrementDateTime()`, `decrementDateTime()`, and `toggleAmPm()`.

#### d) Entering the Activity Note

- **Action:**  
  - In the text area provided below the datetime selector, type a note such as:  
    `Formula, 4 oz`

#### e) Toggling the Reminder

- **Action:**  
  - Click the reminder slider next to the note.
  - The small circle will slide to the right and the background will change, indicating that a reminder is set.
  - This calls `toggleReminder()`.

#### f) Saving the Activity

- **Action:**  
  - **Click the “Create Activity” button.**
- **Result:**  
  - The new activity is saved (via `createActivity()`) and shows up in your Upcoming Activities list.

### 8. Editing an Activity

- **Action:**  
  - On the Home or Tracker screen, locate an existing activity.
  - **Click “Edit”** next to the desired activity.
- **On the Edit Activity screen:**  
  - The activity’s current details (type, datetime, note, and reminder status) will be pre-filled.
- **Modification:**  
  - To change the activity type, click a different icon.
  - Adjust date/time values exactly using the arrow controls.
  - Edit the text in the note field.
  - Toggle the reminder if needed.
- **Action:**  
  - **Click “Update Activity”** to save your changes.
- **Result:** The activity is updated (using `updateActivity()`) and you return to your previous screen.

### 9. Deleting an Activity

- **Action:**  
  - Click the delete icon (✕) next to an activity.
- **A modal appears:**  
  - It asks, “Are you sure you want to delete this task?”
- **Response:**  
  - **Click “Delete Task”** to permanently remove the activity, or click “Keep Task” to cancel.
  - This uses `showDeleteModal()`, `confirmDelete()`, and `closeDeleteModal()`.

### 10. Special Features Based on User Type

#### a) Babysitter Mode

- **Activating Babysitter Mode:**  
  - When on the Create Profile screen, click **Join as baby sitter**.
  - Enter a join code on the Join Code screen.
- **Outcome:**  
  - The system sets the babysitter flag (`isBabysitter = true`).
  - **Immediately after joining, a pop-up modal appears** with the message:  
    **“Feed the Baby Now”**
  - **Action on Pop-Up:**  
    - Click **OK** to dismiss the pop-up, or click **Snooze** if you wish to delay it.  
    - The snooze function (`snoozeReminder()`) will redisplay the reminder after 5 minutes.

#### b) Guest Mode

- **Activating Guest Mode:**  
  - From the Create Profile screen, click **Continue as guest**.
- **Outcome:**  
  - The system sets the guest flag (`isGuestUser = true`).
  - In guest mode, the plus icon for adding activities and the edit buttons for modifying activities are disabled.
  - **If a guest user attempts to add or edit an activity, a modal will appear** stating:  
    **“Guest users cannot add or edit activities. Please create an account or join a family.”**
  - **This behavior is managed through checks in functions such as `disableGuestActions()` and `showGuestModal()`.**

### 11. Viewing History and Analytics

- **History (Tracker Screen):**  
  - **Action:** Click the Tracker icon (📋) or the **History** button.
  - **Result:** Activities are grouped by day and displayed with a timeline.
- **Analytics Screen:**  
  - **Action:** Click the Analytics icon (📊) on the Taskbar.
  - **Result:** A pie chart and statistics (such as average sleep hours and number of diaper changes) are displayed.

### 12. Editing Baby Information and Sharing Code

- **Personal Info Screen:**  
  - **Action:** Click the Profile icon (👤) on the Taskbar.
  - **To Edit Baby Information:**  
    - Click **Edit Information**, update fields as needed, then click **Update Information**.
  - **To Share a Join Code:**  
    - Click the **Share Code** button to display your unique join code.

---

## Final Remarks

This walkthrough is designed to provide an exact guide for every step and detail on how to use the Baby Bloom web app. Please follow these instructions precisely to experience each feature as intended—whether you are creating a family account, joining as a babysitter, or continuing as a guest.

If you have any questions or run into issues, consider asking someone with a little more technical knowledge or searching for tutorials on basic HTML/CSS/JavaScript usage.

Enjoy using Baby Bloom to track your baby’s milestones!

---

**John Doe**  
*Developer, Baby Bloom Web App*

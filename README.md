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
- **baby_bloom_script.js** – The JavaScript file that contains all the app’s logic.
- **images** - A folder that contains our images.
  - **loginImage.png** – The image displayed on the login screen.
- **README.md** – This instruction file.

---

## Key Scenarios and Use Cases

The Baby Bloom web app is designed to cover the following major scenarios:

1. **User Navigation and Authentication**
   - **Start Screen:** You see a welcoming hero image, the title “Baby Bloom,” a tagline, and a **Get Started** button.
   - **Create Profile Options:** You are given four options:
     - **Create New Family:** For full account setup.
     - **Join as Family:** To join an existing family using a join code.
     - **Join as Babysitter:** For babysitters—this mode activates reminders for tasks.
     - **Continue as Guest:** For a limited version without editing privileges.
   - **Log In:** An option to log in if you already have an account.

2. **Baby Information**
   - **Entering Baby Details:** You fill in your baby’s name, date of birth, height, weight, and gender.
   - **Editing Baby Details:** Later, you can update this information.
   - **Sharing Family Code:** A unique join code is provided for family sharing.

3. **Activity Management**
   - **Creating an Activity:** You can record various baby activities such as diaper changes, feedings, playtime, sleep, or other events by:
     - **Selecting an Activity Type:** Choose an icon (Diaper, Feeding, Play, Sleep, or Other).
     - **Setting Date & Time:** Adjust the day, month, year, hour, minute, and AM/PM settings using visible controls.
     - **Entering a Note:** Provide details like “Formula, 4 oz.”
     - **Toggling a Reminder:** Turn on an optional reminder using a slider.
     - **Saving the Activity:** Confirm to save this activity.
   - **Editing an Activity:** You can modify an activity’s type, date/time, note, or reminder by selecting it for editing and saving the changes.
   - **Deleting an Activity:** Remove an unwanted activity by clicking its delete option and confirming in the pop-up.
   - **Marking an Activity as Complete:** Check a box next to the activity to mark it as done.

4. **Special Features and User-Specific Cases**

   **Babysitter Mode:**
   - **Activation:** When selecting **Join as baby sitter** during profile creation, you will be prompted to enter a join code.
   - **Outcome:** Once you join, a pop-up appears immediately with the message “Feed the Baby Now.” You can either dismiss it or choose to snooze (delay) the reminder, which will reappear after 5 minutes.

   **Guest Mode:**
   - **Activation:** When you click **Continue as guest**, you enter guest mode.
   - **Restrictions:** In guest mode, adding or editing activities is disabled. If you try, a message will appear informing you that these options are not available until you create an account or join a family.

   **Activity Reminders and Analytics:**
   - **Reminder Toggle:** When you set or edit an activity, the reminder slider visually changes to show whether a reminder is active.
   - **Analytics:** In the Analytics section, you can view statistics (such as average sleep hours, number of feedings, and diaper changes) along with a simple pie chart.

---

## Detailed Walkthrough and What to Enter

Follow these steps exactly as described:

### 1. Launching the Application

- **Step 1:** Locate the project folder containing the following files:
  - `Baby_Bloom.html`
  - `baby_bloom_style.css`
  - `baby_bloom_script.js`
  - `README.md`
- **Step 2:** Open `Baby_Bloom.html` by double-clicking it or using your browser’s “Open File” option.
- **Result:** The app launches in your default web browser, and you see the Start Screen.

### 2. Start Screen

- **On Screen:** A hero image, the title “Baby Bloom,” a tagline, and a **Get Started** button.
- **Action:**  
  - **Click “Get Started”.**

### 3. Create Profile Screen

- **On Screen:** You are given four main options:
  - **Create new family**
  - **Join as family**
  - **Join as baby sitter**
  - **Continue as guest**
  - Along with a **Log in** link.
- **User Choice:**
  - **For a full account:** Click **Create new family**.
  - **For babysitter access:** Click **Join as baby sitter** (after entering a join code, a babysitter reminder will be shown).
  - **For guest access:** Click **Continue as guest** (limited editing ability).
  - **For existing users:** Click **Log in**.
- **For this example, assume you choose “Create new family.”**

### 4. Signing Up (Create New Family)

- **On the Sign Up Screen:**
  - **Username Field:** Type your desired username (e.g., `myFamilyUser`).
  - **Password Field:** Enter your password (e.g., `Password123`).
  - **Confirm Password Field:** Re-enter your password (e.g., `Password123`).
- **Action:**  
  - **Click “Sign Up”.**
- **Result:** You will be taken to the Baby Info Screen.

### 5. Entering Baby Information

- **On the Baby Info Screen:** Provide the following:
  - **Baby Name:** Type `Emma`.
  - **Date of Birth:** In the format `dd/mm/yyyy`, type `15/03/2025`.
  - **Height:** Type `52 cm`.
  - **Weight:** Type `3.2 kg`.
  - **Gender:** Type `Female`.
- **Action:**  
  - **Click “Start”.**
- **Result:** You proceed to the Home Screen.

### 6. Home Screen: Viewing and Managing Activities

- **On Screen:** The Home Screen shows a list of upcoming activities (sample activities might already be visible) and an icon for baby tips.
- **Note:** The behavior may vary based on whether you are a full user, guest, or babysitter.

### 7. Creating a New Activity

#### a) Navigating to the Create Activity Screen

- **Action:**  
  - Click the **Plus (+) icon** on the Taskbar at the bottom of the screen.
  - (If in guest mode, you will receive a notification stating that adding activities is not allowed.)
- **Result:** The Create Activity Screen opens.

#### b) Selecting an Activity Type

- **On Screen:** Several icons are visible, each representing a different activity type:
  - Diaper (🧷), Feeding (🍼), Play (🪀), Sleep (💤), and Other (✨)
- **Action:**  
  - Click on the desired activity icon (e.g., the Feeding icon 🍼).
- **Result:** The chosen icon is highlighted to indicate selection.

#### c) Setting the Date and Time

- **On Screen:** Controls allow you to set day, month, year, hour, minute, and AM/PM.
- **Action:**  
  - Adjust the **Day:** Click the arrow until you see `12`.
  - Adjust the **Month:** Click until you see `03`.
  - Adjust the **Year:** Click until you see `2025`.
  - Adjust the **Hour:** Set to `09`.
  - Adjust the **Minute:** Set to `30`.
  - Ensure the **AM/PM toggle** shows `am`. (Click to change if necessary.)
- **Result:** Your desired date and time are set.

#### d) Entering the Activity Note

- **Action:**  
  - In the provided text area, type a note such as:  
    `Formula, 4 oz`
- **Result:** The note is recorded for the activity.

#### e) Toggling the Reminder

- **Action:**  
  - Click the reminder slider to activate it.  
- **Result:** The slider visually changes to indicate a reminder is set.

#### f) Saving the Activity

- **Action:**  
  - Click the **Create Activity** button.
- **Result:** The activity is saved and appears in your Upcoming Activities list.

### 8. Editing an Activity

- **Action:**  
  - On the Home or Tracker Screen, locate an activity you want to modify.
  - Click the **Edit** option next to the activity.
- **On the Edit Activity Screen:**
  - The activity’s details are already shown.
  - Change the activity type, adjust the date/time, update the note, or toggle the reminder as desired.
- **Action:**  
  - Click the **Update Activity** button.
- **Result:** The activity is updated with your changes.

### 9. Deleting an Activity

- **Action:**  
  - Click the delete icon (✕) next to an activity.
- **A Pop-Up Appears:**  
  - You are asked, “Are you sure you want to delete this task?”
- **Action:**  
  - Click **Delete Task** to remove the activity or **Keep Task** if you decide not to delete.
- **Result:** The activity is either permanently deleted or retained based on your choice.

### 10. Special Features Based on User Type

#### a) Babysitter Mode

- **Activation:**  
  - On the Create Profile screen, select **Join as baby sitter**.
  - Enter the join code when prompted.
- **Result:**  
  - Your account is set to babysitter mode. Immediately after joining, a pop-up appears with the message “Feed the Baby Now.”
- **Action on Pop-Up:**  
  - Click **OK** to dismiss the pop-up, or click **Snooze** to delay the reminder (which will reappear after 5 minutes).

#### b) Guest Mode

- **Activation:**  
  - On the Create Profile screen, select **Continue as guest**.
- **Result:**  
  - Your account is set to guest mode. The options for adding or editing activities become disabled.
- **If Attempted:**  
  - Should you try to add or edit an activity, a message will inform you that these features are not available until you create an account or join a family.

### 11. Viewing History and Analytics

- **History:**  
  - **Action:** Click the Tracker icon (📋) or the **History** button.
  - **Result:** The app displays activities grouped by day along a timeline.
- **Analytics:**  
  - **Action:** Click the Analytics icon (📊) on the Taskbar.
  - **Result:** A pie chart and related statistics (such as average sleep hours and number of diaper changes) are shown.

### 12. Editing Baby Information and Sharing Code

- **Action:**  
  - Click the Profile icon (👤) on the Taskbar.
- **To Edit Baby Information:**  
  - Click **Edit Information**, change the details as required, and then click **Update Information**.
- **To View the Join Code:**  
  - Click the **Share Code** button to display your unique family join code.

---

## Final Remarks

This guide offers a complete, step-by-step walkthrough for using the Baby Bloom web app. Please follow these instructions precisely to ensure you experience every feature as intended—whether setting up a family account, joining as a babysitter, or using the guest mode.

If you have any questions or run into issues, please refer back to this guide or ask someone with basic technical knowledge for help.

Enjoy using Baby Bloom to track your baby’s milestones!

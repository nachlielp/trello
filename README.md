Trello Clone

A Trello-like application built with React, Redux, Node.js, and MongoDB, hosted at [Pyello on Render](https://pyello.onrender.com). Please note that since it runs on a free Render account, it may take a minute or two for the server to start.

### How to run locally

- Backend:

  - add env variables
    - MONGO_URL
    - MONGO_DB_NAME
    - CRYPTR_PASS
  - Install dependencies `npm install`
  - Run `npm run dev`

- Frontend:
  - add env variables
    - VITE_CLOUDINARY_CLOUD_NAME
    - VITE_CLOUDINARY_UPLOAD_PRESET
    - VITE_CLOUDINARY_API_KEY
    - VITE_CLOUDINARY_API_SECRET
    - VITE_CLOUDINARY_API_VAR
  - Install dependencies `npm install`
  - Run `npm start`

### **Key Features:**

**Homepage**

- A stylized homepage, closely resembling Trello's design.

**User Accounts**

- Ability to sign up, log in, and log out.

**Boards**

- View all boards the user is associated with.
- Create new boards with a custom background and title.
- Delete and rename boards.
- Star/unstar boards, either from the board index or the board details page.
- A board menu featuring activity history, options for archived groups or tasks, and the ability to change the cover image via Unsplash integration.
- Unarchive groups and tasks.

**Groups (Lists)**

- Add new groups to boards with a quick-add feature using Enter.
- Rename groups.
- Drag and drop groups to reorder them.
- Group menu options for copying, moving, archiving groups, and managing tasks (move all tasks, archive all tasks).

**Tasks (Cards)**

- Add tasks to a group, with a quick-add feature.
- Rename and reorder tasks by dragging and dropping.
- Move or copy tasks between groups or within the same group.
- Comprehensive task details, including labels, descriptions, checklists, etc.
- Archive, unarchive, or delete tasks.

**Labels**

- Manage task labels, including showing, adding, removing, and editing labels (color and text).
- Create and delete labels (removing them from all associated tasks).
- Label display in task previews, including expanded views.

**Task Descriptions**

- View and edit task descriptions, with a badge indicating its presence in task previews.

**Checklists**

- Add multiple checklists to tasks, with progress tracking.
- Rename, delete, reorder, and drag/drop checklists and items.
- Convert checklist items into tasks.

**Members**

- Assign and remove task members.
- Display member badges in task previews.
- Invite new members to boards via the "Share" button.

**Comments**

- Add, edit, and delete task comments.
- View all comments in the board's activity log and within tasks.
- Comment badges appear in task previews.

**Task Dates**

- Add, edit, and remove start and due dates for tasks.
- Mark tasks as complete and view date indicators for overdue or upcoming tasks.
- Date picker supports date ranges.

**Task Covers**

- Customize task covers with colors or images, with dynamic text color based on the cover.

**Activity Log**

- Track actions such as task creation, deletion, and archiving in task details and the board's activity feed.

**General Features**

- Reusable and navigable popover menus (e.g., the labels menu).
- Dynamic page titles based on content.
- Smooth drag and drop via react-beautiful-dnd.
- Responsive UI with optimistic updates, handling scenarios like many tasks or long task details.
- Editable titles that respond correctly to actions like ESC for undo.

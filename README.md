# HD Academy Notes App

Welcome to the HD Academy Notes App! This application is designed to help manage notes and tasks for employees, managers, and administrators within HD Academy, a basketball company. The app provides a secure authentication system using JWT tokens and allows users to create, edit, and delete notes. Additionally, users can mark notes as completed.


## Authentication

The HD Academy Notes App uses JWT tokens for authentication. Upon successful login, users will receive a token that must be included in the header of subsequent requests.

## User Roles

The app supports three different user roles:

- **Employee:** Can create, edit, and delete their own notes.
- **Manager:** In addition to employee privileges, can view and manage notes of employees they oversee.
- **Administrator:** Has full control over the app, including user management and system settings.

## Features

1. **Create Note:** Users can create new notes with a title, description, and deadline.
2. **Edit Note:** Users can edit the title, description, and deadline of their existing notes.
3. **Delete Note:** Users can delete their own notes.
4. **Mark as Completed:** Users can mark notes as completed to track their progress.

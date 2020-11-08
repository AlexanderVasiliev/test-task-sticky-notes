# Task
- Create a new note of the specified size at the specified position.
- Change note size by dragging.
- Move a note by dragging.
- Remove a note by dragging it over a predefined "trash" zone.

# System requirements

- The web application is intended to be used on desktop. Minimum screen resolution: 1024x768.
- The following browsers should be supported: latest versions of Google Chrome (Windows and Mac), Mozilla Firefox (all platforms), Microsoft Edge.

# Technologies:
- React + Typescript

# Building
```code
yarn && yarn start
```
entry : index.html

# Goals
- Entering/editing note text.
  Done
- Moving notes to front (in case of overlapping notes).
  Done
- Saving notes to local storage (restoring them on page load).
  Done
- Different note colors.
  Done
- Saving notes to REST API. Note: you're not required to implement the API, you can mock it, but the mocks should be asynchronous.
  You can provide any API for the application
```JSX
<Notes
  loadNotes={api.getNotes}
  createNote={api.postNote}
  updateNote={api.patchNote}
  removeNote={api.deleteNote}
/>
```

# Notes
- Moving notes to the front can be done better (maybe save ordering of all notes).
- There is a little bug: cursor has wrong positions when user resizes the note to it's min size and then resizes back
- Nice-to-have: notes can be replaced according to resolutions when user resizes the screen

# Architecture
- drag and drop: implemented simple hook based on pointer events and difference between current and previous cursor positions
- notes: position and sizes goes to the "server" only when user finished interaction with interface
- An app takes endpoints. It has 2 components: container, which wraps endpoints, and the notes themselves

import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import * as api from './api';
import Notes from './notes';

const GlobalStyle = createGlobalStyle({
  body: {
    fontFamily: 'sans-serif',
  },
});

const container = document.getElementById('app');

if (container) {
  ReactDOM.render(
    <>
      <GlobalStyle />
      <Notes
        loadNotes={api.getNotes}
        createNote={api.postNote}
        updateNote={api.patchNote}
        removeNote={api.deleteNote}
      />
    </>,
    container,
  );
}

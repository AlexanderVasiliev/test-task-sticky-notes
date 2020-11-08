import styled from 'styled-components';

export const Container = styled.div({
  position: 'relative',
  minWidth: 1024,
  minHeight: 768,
  height: '100vh',
  backgroundColor: 'lightcyan',
  overflow: 'hidden',
});

export const Button = styled.button({
  padding: 20,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'coral',
  borderRadius: 4,
  backgroundColor: 'lightcoral',
  outline: 'none',
  cursor: 'pointer',
});

export const ButtonsContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  padding: 10,
});

type NoteProps = {
  isOverlapping: boolean,
};

export const StyledNote = styled.div<NoteProps>(({
  isOverlapping,
}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
  zIndex: isOverlapping ? 2 : 1,
}));

const noteHeaderSize = 30;
type NoteHeaderProps = {
  bgColor: string,
};
export const NoteHeader = styled.div<NoteHeaderProps>(({
  bgColor = 'lightyellow',
}) => ({
  display: 'flex',
  justifyContent: 'space-between',
  cursor: 'pointer',
  height: noteHeaderSize,
  backgroundColor: bgColor,
  borderRadius: 0,
}));

export const NoteHeaderButton = styled.button({
  width: noteHeaderSize,
  height: noteHeaderSize,
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  backgroundColor: 'transparent',
  borderRadius: 0,
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export const NoteBody = styled.textarea({
  padding: 5,
  border: 'none',
  resize: 'none',
  flexGrow: 1,
  outline: 'none',
  backgroundColor: '#333',
  color: '#CCC',
});

export const ColorPickerContainer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  height: 50,
  width: '100%',
  borderRadius: 0,
});
export const ColorChoice = styled.button(({ color }) => ({
  flexGrow: 1,
  backgroundColor: color,
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  borderRadius: 0,
}));

export const ResizeControl = styled.span({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: 10,
  height: 10,
  cursor: 'nwse-resize',
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 10,
    height: 1,
    top: 5,
    transform: 'rotate(-45deg)',
    backgroundColor: '#CCC',
  },
});

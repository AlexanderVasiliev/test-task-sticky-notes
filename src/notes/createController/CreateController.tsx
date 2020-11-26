import React from 'react';
import type { FC } from 'react';
import styled from 'styled-components';

const Element = styled.div({
  position: 'absolute',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'red',
});

type Point = {
  x: number,
  y: number,
};

interface CreateControllerProps {
  start: Point,
  end: Point,
}

const CreateController: FC<CreateControllerProps> = ({
  start,
  end,
}) => (
  <Element
    style={{
      top: start.y,
      left: start.x,
      width: end.x - start.x,
      height: end.y - start.y,
    }}
  />
);

export default CreateController;

import React from 'react';
import type { FC } from 'react';

import { colors } from './constants';
import { ColorChoice, ColorPickerContainer } from './styled';

type ColorPickerProps = {
  onSelect: (color: string) => Promise<void>,
};

const ColorPicker: FC<ColorPickerProps> = ({
  onSelect,
}) => (
  <ColorPickerContainer>
    {
      colors.map((color) => (
        <ColorChoice
          key={color}
          color={color}
          onClick={() => onSelect(color)}
        />
      ))
    }
  </ColorPickerContainer>
);

export default ColorPicker;

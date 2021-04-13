import React from 'react';
import styled from '@emotion/styled';

import { theme } from '../../../common/theme';

export interface ButtonStyleProps {
  color: 'primary' | 'secondary' | 'flat';
}

export interface ButtonProps extends ButtonStyleProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ children, onClick, ...props }: ButtonProps): React.ReactElement => {
  return (
    <ButtonStyle onClick={onClick} {...props}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<ButtonStyleProps>`
  padding: 10px 20px;

  font-family: ${theme.fontFamily.primary};
  font-weight: 600;

  background-color: ${theme.color.white};
  box-shadow: 1px 1.5px 2.5px ${theme.color.grey};

  outline: none;
  border: 0;
  border-radius: 4px;
  cursor: pointer;

  ${(props) => {
    const { color } = props;
    switch (color) {
      case 'primary':
      default:
        return `
					color: ${theme.color.primary};
					border: 1.5px solid ${theme.color.primary};
				`;
      case 'secondary':
        return `
					color: ${theme.color.grey};
					border: 1.5px solid ${theme.color.grey};
				`;
      case 'flat':
        return `
					color: ${theme.color.primary};
					box-shadow: none;
				`;
    }
  }}
`;

import React from 'react';
import styled from '@emotion/styled';

import { theme } from '../../../common/theme';
import { Location, LocationStyle } from '../../../common/atomic';

export interface ButtonStyleProps {
  option?: 'primary' | 'disabled' | 'flat' | 'point';
  location?: Location;
}

export interface ButtonProps extends ButtonStyleProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({
  className,
  children,
  option = 'primary',
  onClick,
  ...props
}: ButtonProps): React.ReactElement => {
  return (
    <ButtonStyle className={className} onClick={onClick} option={option} {...props}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<ButtonStyleProps>`
  padding: 11px 25px 12px;

  font-family: ${theme.fontFamily.inter};
  font-size: 16px;
  font-weight: 500;

  background-color: #fff;
  filter: drop-shadow(1px 2px 4px rgba(0, 0, 0, 0.25));

  outline: none;
  border: 0;
  border-radius: 4px;
  cursor: pointer;

  ${(props) => {
    const { option } = props;
    switch (option) {
      case 'primary':
      default:
        return `
					color: ${theme.color.white};
					border: 1.5px solid ${theme.color.text};
					background: ${theme.color.text};
				`;
      case 'disabled':
        return `
					color: ${theme.color.darkGrey};
					background-color: ${theme.color.grey};
					border: 1.5px solid ${theme.color.grey};
					filter: none;
					cursor: not-allowed;
				`;
      case 'flat':
        return `
					color: ${theme.color.text};
					filter: none;
				`;
      case 'point':
        return `
					color: ${theme.color.primary};
					border: 1.5px solid ${theme.color.primary};
					filter: drop-shadow(1px 2px 4px rgba(188, 178, 255, 0.25));
				`;
    }
  }}

  // location
	${(props) => LocationStyle(props?.location)}
`;

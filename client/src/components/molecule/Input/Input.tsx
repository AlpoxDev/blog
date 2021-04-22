import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';

import { Text, Content } from '../../atom';
import { theme, Location, LocationStyle, spacing } from '../../../common';

export interface InputStyleProps {
  isFocused?: boolean;
  location?: Location;
}

export interface InputProps extends InputStyleProps {
  className?: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;

  label?: string;
  error?: string | null;
}

export const Input = ({
  className,
  type,
  value,
  onChange,
  placeholder,
  name,
  label,
  location,
  error,
  ...props
}: InputProps): React.ReactElement => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <>
      <InputWrapper className={className} isFocused={isFocused} location={location} {...props}>
        {!isFocused && (
          <InputTopWrapper option="flex">
            <Text.Label color="primary">{label}</Text.Label>
          </InputTopWrapper>
        )}
        <InputStyle
          isFocused={isFocused}
          type={type}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputWrapper>
    </>
  );
};

const InputWrapper = styled(Content)<InputStyleProps>`
  display: block;
  position: relative;

  height: 4rem;
  padding: 0 0.875rem;

  background-color: rgba(188, 178, 255, 0.2);
  border-bottom: 1px solid ${theme.color.primary};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  ${(props) => props.isFocused && 'border-width: 2px;'}
  ${(props) => props.location && LocationStyle(props.location)}
`;

const InputTopWrapper = styled(Content)`
  align-items: center;

  height: 1.625rem;
  padding-top: 0.625rem;
`;

const InputStyle = styled.input<InputStyleProps>`
  display: block;

  width: 100%;
  height: 1.875rem;
  padding: 0;

  font-size: 0.95rem;
  font-family: ${theme.fontFamily.spoqa};
  color: ${theme.color.text};

  background-color: transparent;
  border: 0;
  outline: none;

  ${(props) =>
    props.isFocused &&
    `
		font-size: 1rem;
		height: 4rem;
	`}
`;

const ErrorMessage = styled(Text.Label)`
  color: red;

  position: absolute;
  top: 0.625rem;
  right: 0.875rem;

  font-size: 0.8rem;
`;

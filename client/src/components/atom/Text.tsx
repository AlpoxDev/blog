/* eslint-disable react/display-name */
import React from 'react';
import styled from '@emotion/styled';

type Location = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
};

export interface TextStyleProps {
  fontSize?: number;
  fontWeight?: 700 | 600 | 500 | 400 | 300;
  fontFamily?: 'primary' | 'text';
  textColor?: string;
  lineHeight?: number;

  black?: boolean;
  primary?: boolean;
  secondary?: boolean;
  point?: boolean;
  margin?: Location;
  padding?: Location;
}

export interface TextProps extends TextStyleProps {
  children?: React.ReactNode | React.ReactNodeArray;
  onClick?: () => void;
}

export const Text = {
  H1: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH1Style onClick={onClick} {...props}>
        {children}
      </TextH1Style>
    );
  },
  H2: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH2Style onClick={onClick} {...props}>
        {children}
      </TextH2Style>
    );
  },
  H3: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH3Style onClick={onClick} {...props}>
        {children}
      </TextH3Style>
    );
  },
  H4: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH4Style onClick={onClick} {...props}>
        {children}
      </TextH4Style>
    );
  },
  Normal: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextPStyle onClick={onClick} {...props}>
        {children}
      </TextPStyle>
    );
  },
  Label: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextLabelStyle onClick={onClick} {...props}>
        {children}
      </TextLabelStyle>
    );
  },
  Span: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextPointStyle onClick={onClick} {...props}>
        {children}
      </TextPointStyle>
    );
  },
};

const TextStyleDefault = (tag: any) => styled(tag)<TextStyleProps>`
  margin: 0;
  padding: 0;

  color: #111;
  font-weight: 400;

  white-space: pre-line;

  ${() => {
    // default font-size
    switch (tag) {
      case 'h1':
        return 'font-size: 3rem;';
      case 'h2':
        return 'font-size: 2.5rem;';
      case 'h3':
        return 'font-size: 2rem;';
      case 'h4':
        return 'font-size: 1.5rem;';
      case 'p':
        return 'font-size: 1rem;';
      case 'label':
        return 'font-size: inherit;';
      case 'span':
        return 'font-size: inherit;';
      default:
        return 'font-size: 1rem;';
    }
  }}

  ${(props) => {
    if (!props.margin) return '';
    const { left, right, top, bottom } = props.margin;
    let location = '';
    if (left) location += `margin-left: ${left};`;
    if (right) location += `margin-right: ${right};`;
    if (top) location += `margin-top: ${top};`;
    if (bottom) location += `margin-bottom: ${bottom};`;

    return location;
  }}

	${(props) => {
    if (!props.padding) return '';
    const { left, right, top, bottom } = props.padding;
    let location = '';
    if (left) location += `padding-left: ${left};`;
    if (right) location += `padding-right: ${right};`;
    if (top) location += `padding-top: ${top};`;
    if (bottom) location += `padding-bottom: ${bottom};`;

    return location;
  }}

  ${(props) => props.fontSize && `font-size: ${props.fontSize}rem;`};
  ${(props) => props.lineHeight && `line-height: ${props.lineHeight}px;`};
  ${(props) => props.fontWeight && `font-weight: ${props.fontWeight};`};

  @media screen and (max-width: 1080px) {
    h1& {
      ${(props) => (props.fontSize ? `font-size: ${props.fontSize - 0.5}rem;` : 'font-size: 2.5rem;')};
      ${(props) => props.lineHeight && `line-height: ${props.lineHeight - 5}px;`};
    }
    h2& {
      ${(props) => (props.fontSize ? `font-size: ${props.fontSize - 0.5}rem;` : 'font-size: 2rem;')};
      ${(props) => props.lineHeight && `line-height: ${props.lineHeight - 5}px;`};
    }
    h3& {
      ${(props) => (props.fontSize ? `font-size: ${props.fontSize - 0.5}rem;` : 'font-size: 1.5rem;')};
      ${(props) => props.lineHeight && `line-height: ${props.lineHeight - 5}px;`};
    }
    h4& {
      ${(props) => (props.fontSize ? `font-size: ${props.fontSize - 0.5}rem;` : 'font-size: 1rem;')};
      ${(props) => props.lineHeight && `line-height: ${props.lineHeight - 5}px;`};
    }
    p& {
      ${(props) => (props.fontSize ? `font-size: ${props.fontSize - 0.1}rem;` : 'font-size: 0.9rem;')};
      ${(props) => props.lineHeight && `line-height: ${props.lineHeight - 3}px;`};
    }
  }

  ${(props) =>
    props.fontFamily
      ? `font-family: ${props.theme.fontFamily.primary};`
      : `font-family: ${props.theme.fontFamily.text};`};

  ${(props) => props.black && `color: ${props.theme.color.black}`};
  ${(props) => props.primary && `color: ${props.theme.color.textPrimary}`};
  ${(props) => props.secondary && `color: ${props.theme.color.textSecondary}`};
  ${(props) => props.point && `color: ${props.theme.color.primary}`};
`;

const TextH1Style = TextStyleDefault('h1');
const TextH2Style = TextStyleDefault('h2');
const TextH3Style = TextStyleDefault('h3');
const TextH4Style = TextStyleDefault('h4');
const TextPStyle = TextStyleDefault('p');
const TextLabelStyle = TextStyleDefault('label');
const TextPointStyle = TextStyleDefault('span');

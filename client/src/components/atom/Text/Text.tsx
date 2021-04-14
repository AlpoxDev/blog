/* eslint-disable react/display-name */
import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../../common/theme';

// http://jsfiddle.net/rsy19u6g/13/

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'label';

type Location = {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
};

type Color = 'text' | 'secondary' | 'primary' | 'subPrimary' | string;
type FontFamily = 'spoqa' | 'inter';

enum FontWeightEnum {
  Bold = 700,
  SemiBold = 600,
  Medium = 500,
  Regular = 400,
  Light = 300,
}

type FontWeight = FontWeightEnum | 700 | 600 | 500 | 400 | 300;

export interface TextStyleProps {
  tag?: TextTag;
  color?: Color;
  fontSize?: string;
  fontWeight?: FontWeight;
  fontFamily?: FontFamily;
  lineHeight?: string;

  location?:
    | Location
    | {
        margin?: Location;
        padding?: Location;
      };
}

export interface TextProps extends TextStyleProps {
  children?: React.ReactNode | React.ReactNodeArray;
  onClick?: () => void;
}

export const Text = {
  H1: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH1Style tag="h1" onClick={onClick} {...props}>
        {children}
      </TextH1Style>
    );
  },
  H2: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH2Style tag="h2" onClick={onClick} {...props}>
        {children}
      </TextH2Style>
    );
  },
  H3: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH3Style tag="h3" onClick={onClick} {...props}>
        {children}
      </TextH3Style>
    );
  },
  H4: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH4Style tag="h4" onClick={onClick} {...props}>
        {children}
      </TextH4Style>
    );
  },
  H5: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH4Style tag="h5" onClick={onClick} {...props}>
        {children}
      </TextH4Style>
    );
  },
  Content: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextPStyle tag="p" onClick={onClick} {...props}>
        {children}
      </TextPStyle>
    );
  },
  Label: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextLabelStyle tag="label" onClick={onClick} {...props}>
        {children}
      </TextLabelStyle>
    );
  },
  Accent: ({ children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextSpanStyle tag="span" onClick={onClick} {...props}>
        {children}
      </TextSpanStyle>
    );
  },
};

const TextStyleDefault = (tag: any) => styled(tag)<TextStyleProps>`
  margin: 0;

  color: ${theme.color.text};
  font-family: ${(props) => theme.fontFamily[props.fontFamily] || theme.fontFamily.spoqa};

  ${(props) => {
    const { tag } = props;
    switch (tag) {
      case 'h1':
        return `
					font-size: 2.85rem;
					font-weight: ${FontWeightEnum.SemiBold};
				`;
      case 'h2':
        return `
					font-size: 2rem;
					font-weight: ${FontWeightEnum.SemiBold};
				`;
      case 'h3':
        return `
					font-size: 1.7rem;
					font-weight: ${FontWeightEnum.SemiBold};
				`;
      case 'h4':
        return `
					font-size: 1.5rem;
					font-weight: ${FontWeightEnum.SemiBold};
				`;
      case 'h5':
        return `
					font-size: 1.3rem;
					font-weight: ${FontWeightEnum.SemiBold};
				`;
      case 'p':
        return `
					font-size: 1.125em;
					font-weight: ${FontWeightEnum.Medium};
				`;
      case 'label':
        return `
					display: inline-block;
					font-size: 0.875rem;
					font-weight: ${FontWeightEnum.Medium};
					color: ${theme.color.darkGrey};
				`;
      case 'span':
        return `
					font-size: inherit;
					font-weight: ${FontWeightEnum.SemiBold};
					font-family: inherit;
					color: ${theme.color.primary};
				`;
    }
    return '';
  }};

  // custom style
  ${(props) => props.color && `color: ${props.color};`}
  ${(props) => props.fontSize && `font-size: ${props.fontSize};`}
  ${(props) => props.lineHeight && `line-height: ${props.lineHeight};`}

  // location
  ${(props) => {
    const { location } = props;
    if (!location) return '';

    let locations = '';
    if (location.left) locations += `margin-left: ${location.left};`;
    if (location.right) locations += `margin-right: ${location.right};`;
    if (location.top) locations += `margin-top: ${location.top};`;
    if (location.bottom) locations += `margin-bottom: ${location.bottom};`;

    const { margin, padding } = location;
    if (margin) {
      if (margin.left) locations += `margin-left: ${margin.left};`;
      if (margin.right) locations += `margin-right: ${margin.right};`;
      if (margin.top) locations += `margin-top: ${margin.top};`;
      if (margin.bottom) locations += `margin-bottom: ${margin.bottom};`;
    }
    if (padding) {
      if (padding.left) locations += `padding-left: ${padding.left};`;
      if (padding.right) locations += `padding-right: ${padding.right};`;
      if (padding.top) locations += `padding-top: ${padding.top};`;
      if (padding.bottom) locations += `padding-bottom: ${padding.bottom};`;
    }

    return locations;
  }}
`;

const TextH1Style = TextStyleDefault('h1');
const TextH2Style = TextStyleDefault('h2');
const TextH3Style = TextStyleDefault('h3');
const TextH4Style = TextStyleDefault('h4');
const TextPStyle = TextStyleDefault('p');
const TextLabelStyle = TextStyleDefault('label');
const TextSpanStyle = TextStyleDefault('span');

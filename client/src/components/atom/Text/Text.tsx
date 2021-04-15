/* eslint-disable react/display-name */
import React from 'react';
import styled from '@emotion/styled';
import { theme } from '../../../common/theme';
import { Location, LocationStyle } from '../../../common';

// http://jsfiddle.net/rsy19u6g/13/

type TextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'label';
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
  underline?: boolean;
  pointer?: boolean;

  location?: Location;
}

export interface TextProps extends TextStyleProps {
  className?: string;
  children?: React.ReactNode | React.ReactNodeArray;
  onClick?: () => void;
}

export const Text = {
  H1: ({ className, children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH1Style className={className} tag="h1" onClick={onClick} {...props}>
        {children}
      </TextH1Style>
    );
  },
  H2: ({ className, children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH2Style className={className} tag="h2" onClick={onClick} {...props}>
        {children}
      </TextH2Style>
    );
  },
  H3: ({ className, children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH3Style className={className} tag="h3" onClick={onClick} {...props}>
        {children}
      </TextH3Style>
    );
  },
  H4: ({ className, children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH4Style className={className} tag="h4" onClick={onClick} {...props}>
        {children}
      </TextH4Style>
    );
  },
  H5: ({ className, children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextH4Style className={className} tag="h5" onClick={onClick} {...props}>
        {children}
      </TextH4Style>
    );
  },
  Content: ({ className, children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextPStyle className={className} tag="p" onClick={onClick} {...props}>
        {children}
      </TextPStyle>
    );
  },
  Label: ({ className, children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextLabelStyle className={className} tag="label" onClick={onClick} {...props}>
        {children}
      </TextLabelStyle>
    );
  },
  Accent: ({ className, children, onClick, ...props }: TextProps): JSX.Element => {
    return (
      <TextSpanStyle className={className} tag="span" onClick={onClick} {...props}>
        {children}
      </TextSpanStyle>
    );
  },
};

const TextStyleDefault = (tag: any) => styled(tag)<TextStyleProps>`
  margin: 0;

  white-space: pre-line;
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
					font-weight: ${FontWeightEnum.Regular};
				`;
      case 'label':
        return `
					display: block;
					font-size: 0.875rem;
					font-weight: ${FontWeightEnum.Regular};
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
  ${(props) => props.color && `color: ${theme.color[props.color]};`}
  ${(props) => props.fontSize && `font-size: ${props.fontSize};`}
	${(props) => props.fontWeight && `font-weight: ${props.fontWeight};`}
  ${(props) => props.lineHeight && `line-height: ${props.lineHeight};`}
	${(props) => props.underline && 'text-decoration: underline;'};
  ${(props) => props.pointer && 'cursor: pointer;'};

  // location
  ${(props) => LocationStyle(props?.location)}
`;

const TextH1Style = TextStyleDefault('h1');
const TextH2Style = TextStyleDefault('h2');
const TextH3Style = TextStyleDefault('h3');
const TextH4Style = TextStyleDefault('h4');
const TextPStyle = TextStyleDefault('p');
const TextLabelStyle = TextStyleDefault('label');
const TextSpanStyle = TextStyleDefault('span');

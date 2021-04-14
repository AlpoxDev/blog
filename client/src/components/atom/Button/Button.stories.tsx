import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './Button';

export default {
  title: 'atom/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children: 'Primary',
  option: 'primary',
  onClick: () => alert('Primary Button!'),
};

export const Secondary = Template.bind({});

Secondary.args = {
  children: 'Disabled',
  option: 'disabled',
  onClick: () => alert('Secondary Button!'),
} as ButtonProps;

export const Flat = Template.bind({});

Flat.args = {
  children: 'Flat',
  option: 'flat',
  onClick: () => alert('Flat Button!'),
} as ButtonProps;

export const Point = Template.bind({});

Point.args = {
  children: 'Point',
  option: 'point',
  onClick: () => alert('Point Button!'),
} as ButtonProps;

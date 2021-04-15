import { Story, Meta } from '@storybook/react';

import { Input, InputProps } from './Input';

export default {
  title: 'molecule/Input',
  component: Input,
} as Meta;

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'input',
  value: '',
  placeholder: 'default input',
} as InputProps;

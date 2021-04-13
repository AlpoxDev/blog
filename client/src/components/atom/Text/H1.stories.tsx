import { Story, Meta } from '@storybook/react';
import { Text, TextProps } from './Text';

export default {
  title: 'atom/Text',
  component: Text.H1,
} as Meta;

const Template: Story<TextProps> = (args) => <Text.H1 {...args} />;

export const H1 = Template.bind({});

H1.args = {
  children: 'H1 Text Storybook',
};

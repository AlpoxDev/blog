import { Story, Meta } from '@storybook/react';
import { Text, TextProps } from './Text';

export default {
  title: 'atom/Text',
  component: Text.Content,
} as Meta;

const TemplateH1: Story<TextProps> = (args) => <Text.H1 {...args} />;
const TemplateH2: Story<TextProps> = (args) => <Text.H2 {...args} />;
const TemplateH3: Story<TextProps> = (args) => <Text.H3 {...args} />;
const TemplateH4: Story<TextProps> = (args) => <Text.H4 {...args} />;
const TemplateH5: Story<TextProps> = (args) => <Text.H5 {...args} />;
const TemplateContent: Story<TextProps> = (args) => <Text.Content {...args} />;
const TemplateLabel: Story<TextProps> = (args) => <Text.Label {...args} />;
const TemplateAccent: Story<TextProps> = (args) => <Text.Accent {...args} />;

export const H1 = TemplateH1.bind({});
H1.args = {
  children: 'H1 Text/텍스트',
  fontFamily: 'inter',
} as Omit<TextProps, 'tag'>;

export const H2 = TemplateH2.bind({});
H2.args = {
  children: 'H2 Text/텍스트',
  fontFamily: 'inter',
} as Omit<TextProps, 'tag'>;

export const H3 = TemplateH3.bind({});
H3.args = {
  children: 'H3 Text/텍스트',
  fontFamily: 'inter',
} as Omit<TextProps, 'tag'>;

export const H4 = TemplateH4.bind({});
H4.args = {
  children: 'H4 Text/텍스트',
  fontFamily: 'inter',
} as Omit<TextProps, 'tag'>;

export const H5 = TemplateH5.bind({});
H5.args = {
  children: 'H5 Text/텍스트',
  fontFamily: 'inter',
} as Omit<TextProps, 'tag'>;

export const Content = TemplateContent.bind({});
Content.args = {
  children: 'P Text/텍스트',
  fontFamily: 'spoqa',
} as Omit<TextProps, 'tag'>;

export const Label = TemplateLabel.bind({});
Label.args = {
  children: 'Label Text/텍스트',
  fontFamily: 'spoqa',
} as Omit<TextProps, 'tag'>;

export const Span = TemplateAccent.bind({});
Span.args = {
  children: 'Span Text/텍스트',
  fontFamily: 'inter',
};

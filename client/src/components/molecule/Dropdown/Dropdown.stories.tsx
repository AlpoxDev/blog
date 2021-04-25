import { Story, Meta } from '@storybook/react';

import { Dropdown, DropdownProps } from './Dropdown';
import { Button } from '../../atom';

export default {
  title: 'molecule/Dropdown',
  component: Dropdown,
} as Meta;

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: ['item1', 'item2', 'item3'],
  onSelectItem: (item: string) => alert(item),
  children: <Button option="flat">Dropdown</Button>,
} as DropdownProps;

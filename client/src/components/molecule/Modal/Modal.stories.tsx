import { Story, Meta } from '@storybook/react';

import { Modal, ModalProps } from './Modal';

export default {
  title: 'molecule/Modal',
  component: Modal,
} as Meta;

const Template: Story<ModalProps> = (args: ModalProps) => <Modal {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: '기본 모달',
  info: '기본 모달 정보',
  children: '모달 children',
  view: true,
};

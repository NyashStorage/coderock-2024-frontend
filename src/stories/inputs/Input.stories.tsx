import type { Meta, StoryFn } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faWrench } from '@fortawesome/free-solid-svg-icons';

import Input from '../../components/inputs/Input';

const StartIcon = <FontAwesomeIcon icon={faBug} />;
const EndIcon = <FontAwesomeIcon icon={faWrench} />;

export default {
  title: 'Inputs/Input',
  component: Input,
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => (
  <Input className="w-[50%]" {...args} />
);

export const Default = Template.bind({});

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'Введи что-нибудь в меня, семпай~',
};

export const WithPlaceholderDisabled = Template.bind({});
WithPlaceholderDisabled.args = {
  placeholder: 'Не вводи в меня ничего!',
  disabled: true,
};

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  defaultValue: 'Текст',
};

export const WithDefaultValueDisabled = Template.bind({});
WithDefaultValueDisabled.args = {
  defaultValue: 'Неизменяемый текст',
  disabled: true,
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  startIcon: StartIcon,
  endIcon: EndIcon,
  placeholder: 'Введи что-нибудь в меня, семпай~',
};

export const WithIconsDisabled = Template.bind({});
WithIconsDisabled.args = {
  startIcon: StartIcon,
  endIcon: EndIcon,
  placeholder: 'Не вводи в меня ничего!',
  disabled: true,
};

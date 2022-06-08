import StyledButton from './StyledButton';

export default {
  title: 'components/StyledButton',
  component: StyledButton,
  argTypes: { onClick: 'onClick' },
};

const Template = args => <StyledButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Click me',
};

export const Submit = Template.bind({});
Submit.args = {
  children: 'Submit',
  variant: 'submit',
};

export const More = Template.bind({});
More.args = {
  children: 'show more',
  variant: 'more',
};

export const Reset = Template.bind({});
Reset.args = {
  children: 'reset',
  variant: 'reset',
};

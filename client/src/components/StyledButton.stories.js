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

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: 'FullWidth',
  variant: 'fullWidth',
};

export const More = Template.bind({});
More.args = {
  children: 'show more',
  variant: 'more',
};

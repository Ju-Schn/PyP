import styled, { css } from 'styled-components';

export default styled.button`
  display: flex;
  border-radius: 30px;
  background-color: #223240;
  color: #93d94e;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 112.5%;
  align-items: center;
  gap: 8px;

  ${props =>
    props.variant === 'submit' &&
    css`
      background-color: #93d94e;
      color: #223240;
      justify-content: center;
      margin: 8px 0;
    `}

  ${props =>
    props.variant === 'more' &&
    css`
      display: flex;
      justify-content: center;
      margin: 8px 16px;
    `}

    ${props =>
    props.variant === 'reset' &&
    css`
      background-color: #d92b04;
      color: #070a0d;
      margin: 8px 0;
    `}
`;

import styled, { css } from 'styled-components'

export default styled.button`
  display: flex;
  border-radius: 30px;
  background-color: #223240;
  color: #93d94e;
  padding: 8px 16px;
  font-weight: 600;
  align-items: center;
  gap: 8px;

  ${props =>
    props.variant === 'submit' &&
    css`
      background-color: #93d94e;
      color: #223240;
    `}

  ${props =>
    props.variant === 'fullWidth' &&
    css`
      width: 100%;
      justify-content: center;
    `}

    ${props =>
    props.variant === 'center' &&
    css`
      align-self: center;
    `}
`
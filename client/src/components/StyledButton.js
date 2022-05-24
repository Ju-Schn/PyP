import styled, { css } from 'styled-components'

export default styled.button`
  border-radius: 30px;
  background-color: #223240;
  color: #93d94e;
  padding: 8px 16px;
  font-weight: 600;

  ${props =>
    props.variant === 'submit' &&
    css`
      background-color: #93d94e;
      color: #223240;
    `}
`

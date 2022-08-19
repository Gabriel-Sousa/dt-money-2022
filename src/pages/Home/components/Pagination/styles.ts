import styled from 'styled-components'
export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  margin-top: 2.5rem;
  margin-bottom: 2.5rem;

  svg {
    cursor: pointer;

    color: ${(props) => props.theme['green-500']};

    &:not(.disabled):hover {
      color: ${(props) => props.theme['green-700']};
      transition: 0.2ms color;
    }
    &.disabled {
      cursor: not-allowed;
      color: ${(props) => props.theme['gray-400']};
    }
  }

  span {
    cursor: pointer;

    font-family: 'Roboto';
    font-weight: 700;
    font-size: 1rem;
    line-height: 1.4;
    text-align: center;
    padding: 0.5rem 1rem;
    background: ${(props) => props.theme['gray-600']};
    color: ${(props) => props.theme['gray-400']};
    border-radius: 6px;

    &.active {
      color: ${(props) => props.theme.white};
      background: ${(props) => props.theme['green-700']};
    }
  }
`

import styled from 'styled-components'

interface ButtonActive {
  active?: boolean
}

export const PaginationContainer = styled.div`
  width: 100%;

  margin: 3rem auto;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`
export const IconsButton = styled.button<ButtonActive>`
  background: transparent;
  border: 0;
  cursor: pointer;

  svg {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) =>
      props.active ? props.theme['green-500'] : props.theme['gray-600']};

    &:hover {
      color: ${(props) => props.theme['green-500']};
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    border-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme.white};
    transition:
      background-color 0.2s,
      color 0.2s,
      border-color 0.2s;
  }
`
export const PageButton = styled.button<ButtonActive>`
  background: transparent;
  border: 0;
  cursor: pointer;

  margin: 0 8px;
  border-radius: 6px;

  background: ${(props) =>
    props.active ? props.theme['green-500'] : props.theme['gray-600']};
  color: ${(props) =>
    props.active ? props.theme['gray-100'] : props.theme['gray-300']};

  width: 40px;
  height: 40px;

  &:hover {
    background: ${(props) => props.theme['green-500']};
    border-color: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['gray-100']};
    transition:
      background-color 0.2s,
      color 0.2s,
      border-color 0.2s;
  }

  /* &:focus {
    outline: none;
    box-shadow: none;
  } */
`

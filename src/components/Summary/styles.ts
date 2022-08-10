import styled from 'styled-components'

interface SummaryCardProps {
  variant: 'income' | 'outcome' | 'total'
}

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;
`

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  :last-child {
    background: ${(props) => props.theme['green-700']};
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  svg {
    color: ${(props) =>
      props.variant === 'income'
        ? props.theme['green-300']
        : props.variant === 'outcome'
        ? props.theme['red-300']
        : props.theme.white};
  }
`

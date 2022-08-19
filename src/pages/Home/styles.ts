import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`
export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    :first-child {
      width: 40%;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    :last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }

  .loadingTable {
    td {
      width: 100%;
      padding: 1.25rem 2rem;
    }
  }
`

export const TransactionsMobile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  margin-top: 0.875rem;

  .transactions {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    padding: 1.25rem;
    /* max-width: 20rem; */

    border-radius: 6px;

    background-color: ${(props) => props.theme['gray-700']};

    .transactionsTittle {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.6;
      color: ${(props) => props.theme['gray-300']};
    }

    .transactionsPrice {
      font-family: 'Roboto';
      font-style: normal;
      font-weight: 700;
      font-size: 1.25rem;
      line-height: 1.6;
      margin-bottom: 0.75rem;
    }

    footer {
      display: flex;
      justify-content: space-between;
      color: ${(props) => props.theme['gray-500']};
      span {
        display: flex;
        align-items: center;
      }
    }
  }
`

interface PriceHightLightProps {
  variant: 'income' | 'outcome'
}

export const PriceHightLight = styled.span<PriceHightLightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`

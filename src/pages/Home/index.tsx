import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionContext } from '../../contexts/TransactionsContext'
import { SearchForm } from './components/SearchForm'
import { dateFormatter, formatPrice } from '../../util/formatter'

import {
  PriceHightLight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'
import Skeleton from 'react-loading-skeleton'
import { useContextSelector } from 'use-context-selector'

export function Home() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })
  const isLoading = useContextSelector(TransactionContext, (context) => {
    return context.isLoading
  })

  return (
    <>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {isLoading === true ? (
              <tr className="loadingTable">
                <td colSpan={4}>
                  <Skeleton height={19} />
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.description}</td>
                  <td>
                    <PriceHightLight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {formatPrice(transaction.price)}
                    </PriceHightLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter(new Date(transaction.createdAt))}</td>
                </tr>
              ))
            )}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}

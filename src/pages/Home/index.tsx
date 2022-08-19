import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { TransactionContext } from '../../contexts/TransactionsContext'
import { SearchForm } from './components/SearchForm'
import { dateFormatter, formatPrice } from '../../util/formatter'

import {
  PriceHightLight,
  TransactionsContainer,
  TransactionsMobile,
  TransactionsTable,
} from './styles'
import Skeleton from 'react-loading-skeleton'
import { useContextSelector } from 'use-context-selector'
import { Pagination } from './components/Pagination'
import { useEffect, useState } from 'react'
import { CalendarBlank, TagSimple } from 'phosphor-react'

interface Transaction {
  id: number
  type: 'income' | 'outcome'
  description: string
  category: string
  price: number
  createdAt: string
}

interface PagesProps {
  totalPages: number
  currentPage: number
}

export function Home() {
  const transactions = useContextSelector(TransactionContext, (context) => {
    return context.transactions
  })
  const isLoading = useContextSelector(TransactionContext, (context) => {
    return context.isLoading
  })

  const [pages, setPages] = useState({} as PagesProps)
  const [transactionsLimit, setTransactionsLimit] = useState<Transaction[]>([])

  useEffect(() => {
    const informationAboutPages = {
      totalPages: Math.ceil(transactions.length / 10),
      currentPage: 1,
    } as PagesProps

    setPages(informationAboutPages)
  }, [transactions])

  useEffect(() => {
    let transactionsModified = [...transactions]
    const start = pages.currentPage === 1 ? 0 : 10 * (pages.currentPage - 1)
    const end = 10 * pages.currentPage // 20
    transactionsModified = transactionsModified.slice(start, end)

    setTransactionsLimit(transactionsModified)
  }, [pages, transactions])

  function onChangePages(currentPage: number) {
    setPages({ currentPage, totalPages: pages.totalPages })
  }

  console.log(screen.height)
  console.log(screen.height >= 1080)

  return (
    <>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />

        {screen.height >= 1080 ? (
          <TransactionsTable>
            <tbody>
              {isLoading === true ? (
                <tr className="loadingTable">
                  <td colSpan={4}>
                    <Skeleton height={19} />
                  </td>
                </tr>
              ) : (
                transactionsLimit.map((transaction) => {
                  return (
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
                  )
                })
              )}
            </tbody>
          </TransactionsTable>
        ) : (
          <TransactionsMobile>
            {isLoading === true ? (
              <div className="loadingTable">
                <Skeleton height={19} />
              </div>
            ) : (
              transactionsLimit.map((transaction) => {
                return (
                  <div key={transaction.id} className="transactions">
                    <span className="transactionsTittle">
                      {transaction.description}
                    </span>
                    <span className="transactionsPrice">
                      <PriceHightLight variant={transaction.type}>
                        {transaction.type === 'outcome' && '- '}
                        {formatPrice(transaction.price)}
                      </PriceHightLight>
                    </span>
                    <footer>
                      <span>
                        <TagSimple size={16} />
                        {transaction.category}
                      </span>
                      <span>
                        <CalendarBlank size={16} />
                        {dateFormatter(new Date(transaction.createdAt))}
                      </span>
                    </footer>
                  </div>
                )
              })
            )}
          </TransactionsMobile>
        )}

        <Pagination
          handleChangePages={onChangePages}
          pages={pages}
          transactionsFound={transactionsLimit.length > 0}
        />
      </TransactionsContainer>
    </>
  )
}

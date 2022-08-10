import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import Skeleton from 'react-loading-skeleton'

import { TransactionContext } from '../../contexts/TransactionsContext'
import { SummaryCard, SummaryContainer } from './styles'
import { formatPrice } from '../../util/formatter'
import { useSummary } from '../../hooks/useSummary'
import { useContextSelector } from 'use-context-selector'

export function Summary() {
  const isLoading = useContextSelector(
    TransactionContext,
    (context) => context.isLoading,
  )
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryCard variant="income">
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} />
        </header>
        <strong>
          {isLoading === true ? <Skeleton /> : formatPrice(summary.income)}
        </strong>
      </SummaryCard>

      <SummaryCard variant="outcome">
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} />
        </header>

        <strong>
          {isLoading === true ? <Skeleton /> : formatPrice(summary.outcome)}
        </strong>
      </SummaryCard>

      <SummaryCard variant="total">
        <header>
          <span>Entradas</span>
          <CurrencyDollar size={32} />
        </header>
        <strong>
          {isLoading === true ? <Skeleton /> : formatPrice(summary.total)}
        </strong>
      </SummaryCard>
    </SummaryContainer>
  )
}

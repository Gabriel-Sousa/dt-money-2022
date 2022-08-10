import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { SearchFormContainer } from './styles'
import { TransactionContext } from '../../../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const searchFormSchema = zod.object({
  query: zod.string(),
})

type SearchInputs = zod.infer<typeof searchFormSchema>

export function SearchForm() {
  const fetchTransactions = useContextSelector(
    TransactionContext,
    (context) => context.fetchTransactions,
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchInputs) {
    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

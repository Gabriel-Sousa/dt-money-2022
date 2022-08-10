import * as Dialog from '@radix-ui/react-dialog'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import {
  Overlay,
  Content,
  CloseButton,
  TransactionTypeButton,
  TransactionType,
} from './styles'
import { TransactionContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

const newTransactionFormSchema = zod.object({
  description: zod.string(),
  price: zod.number(),
  category: zod.string(),
  type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionContext,
    (context) => {
      return context.createTransaction
    },
  )
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    createTransaction(data)

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="" onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            {...register('description')}
            placeholder="Descrição"
            required
          />
          <input
            type="number"
            {...register('price', { valueAsNumber: true })}
            placeholder="Preço"
            required
          />
          <input
            type="text"
            {...register('category')}
            placeholder="Categoria"
            required
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}

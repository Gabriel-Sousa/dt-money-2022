import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  type: 'income' | 'outcome'
  description: string
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  isLoading: boolean
  fetchTransactions: (data?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionContext = createContext<TransactionContextType>(
  {} as TransactionContextType,
)

export function TransactionProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('/transactions', {
      params: { _sort: 'createdAt', _order: 'desc', q: query },
    })

    setTransactions(response.data)

    if (response.data.length >= 0) {
      setIsLoading(false)
    }
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, type, category } = data

      const response = await api.post('/transactions', {
        description,
        price,
        type,
        category,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])
  return (
    <TransactionContext.Provider
      value={{ transactions, isLoading, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  )
}

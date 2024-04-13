import { ReactNode, useCallback, useEffect, useState } from 'react'

import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface FetchPaginationProps {
  query?: string
  page?: number
}

interface TransactionContextType {
  transactions: Transaction[]
  pagination: Transaction[]
  limitPerPage: number
  fetchTransactions: ({ query, page }: FetchPaginationProps) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

const limitPerPage = 5

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [pagination, setPagnation] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(
    async ({ query = '', page = 1 }: FetchPaginationProps) => {
      const response = await api.get('transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
          _page: page,
          _limit: limitPerPage,
          q: query,
        },
      })

      setTransactions(response.data)
    },
    [],
  )

  const fetchPaginationTransactions = useCallback(async () => {
    const response = await api.get('transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    setPagnation(response.data)
  }, [])

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const response = await api.post('transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchTransactions({})
    fetchPaginationTransactions()
  }, [fetchTransactions, fetchPaginationTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        pagination,
        limitPerPage,
        fetchTransactions,
        createTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

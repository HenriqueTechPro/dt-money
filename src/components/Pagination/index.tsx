import { CaretLeft, CaretRight } from 'phosphor-react'
import { IconsButton, PageButton, PaginationContainer } from './styles'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'

export function Pagination() {
  const pagination = useContextSelector(TransactionsContext, (context) => {
    return context.pagination
  })
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    },
  )
  const limitPerPage = useContextSelector(TransactionsContext, (context) => {
    return context.limitPerPage
  })

  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(pagination.length / limitPerPage) // arredonda para cima, buscado o tatal de paginas dividido pelo limite

  const visiblePages = useMemo(() => {
    const maxVisiblePages = 2

    const startPage = Math.max(1, currentPage - maxVisiblePages)
    const endPage = Math.min(totalPages, currentPage + maxVisiblePages)
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    )
  }, [currentPage, totalPages])

  const handlePagesTransactions = useCallback(async () => {
    await fetchTransactions({ page: currentPage })
  }, [currentPage, fetchTransactions])

  useEffect(() => {
    handlePagesTransactions()
  }, [handlePagesTransactions])

  const prevPage = currentPage > 1
  const nextPage = currentPage < totalPages

  return (
    <PaginationContainer>
      <IconsButton
        onClick={() => setCurrentPage(currentPage - 1)}
        active={prevPage ? true : undefined}
        disabled={!prevPage}
      >
        <CaretLeft size={24} />
      </IconsButton>
      <div>
        {visiblePages.map((page) => (
          <PageButton
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
            key={page}
          >
            {page}
          </PageButton>
        ))}
      </div>
      <IconsButton
        onClick={() => setCurrentPage(currentPage + 1)}
        active={nextPage ? true : undefined}
        disabled={!nextPage}
      >
        <CaretRight size={24} />
      </IconsButton>
    </PaginationContainer>
  )
}

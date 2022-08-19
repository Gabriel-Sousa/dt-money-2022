import { CaretLeft, CaretRight } from 'phosphor-react'
import { PaginationContainer } from './styles'

interface PagesProps {
  totalPages: number
  currentPage: number
}

interface PaginationProps {
  handleChangePages: (currentPage: number) => void
  pages: PagesProps
  transactionsFound: boolean
}

export function Pagination({
  handleChangePages,
  pages,
  transactionsFound,
}: PaginationProps) {
  const totalPagesArray = transactionsFound ? [] : [1]

  for (let i = 1; i <= pages.totalPages; i++) {
    totalPagesArray.push(i)
  }

  console.log(totalPagesArray)

  const after = totalPagesArray.findIndex((page) => page < pages.currentPage)
  const before = totalPagesArray.findIndex((page) => page > pages.currentPage)

  return (
    <PaginationContainer>
      <CaretLeft
        weight="bold"
        size={24}
        className={after === -1 ? 'disabled' : ''}
        onClick={() =>
          after === -1 ? '' : handleChangePages(pages.currentPage - 1)
        }
      />

      {totalPagesArray.map((page) => (
        <span
          className={pages.currentPage === page ? 'active' : ''}
          key={page}
          onClick={() => handleChangePages(page)}
        >
          {page}
        </span>
      ))}
      <CaretRight
        weight="bold"
        size={24}
        className={before === -1 ? 'disabled' : ''}
        onClick={() =>
          before === -1 ? '' : handleChangePages(pages.currentPage + 1)
        }
      />
    </PaginationContainer>
  )
}

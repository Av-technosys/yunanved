"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface Props {
  currentPage: number
  totalPages: number
}

const ProductPagination = ({ currentPage, totalPages }: Props) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", String(page))
    return `${pathname}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
                    className="cursor-pointer"

            onClick={() =>
              currentPage > 1 &&
              router.push(createPageURL(currentPage - 1))
            }
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1
          return (
            <PaginationItem           className="cursor-pointer"
 key={page}>
              <PaginationLink
                isActive={page === currentPage}
                onClick={() => router.push(createPageURL(page))}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext 
          className="cursor-pointer"
            onClick={() =>
              currentPage < totalPages &&
              router.push(createPageURL(currentPage + 1))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default ProductPagination

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type PaginationProps = {
  currentPage: string;
  pageNumbers: number;
  query?: string;
};

export default function Pagination({
  currentPage,
  pageNumbers,
  query,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentOrder = searchParams.get("order") || "relevance";
  const allPages = Array.from({ length: pageNumbers }, (_, index) => index + 1);
  function PageCalculator() {
    if (parseInt(currentPage) === 1) {
      return allPages.slice(0, 3);
    } else if (parseInt(currentPage) >= pageNumbers && pageNumbers > 2) {
      return allPages.slice(pageNumbers - 3, pageNumbers + 1);
    } else {
      return allPages.slice(
        parseInt(currentPage) - 2,
        parseInt(currentPage) + 1
      );
    }
  }
  const numbers = PageCalculator();
  return (
    <div className="flex justify-center items-center gap-4">
      {parseInt(currentPage) === 1 ? (
        <></>
      ) : (
        <Link
          href={
            query
              ? `${pathname}?q=${query}&p=${
                  parseInt(currentPage) - 1
                }&order=${currentOrder}`
              : `${pathname}?p=${
                  parseInt(currentPage) - 1
                }&order=${currentOrder}`
          }
        >
          <IoIosArrowBack className="text-xl" />
        </Link>
      )}
      {numbers.map((number, i) =>
        parseInt(currentPage) === number ? (
          <div
            key={i}
            className={clsx("text-color-5", {
              "border-b-2 border-color-7 font-semibold":
                number === parseInt(currentPage),
            })}
          >
            {number}
          </div>
        ) : (
          <Link
            key={i}
            href={
              query
                ? `${pathname}?q=${query}&p=${number}&order=${currentOrder}`
                : `${pathname}?p=${number}&order=${currentOrder}`
            }
          >
            {number}
          </Link>
        )
      )}
      {parseInt(currentPage) >= pageNumbers ? (
        <></>
      ) : (
        <Link
          href={
            query
              ? `${pathname}?q=${query}&p=${
                  parseInt(currentPage) + 1
                }&order=${currentOrder}`
              : `${pathname}?p=${
                  parseInt(currentPage) + 1
                }&order=${currentOrder}`
          }
        >
          <IoIosArrowForward className="text-xl" />
        </Link>
      )}
    </div>
  );
}

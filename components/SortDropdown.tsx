import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface SortDropdownProps {
  dropdownOptions: Array<DropdownArray>;
  selectedOption: string;
  query?: string;
}

interface DropdownArray {
  pt: string;
  en: string;
}

export default function SortDropdown({
  dropdownOptions,
  selectedOption,
  query,
}: SortDropdownProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const options = dropdownOptions.map((option, index) => {
    return (
      <Link
        key={index}
        href={
          query
            ? `${pathname}?q=${query}&order=${option.en.toLowerCase()}`
            : `${pathname}?order=${option.en.toLowerCase()}`
        }
      >
        <div
          className={`${
            parseInt(selectedOption) === index ? "hidden" : "cursor-pointer"
          }`}
          key={index}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          {option.pt}
          <hr className="text-color-5/25 mt-3" />
        </div>
      </Link>
    );
  });

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      className="relative font-montse text-color-5 text-base"
      ref={dropdownRef}
    >
      <div
        onClick={handleToggle}
        className="flex items-center gap-3 border border-color-5/25 w-44 justify-between px-4 py-2 rounded-xl cursor-pointer"
      >
        {dropdownOptions[parseInt(selectedOption)].pt}
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {isOpen && (
        <div className="absolute flex flex-col border border-color-5/25 w-64 right-0 shadow-lg rounded-xl gap-3 p-5 mt-1 bg-color-3">
          <div className="font-semibold">Ordenar por</div>
          {options}
        </div>
      )}
    </div>
  );
}

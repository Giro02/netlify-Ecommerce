import { formatCurrency } from "@/utils/UtilityFunctions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type BundleDropdownProps = {
  priceBundle: Array<{ unitPrice: number; unitsNumber: number }>;
  selectedOption: number;
};

export default function BundleDropdown({
  priceBundle,
  selectedOption,
}: BundleDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const bundles = priceBundle.map((bundle, index) => {
    return (
      <Link
        href={`${pathname}?bundle=${index}`}
        className="cursor-pointer"
        key={index}
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <div className="flex items-center justify-between">
          Compre {bundle.unitsNumber} por {formatCurrency(bundle.unitPrice)}{" "}
          {selectedOption === 0 ? "" : "cada"}
          <div
            className={` ${
              selectedOption === index
                ? "bg-color-1 rounded-full h-[8px] w-[8px]"
                : ""
            } `}
          />
        </div>
        <hr className="text-color-5/25 mt-3" />
      </Link>
    );
  });

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

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
        className="flex items-center gap-3 border border-color-5/25 justify-between px-4 py-2 rounded-xl cursor-pointer"
      >
        Compre {priceBundle[selectedOption].unitsNumber} por{" "}
        {formatCurrency(priceBundle[selectedOption].unitPrice)}{" "}
        {selectedOption === 0 ? "" : "cada"}
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {isOpen && (
        <div className="absolute flex flex-col border border-color-5/25 w-full max-w-[450px] right-0 shadow-lg rounded-xl gap-3 p-5 mt-1 bg-color-3">
          {bundles}
        </div>
      )}
    </div>
  );
}

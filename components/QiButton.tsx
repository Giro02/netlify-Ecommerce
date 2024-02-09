import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react";
import { FaCircle } from "react-icons/fa";

type QiButtonProps = PropsWithChildren<{
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  iconClassName?: string;
  className?: string;
}>;

export default function QiButton({
  leftIcon,
  rightIcon,
  children,
  className,
  iconClassName,
}: QiButtonProps) {
  return (
    <div>
      <button
        className={clsx(
          "rounded-full min-w-[4rem] flex items-center text-lg leading-none min-h-[4rem] gap-3  place-content-center [&>div]:shrink-0",
          { "px-7 py-5": !!children },
          className
        )}
      >
        {leftIcon && <div className={iconClassName}>{leftIcon}</div>}
        {children && <div>{children}</div>}
        {rightIcon && <div className={iconClassName}>{rightIcon}</div>}
      </button>
    </div>
  );
}

QiButton.variants = {
  lightGreen: {
    className: "text-color-3 bg-color-1 hover:bg-color-2",
  },
};

QiButton.icons = {
  circle: <FaCircle className="text-[0.7em]" />,
};

import React, { useEffect, useRef } from "react";
import { useCart } from "@/app/context/CartContext";

type CartAnimationProps = {
  productImage: string;
  onComplete: () => void;
};

const CartAnimation: React.FC<CartAnimationProps> = ({
  productImage,
  onComplete,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current) {
      const animation = imageRef.current.animate(
        [
          { transform: "scale(1)", opacity: 1 },
          { transform: "scale(0.5)", opacity: 0 },
        ],
        {
          duration: 500,
          easing: "ease-in-out",
          fill: "forwards",
        }
      );

      animation.onfinish = () => {
        onComplete();
      };
    }
  }, [onComplete]);

  return (
    <img
      ref={imageRef}
      src={productImage}
      alt="Animação do Carrinho"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        width: "50px",
        height: "50px",
      }}
    />
  );
};

export default CartAnimation;

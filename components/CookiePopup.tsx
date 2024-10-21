"use client";
import { useState, useEffect } from "react";

const CookiePopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 px-4 py-6 z-50 bg-color-3 max-w-[350px] shadow-lg text-color-5 border border-color-5/50">
      <div className="flex flex-col">
        <h1 className="font-medium text-lg">Consentimento de Cookies</h1>
        <p className="text-sm inline mt-4">
          Nós utilizamos os cookies para gerar dados estatísticos e garantir que
          você tenha a melhor experiência em nosso site. Conheça a nossa
        </p>
        <p className="underline cursor-pointer text-color-1 text-sm inline">
          Politica de privacidade
        </p>
        <button
          className="bg-color-1 rounded-lg mt-4"
          onClick={handleAcceptCookies}
          style={styles.acceptButton}
        >
          Aceitar Cookies
        </button>
      </div>
    </div>
  );
};

const styles = {
  popupContainer: {
    position: "fixed" as "fixed",
    bottom: "20px",
    left: "20px",
    right: "20px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    padding: "15px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    zIndex: 1000,
  },
  acceptButton: {
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
  },
};

export default CookiePopup;

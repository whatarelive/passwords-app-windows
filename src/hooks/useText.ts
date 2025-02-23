import { useNotificationStore } from "@/store/notidication-store";
import { useState } from "react";

export const useText = (value: string) => {
  const [showText, setShowText] = useState(false);
  const setView = useNotificationStore((state) => state.setView);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setView("Copiado al portapapeles");
      
    } catch (error) {
      setView("Error al Copiar");  
    }
  }

  const handleShowText = () => setShowText(!showText)

  return {
    showText,
    handleCopyText,
    handleShowText
  }
}

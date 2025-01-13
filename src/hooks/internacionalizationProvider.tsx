import React, { createContext, ReactNode, useEffect, useState } from "react";
import { translation } from "@/assets/i18n/index";
import { I18n } from "i18n-js";

// Defina o tipo de dados que você deseja armazenar no contexto
type InternacionalizationData = {
  getMessage: (key: string, count?: number) => string | undefined;
};

// Crie o contexto
export const InternacionalizationContext =
  createContext<InternacionalizationData>({
    getMessage: () => undefined,
  });

// Crie o provedor do contexto
export const InternacionalizationProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  // Defina o estado inicial do contexto
  const [internacionalizationData, setInternacionalizationData] = useState<
    I18n | undefined
  >(undefined);

  // Adicione qualquer lógica adicional que você precise aqui
  useEffect(() => {
    const i18n = new I18n({ ...translation });
    i18n.locale = "pt-BR"; // settar localização se precisar de outra linguagem
    setInternacionalizationData(i18n);
  }, []);

  function getMessage(key: string, count?: number): string | undefined {
    const text = internacionalizationData?.t(key, { defaultValue: key }); // configurar dynamic values depois
    return text;
  }

  // Renderize o provedor do contexto com o valor atualizado
  return (
    <InternacionalizationContext.Provider
      value={{
        getMessage,
      }}
    >
      {children}
    </InternacionalizationContext.Provider>
  );
};

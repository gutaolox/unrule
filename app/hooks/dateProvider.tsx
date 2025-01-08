import React, { createContext, useState, useEffect } from 'react';

// Crie o contexto
const DateContext = createContext<any>(null);// TODO: Definir o tipo de dado

// Crie o provider
const DateProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<any>(null);

    // Simule uma busca de dados
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Faça a busca de dados aqui
                // const response = await fetch('https://api.example.com/rules');
                // const data = await response.json();
                // setData(data);

                // Exemplo de dados fictícios
                const fakeData = [
                    { id: 1, name: 'Rule 1' },
                    { id: 2, name: 'Rule 2' },
                    { id: 3, name: 'Rule 3' },
                ];
                setData(fakeData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <DateContext.Provider value={{data}}>
            {children}
        </DateContext.Provider>
    );
};

export { DateContext, DateProvider };
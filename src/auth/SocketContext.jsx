import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";
import AuthContext from "./context"; // Importez votre AuthContext

export const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    
    // Accès au contexte d'authentification
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        let socketInstance;
        
        // Se connecte seulement si l'utilisateur est authentifié et a un token
        if (authState?.token && authState.user?._id) {
            socketInstance = io("http://localhost:9000", {
                withCredentials: true,
                auth: {
                    token: authState.token // Envoie le token JWT
                },
                query: {
                    userId: authState.user?._id // Ajout du userId dans les query parameters
                },
                transports: ['websocket', 'polling'], // Fallback pour compatibilité
                reconnectionAttempts: 5, // Tentatives de reconnexion
                reconnectionDelay: 1000 // Délai entre les tentatives
            });

            // Gestion des événements
            socketInstance.on("connect", () => {
                console.log("Connecté au serveur Socket.IO");
            });

            socketInstance.on("onlineUsers", (users) => {
                setOnlineUsers(users);
            });

            socketInstance.on("connect_error", (err) => {
                console.error("Erreur de connexion:", err.message);
            });

            setSocket(socketInstance);
        }

        // Nettoyage à la déconnexion
        return () => {
            if (socketInstance) {
                socketInstance.off("connect");
                socketInstance.off("onlineUsers");
                socketInstance.off("connect_error");
                socketInstance.disconnect();
            }
        };
    }, [authState?.token, authState?.user?._id]); // Se réexécute seulement quand le token change

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
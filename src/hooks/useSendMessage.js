import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import authStorage from "../auth/Storage";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    if (!selectedConversation?._id) {
      toast.error("Aucune conversation sélectionnée");
      return;
    }

    setLoading(true);
    try {
      const token = await authStorage.getToken(); // Récupérez le token
      console.log("Token utilisé:", token);
      const res = await fetch(
        `http://localhost:9000/api/message/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'x-auth-token': `${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ message }),
        }
      );

      const data = await res.json();
      console.log("Réponse du serveur:", data);

      if (!res.ok || data.error) {
        throw new Error(data.error || "Échec de l'envoi du message");
      }

      setMessages([...messages, data]);
      toast.success("Message envoyé");
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
}

export default useSendMessage;

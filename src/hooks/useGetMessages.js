import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import authStorage from "../auth/Storage";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const token = await authStorage.getToken(); // Récupérez le token
        console.log("Token Get:", token);
        const res = await fetch(
          `http://localhost:9000/api/message/${selectedConversation._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": `${token}`,
            },
          }
        );
        const data = await res.json();
        console.log("data", data);
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};
export default useGetMessages;

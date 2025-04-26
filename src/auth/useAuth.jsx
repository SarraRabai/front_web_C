import { useContext } from "react";
import AuthContext from "../auth/context";
import authStorage from "../auth/Storage";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const { authState, setAuthState, isAuthenticated } = useContext(AuthContext);

  const logIn = async (authToken) => {
    try {
      // Vérification identique à la version mobile
      if (!authToken || typeof authToken !== "string") {
        console.error("Token invalide:", authToken);
        return;
      }

      // Même décodage du JWT
      const decodedUser = jwtDecode(authToken);

 // Structure améliorée mais conservant les mêmes termes
 const userData = {
  ...decodedUser,//garder toutes les propriétés existantes
  _id: decodedUser.userId || decodedUser._id || decodedUser.id // Extraction de l'ID
};

      setAuthState({
        user: userData,
        token: authToken
      });
      
      // Même appel à authStorage
      await authStorage.storeToken(authToken);
      console.log("Connexion réussie pour:",decodedUser.cin, "ID:", userData._id);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
    }
  };

  const logout = async () => {
    setAuthState({ user: null, token: null });
    await authStorage.removeToken();
  };

  return { user: authState.user, 
    token: authState.token,
    isAuthenticated,
    logIn, 
    logout };
};

export default useAuth;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authApi from "../../api/auth";
import useAuth from "../../auth/useAuth";

const validationSchema = Yup.object().shape({
  cin: Yup.string().required().label("CIN"),
  password: Yup.string().required().min(4).label("Password"),
});

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);
  const [formData, setFormData] = useState({ cin: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Effacer l'erreur quand l'utilisateur modifie le champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginFailed(false);
    
    try {
      // Validation avec Yup
      await validationSchema.validate(formData, { abortEarly: false });
      
      // Appel API identique à la version mobile
      const result = await authApi.login(formData.cin, formData.password);
      console.log("Login result:", result);

      if (!result.ok || !result.data?.data?.token) {
        console.error("Échec - Réponse API:", result);
        return setLoginFailed(true);
      }
      
      // Connexion réussie - même logique que mobile
      await auth.logIn(result.data.data.token);
      navigate("/Home");
      
    } catch (validationErrors) {
      // Gestion des erreurs de validation
      const newErrors = {};
      if (validationErrors.inner) {
        validationErrors.inner.forEach(error => {
          newErrors[error.path] = error.message;
        });
      }
      setErrors(newErrors);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Login <span className='text-blue-500'>ChatApp Constat</span>
        </h1>

        {/* Message d'erreur global - mêmes classes que dans votre code */}
        {loginFailed && (
          <div className="text-red-500 text-center mb-4">
            CIN ou mot de passe invalide.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>CIN</span>
            </label>
            <input
              type='text'
              name="cin"
              placeholder='Entrez votre CIN'
              className='w-full input input-bordered h-10'
              value={formData.cin}
              onChange={handleChange}
            />
            {errors.cin && (
              <span className='text-red-500 text-sm mt-1 block'>{errors.cin}</span>
            )}
          </div>
          
          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              name="password"
              placeholder='Entrez votre mot de passe'
              className='w-full input input-bordered h-10'
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className='text-red-500 text-sm mt-1 block'>{errors.password}</span>
            )}
          </div>

          <Link to='/signup' className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            {"Don't"} have an account?
          </Link>
          
          <div>
            <button type="submit" className='btn btn-block btn-sm mt-2'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
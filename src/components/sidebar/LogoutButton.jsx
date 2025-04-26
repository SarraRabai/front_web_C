import React from 'react'
import { BiLogOut } from "react-icons/bi";
import useAuth from '../../auth/useAuth';

const LogoutButton = () => {
  const { logout } = useAuth();


  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      logout();
    }
  };
  return  (
    <div className='mt-auto'>
            <BiLogOut className='w-6 h-6 text-white cursor-pointer'  onClick={handleLogout} />

    </div>
);
}

export default LogoutButton
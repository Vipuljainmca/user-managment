import React from 'react'

import { useSelector } from "react-redux";
const useAuth = () => {
    const token = useSelector(state => state.auth.token);

  return {token}
}

export default useAuth;

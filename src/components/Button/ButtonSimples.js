import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const ButtonSimples = () => {

    const [loading, setLoading] = useState(false);


        return (
            <button type="submit" 
            className="b-linx m-2 text-light" 
            disabled={!loading ? '' : 'none'}>{loading ? "Salvando..." : "Salvar"}</button>
        )
    
}
export default ButtonSimples;
// export const usuarioAutenticado = () => localStorage.getItem('Cerberus-chave-autenticacao') !=null;

export const usuarioAutenticado = () => localStorage.getItem('usuario') !== null;

export const parseJwt = () =>{
    var base64Url = localStorage.getItem('usuario').split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
    return JSON.parse(window.atob(base64));
}

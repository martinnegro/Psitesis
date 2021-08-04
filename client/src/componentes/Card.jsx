import React from 'react';
// import { useHistory } from 'react-router-dom';

export default function Card (props) {

    const { title, body, userId, /* id  */} = props
    // const history = useHistory()

    return (
        <div>
            <div>
                <h3>{title}</h3>
                <p>{body}</p>
            </div>
            <div>
                <p>{userId}</p>
                <button /* onClick={() => history.push(`/post/${id}`)} */ >+</button>
            </div>
        </div>
    )
}

/*
Mostar solo una cantidad de caracteres en espicifco... Solucionar
Esta comentado la funcion que me lleva al Post completo porque falta definir el Post
*/
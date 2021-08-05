import React, { useEffect, useState } from 'react'; 
import { NavLink } from 'react-router-dom';
import ReactPaginate from 'react-paginate'; 
import { useAuth0 } from "@auth0/auth0-react";
import Nav from '../../components/Nav/Nav'
import Card from '../../components/Card/Card'
import axios from 'axios';
export default function Home () {

    // just as an example
    const [ post, setPosts ] = useState(undefined)
    const {user, getAccessTokenSilently } = useAuth0();
    console.log(user)


    // Create or find User

    useEffect(()=>{
        async function findOrCreateUser(){

            
            const URL_API = "http://localhost:3001";
            try {
                const userPost = {
                    user_id_A0: user.sub,
                    user_name: user.name,
                    user_email: user.email,
                    user_img_profile: user.picture,
                    inst_id: [],
                };
                const token = await getAccessTokenSilently();
                const response = await axios({
                  method: "post",
                  url: `${URL_API}/users/`,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  data: userPost,
                  
                });
                console.log(user.sub);
                console.log(response.data);
                return response.data;
               
                
              } catch (error) {
                console.log(error.message);
              }
        }
        findOrCreateUser()
    })

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts')
            const json = await response.json()
            setPosts(json)
        }
       getPost()
    }, [])

    const [ search, setSearch ] = useState('')
    const [ pageNumber, setPageNumber ] = useState(0)

    const postsByPage = 9;
    const pagesVisited = pageNumber * postsByPage;
    const pageCount = Math.ceil(post?.length / postsByPage)

    const onChange = (e) => {
        if (e.target.name === 'search') setSearch(e.target.value)
    }

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    return (
        <>
            <header>
                <Nav />
                {/* <img src='' alt='Logo Psitesis'/> */}
            </header>
            <div>
                <div>
                    <h2>Bienvenidos</h2>
                    <p>En Psitesis encontrarás <NavLink to='#'>ARTICULOS</NavLink> escritos por <NavLink to='#'>COLABORADORES</NavLink> expertos en la contrucción de tesis.</p>
                    <p>Si seguís con dudas podés escribir en el <NavLink to='#'>FORO</NavLink>, donde encontrarás otros colegas que puedan ayudarte.</p>
                </div>
                <div >
                    <input onChange={onChange} type='text' name='search' value={search} placeholder='Escribí aquí el artículo que deseas encontrar' />
                    <img src='' alt='Imagen de búsqueda'/>
                </div>
                <div>
                    {
                        post?.length > 0 ? (post.slice(pagesVisited, pagesVisited + postsByPage).map(p => (
                            <Card key={p.id} title={p.title} body={p.body} userId={p.userId} />
                        ))
                        ) : null
                    }
                    <div>
                        <ReactPaginate previousLabel={'<'} nextLabel={'>'} onPageChange={changePage} pageCount={pageCount} pageRangeDisplayed={0} marginPagesDisplayed={0} breakLabel={0} />
                    </div>
                </div>
            </div>
            <footer>
                <div>
                    <NavLink to='/home'>Home</NavLink>
                    <NavLink to='#'>Foro</NavLink>
                    <NavLink to='#'>Guía de Tesis</NavLink>
                    <NavLink to='#'>Colaboradores</NavLink>
                </div>
            </footer>
        </>
    )
}

/*

¿Qué imágenes vamos a usar? Por ejemplo para los botones de 'back and go' ? Propongo React-Icons. SI REACT-ICONS
¿Definimos los componentes de esta manera o con arrow functions? ARROW FUNCTION
¿Axios? se usa AXIOS

Modifique la carpeta Public y el index del respectivo
Añadi react-router-dom
Añadí react-paginate

*/
import axios from 'axios';
const { REACT_APP_URL_API } = process.env;
const API = axios.create({ baseURL: REACT_APP_URL_API });

//con este intercertor pueden enviar sus peticiones directamente con el token en los headers
API.interceptors.request.use((req) => {
	if (localStorage.getItem('access_token')) {
		const token = localStorage.getItem('access_token');
		req.headers.Authorization = `Bearer ${token}`;
	}
	return req;
});

//peticiones ruta auth
export const checkAuth = () => API.get(`/auth/check_token`);
export const sendVerificationEmail = () => API.get(`/auth/send_verify_email`);
export const getArticles = () => API.get(`/auth/send_verify_email`);

//peticiones ruta user
export const getAllUsers = () => API.get(`/users`);
export const getUserDetail = (id) => API.get(`/users/${id}`);
export const getUsersByRoles = (rol) => API.get(`/users?rol=${rol}`);
export const changeUserRole = (idUser, oldRoleId, newRolId) => API.put(`/users/change_role`,{idUser, oldRoleId, newRolId})

//peticiones ruta metadata
export const getUserMetadata = (id) => API.get(`/metadata?id=${id}`);
export const createNewLinkInMetadata = (data) => API.post('/metadata', data);
export const deleteLinkInMetadata = (data) => API.delete('/metadata', data);
export const updateLinkInMetadata = (data) => API.put(`/metadata`,data);

// ruta categories
export const getAllCatSub = () => API.get(`/categories`)
export const getCategory = (id) => API.get(`/categories/${id}`)
export const deleteCategory = (id) => API.delete(`/categories/${id}`)
export const createNewCategory = (newCategory) => API.post(`/categories`,newCategory)
export const setCategory = (data) => API.put(`/categories`,data);
// ruta subcategories
export const getSubCategory = (id) => API.get(`/Subcategory/category/${id}`)
export const setSubCategory = (data) => API.put(`/subcategories`,data);
export const deleteSubCategory = (id) => API.delete(`/subcategories/${id}`);
export const createNewSubCategory = (newSubCategory) => API.post(`/subcategories`,newSubCategory);

//peticiones ruta post
export const createPost = (data) => API.post(`/article`, data);
export const editPost = (editPost) => API.put(`/article/${editPost.art_id}`,editPost);
export const deletePost = (art_id) => API.delete(`/article/${art_id}`);


//post foro
export const createPostForum = (data) => API.post(`/forumposts/create`, data);

// RUTA /forumposts
export const highlightPost = (post_id) => API.put(`/forumposts/highlight_post/${post_id}`);

// ruta notification
export const getNotifications = () => API.get(`/notification`);
export const sentNotificationTest = () => API.get(`/notification/test`);




// ruta para articles
export const getArticleWhithoutSectionAuth = () => API.get(`/article/sinseccion/hola`)

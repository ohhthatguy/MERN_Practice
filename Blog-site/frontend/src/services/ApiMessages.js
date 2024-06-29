
//API SERVICE CALLS
export const sample_url = {
    userSignUp: {  method: 'post', url: '/signUp' },
    userLogIn: {method: 'post', url: '/logIn'},
    uploadFile: {method: 'post', url: '/file/upload'},
    createPost: {method: 'post', url: '/create'},
    getAllPosts: {method: 'get', url: '/posts', params: true},
    getPostById: {method: 'get', url: '/detail', query: true},
    updatePost: {method: 'put', url: '/update', query: true},
    deleteBlog: {method: 'delete', url: '/delete', query: true},
    postComment: {method: 'post', url:'/comment/new'},
    getAllComments: {method: 'get', url: '/comment', query: true},
    deleteComment: {method: 'delete', url: '/remove/comment', query: true}
}

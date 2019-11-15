import { stringify } from 'query-string';
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
    GET_MANY_REFERENCE,
    GET_MANY
} from 'react-admin';

// const apiUrl = 'http://localhost:3001';
const apiUrl = 'https://api.hakaya.news';

export default (type, resource, params) => {
    let url = '';
    const token = localStorage.getItem('token');
    let options = {
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
        }),
    };
    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                page: page,
                limit: perPage,
                query: params.filter.query,
                order: order,
                sortField: field
            };

            url = `${apiUrl}/${resource}?${stringify(query)}`;
            break;
        }
        case GET_MANY:

            url = `${apiUrl}/${resource}`;
            break;
        case GET_MANY_REFERENCE:

            if (params.target == 'parentId') { /* refrence is itself */
                url = `${apiUrl}/${resource}?parentId=${params.id}`;
            } else {
                url = `${apiUrl}/${resource}?postId=${params.id}`;
            }
            break;
        case GET_ONE:
            url = `${apiUrl}/${resource}/getOne/${params.id}`;
            break;
        case CREATE:
            /* post controll */
            switch (resource) {
                case 'posts': {
                    const { title, body, files, categories, tags, source } = params.data;

                    const payload = new FormData();
                    payload.append('title', title);
                    payload.append('body', body);
                    payload.append('source', source);
                    if (categories) {
                        for (let i = 0; i < categories.length; i++) {
                            payload.append('categories', categories[i]);
                        }
                    }
                    if (tags) {
                        for (let i = 0; i < tags.length; i++) {
                            payload.append('tags', tags[i]);
                        }
                    }
                    if (files) {
                        payload.append('files', files.rawFile);
                    }
                    url = `${apiUrl}/${resource}/new`;
                    options.headers.delete('Content-Type');
                    options.method = 'POST';
                    options.body = payload;
                    break;
                }
                case 'uploads': {
                    const { files } = params.data;
                    const payload = new FormData();

                    if (files) {
                        payload.append('files', files.rawFile);
                    }
                    url = `${apiUrl}/${resource}/new`;
                    options.headers.delete('Content-Type');
                    options.method = 'POST';
                    options.body = payload;
                    break;
                }
                case 'categories':
                case 'sources': {
                    const { name, files } = params.data;
                    const payload = new FormData();

                    payload.append('name', name);
                    // sources link 
                    if (params.data.link) {
                        payload.append('link', params.data.link);
                    }
                    if (files) {
                        payload.append('files', files.rawFile);
                    }
                    url = `${apiUrl}/${resource}/new`;
                    options.headers.delete('Content-Type');
                    options.method = 'POST';
                    options.body = payload;
                    break;
                }
                default:
                    /* any not post controll */
                    url = `${apiUrl}/${resource}/new`;
                    options.method = 'POST';
                    options.body = JSON.stringify(params.data);
                    break;
            }
            break;
        case UPDATE:
            if (resource === 'posts') {
                const { title, body, files, categories, tags, source } = params.data;

                const payload = new FormData();
                payload.append('title', title);
                payload.append('body', body);
                payload.append('source', source.id);

                if (categories) {
                    for (let i = 0; i < categories.length; i++) {
                        payload.append('categories', categories[i]);
                    }
                }
                if (tags) {
                    for (let i = 0; i < tags.length; i++) {
                        payload.append('tags', tags[i]);
                    }

                }
                if (files) {
                    payload.append('files', files.rawFile);
                }
                url = `${apiUrl}/${resource}/update/${params.id}`;
                options.headers.delete('Content-Type');
                options.method = 'PUT';
                options.body = payload;
            } else if (resource === 'categories' || resource === 'sources') {
                const { name, files } = params.data;
                const payload = new FormData();

                payload.append('name', name);
                // sources link 
                if (params.data.link) {
                    payload.append('link', params.data.link);
                }
                if (files) {
                    payload.append('files', files.rawFile);
                }
                url = `${apiUrl}/${resource}/update/${params.id}`;
                options.headers.delete('Content-Type');
                options.method = 'PUT';
                options.body = payload;

            } else {
                url = `${apiUrl}/${resource}/update/${params.id}`;
                if (resource === 'users') {
                    url = `${apiUrl}/${resource}/promote/${params.id}`;
                }
                options.method = 'PUT';
                options.body = JSON.stringify(params.data);
            }
            break;
        case DELETE:
            url = `${apiUrl}/${resource}/delete/${params.id}`;
            options.method = 'DELETE';
            break;
        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }
    // let headers;
    return fetch(url, options)
        .then(res => {
            return res.json();
        })
        .then(json => {
            switch (type) {
                case GET_LIST:
                case GET_MANY_REFERENCE:

                    return {
                        data: json.data,
                        total: json.count
                    };
                case CREATE:

                    return { data: { ...params.data, id: json.data.id } };
                case GET_ONE:
                    if (resource === 'comments') {
                        return { data: json.data.comment };
                    } else {
                        return { data: json.data };
                    }

                case UPDATE:

                    return { data: json.data };
                case DELETE:

                    return json;
                default:
                    return { data: json.data };
            }
        });
};
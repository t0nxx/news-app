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

const apiUrl = 'http://localhost:3001';
// const apiUrl = 'http://ec2-35-168-9-164.compute-1.amazonaws.com:3001';

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
            console.log(params);
            url = `${apiUrl}/${resource}?${stringify(query)}`;
            break;
        }
        case GET_MANY:
            console.log(params);
            url = `${apiUrl}/${resource}`;
            break;

        case GET_ONE:
            url = `${apiUrl}/${resource}/getOne/${params.id}`;
            break;
        case CREATE:
            console.log(params.data);
            if (resource == 'posts') {
                const { title, body, files } = params.data;
                console.log(`t ${title}, f ${files}`)
                const payload = new FormData();
                payload.append('title', title);
                payload.append('body', body);
                if (files) {
                    for (let i = 0; i < files.length; i++) {
                        payload.append('files', files[i].rawFile);
                    }
                }
                console.log(payload);
                url = `${apiUrl}/${resource}/new`;
                options.headers.delete('Content-Type');
                options.method = 'POST';
                options.body = payload
            } else {
                url = `${apiUrl}/${resource}/new`;
                options.method = 'POST';
                options.body = JSON.stringify(params.data);

            }
            break;
        case UPDATE:
            url = `${apiUrl}/${resource}/update/${params.id}`;
            if (resource === 'users') {
                url = `${apiUrl}/${resource}/promote/${params.id}`;
            }

            options.method = 'PUT';
            options.body = JSON.stringify(params.data);
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
            // headers = res.headers;
            return res.json();
        })
        .then(json => {
            switch (type) {
                case GET_LIST:
                case GET_MANY_REFERENCE:
                    console.log(json);
                    return {
                        data: json.data,
                        total: json.count
                    };
                case CREATE:
                    console.log(json);
                    return { data: { ...params.data, id: json.data.id } };
                case GET_ONE:
                    console.log(json);
                    return { data: json.data };
                case UPDATE:
                    console.log(json);
                    return { data: json.data };
                case DELETE:
                    console.log(json);
                    return { data: json.data };
                default:
                    return { data: json.data };
            }
        });
};
import { stringify } from 'query-string';
import {
    GET_LIST,
    GET_ONE,
    CREATE,
    UPDATE,
    DELETE,
    GET_MANY_REFERENCE,
} from 'react-admin';

// const apiUrl = 'http://localhost:3001';
const apiUrl = 'http://ec2-35-168-9-164.compute-1.amazonaws.com:3001';

/**
 * Maps react-admin queries to my REST API
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a data response
 */
export default (type, resource, params) => {
    let url = '';
    const token = localStorage.getItem('token');
    const options = {
        headers: new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: token
        }),
    };
    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            // const { field, order } = params.sort;
            const query = {
                // sort: JSON.stringify([field, order]),
                // range: JSON.stringify([
                //     (page - 1) * perPage,
                //     page * perPage - 1,
                // ]),
                page: page,
                limit: perPage,
                filter: JSON.stringify(params.filter),
            };
            url = `${apiUrl}/${resource}?${stringify(query)}`;
            break;
        }
        case GET_ONE:
            url = `${apiUrl}/${resource}/getOne/${params.id}`;
            break;
        case CREATE:
            url = `${apiUrl}/${resource}/new`;
            options.method = 'POST';
            options.body = JSON.stringify(params.data);
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
                    // if (!headers.has('content-range')) {
                    //     throw new Error(
                    //         'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?'
                    //     );
                    // }
                    console.log(json);
                    return {
                        data: json.data,
                        total: json.count
                        // total: parseInt(
                        //     headers
                        //         .get('content-range')
                        //         .split('/')
                        //         .pop(),
                        //     5
                        // ),
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
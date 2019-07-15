import { PaginationDto } from './pagination.filter';

export const FormatQueryOrderAndPagination = (paginate: PaginationDto, q: any, searchIn: string[]) => {
    if (!paginate.page) { paginate.page = 1; }
    if (!paginate.limit) { paginate.limit = 10; }
    q.take(paginate.limit);
    q.skip(paginate.page * (paginate.page - 1));
    if (paginate.query) {
        /*searchIn could be name , email , phone .....etc */
        /* for reuseability search in multiple fields B| */
        searchIn.forEach(e => {
            q.orWhere(`${e} like '%${paginate.query}%'`);
        });

    }
    if (paginate.order) {
        q.addOrderBy(paginate.sortField, paginate.order);
    }
    return q;
};
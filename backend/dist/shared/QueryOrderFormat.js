"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatQueryOrderAndPagination = (paginate, q, searchIn) => {
    if (!paginate.page) {
        paginate.page = 1;
    }
    if (!paginate.limit) {
        paginate.limit = 10;
    }
    q.take(paginate.limit);
    q.skip(paginate.page * (paginate.page - 1));
    if (paginate.query) {
        searchIn.forEach(e => {
            q.orWhere(`${e} like '%${paginate.query}%'`);
        });
    }
    if (paginate.order) {
        q.addOrderBy(paginate.sortField, paginate.order);
    }
    return q;
};
//# sourceMappingURL=QueryOrderFormat.js.map
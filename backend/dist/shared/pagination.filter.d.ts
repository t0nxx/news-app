export declare enum orderEnum {
    ASC = "ASC",
    DESC = "DESC"
}
export declare class PaginationDto {
    limit: number;
    page: number;
    query: string;
    sortField: string;
    order: orderEnum;
}

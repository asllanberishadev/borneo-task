export interface TableColumn {
    name?: string;
	fixedCol?: boolean;
	sortable?: boolean;
	value?: (data: any) => string;
	formatter?: (data: any) => string;
}
export enum SortType {
	ASC = 'asc',
	DESC = 'desc'
}
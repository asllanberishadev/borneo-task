import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subject, takeUntil } from 'rxjs';
import { Comment } from '../models/comments';
import { SortType, TableColumn } from '../models/table';

@Component({
	selector: 'app-data-table',
	templateUrl: './data-table.component.html',
	styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {
	readonly destroy$: Subject<void> = new Subject<void>();
	tableColumns: TableColumn[] = [];
	comments: Comment[] = [];

	commentsSignal = signal<Comment[]>([]);
	searchInputSignal = signal<string>('');

	sortColumn: TableColumn;
	sortType: SortType = SortType.ASC;
	SortType: typeof SortType = SortType;

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.fetchComments();
		this.initTable();
	}

	fetchComments(): void {
		this.dataService
			.getComments()
			.pipe(takeUntil(this.destroy$))
			.subscribe((res) => {
				this.commentsSignal.set(res);
			});
	}

	getComments = computed(() => this.searchCommentsByText(this.commentsSignal()));

	private searchCommentsByText(comments: Comment[]): Comment[] {
		return comments.filter(
			(comment) =>
				comment?.name?.toLowerCase().includes(this.searchInputSignal().toLowerCase()) ||
				comment?.email.toString().includes(this.searchInputSignal().toLowerCase())
		);
	}

	setSortColumn(column: TableColumn): void {
		if (!column.sortable) {
			return;
		}

		if (column !== this.sortColumn) {
			this.sortColumn = column;
			this.sortType = SortType.ASC;
		} else {
			this.sortType = this.sortType === SortType.ASC ? SortType.DESC : SortType.ASC;
		}

		this.sortPropertyData();
	}

	private sortPropertyData(): void {
		const value = this.sortColumn.value || (() => '');
		const sortType = this.sortType === SortType.ASC ? -1 : 1;

		this.commentsSignal.set([...this.commentsSignal().sort((a: any, b: any) => (value(a) < value(b) ? sortType : -sortType))]);
	}

	private initTable() {
		this.tableColumns = [
			{
				name: 'Id',
				sortable: true,
				fixedCol: true,
				value: (data: Comment) => data.id.toString(),
				formatter: (value: any) => value
			},
			{
				name: 'Name',
				sortable: true,
				fixedCol: true,
				value: (data: Comment) => data.name.toString(),
				formatter: (value: any) => value
			},
			{
				name: 'Email',
				sortable: true,
				fixedCol: true,
				value: (data: Comment) => data.email.toString(),
				formatter: (value: any) => value
			},
			{
				name: 'Body',
				sortable: true,
				value: (data: Comment) => data.body.toString(),
				formatter: (value: any) => value
			},
			{
				name: 'Post id',
				sortable: true,
				value: (data: Comment) => data.postId.toString(),
				formatter: (value: any) => value
			}
		];

		// adding 20 more cols for demo purpose
		for (let i = 0; i < 20; i++) {
			this.tableColumns.push({
				name: `col${i}`,
				sortable: true,
				value: (data: Comment) => `col${i}-value`,
				formatter: (value: any) => value
			});
		}

		this.setSortColumn(this.tableColumns[0]);
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}

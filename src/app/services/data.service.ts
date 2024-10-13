import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Comment } from '../models/comments';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor(private http: HttpClient) {}

	/**
	 * Method: GET
	 * URI: /api/comments
	 */
	getComments(): Observable<Comment[]> {
		return this.http.get<Comment[]>(`${environment.APP_ENDPOINT_URI}/comments`);
	}
}

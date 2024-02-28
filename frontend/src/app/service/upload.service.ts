import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class UploadService {
	constructor(private httpClient: HttpClient) { }

	uploadProfilePicture(file: File, userId: number | undefined) {
		const formData = new FormData();
		formData.append("thumbnail", file);
		return this.httpClient.post<any>("https://localhost:3000/upload/upload/" + userId, formData);
	}
}
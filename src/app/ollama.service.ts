import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OllamaService {
  private apiUrl = 'http://localhost:11434/api/generate';

  constructor(private http: HttpClient) { }

  sendMessage(model: string, prompt: string, stream: boolean): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { model, prompt, stream };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}

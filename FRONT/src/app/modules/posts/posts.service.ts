import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = environment.URL_SERVICIOS; // Ejemplo: http://127.0.0.1:8000/api
  private apiUrl  = `${this.baseUrl}/Posts`;

  constructor(private http: HttpClient, private router: Router) { }
  getPosts(): Observable<PostsResponse> {
    return this.http.get<PostsResponse>(this.apiUrl);
  }

  getCurso(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }

  createCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.apiUrl, curso);
  }

  updateCurso(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.apiUrl}/${id}`, curso);
  }

  deleteCurso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

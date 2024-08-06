import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly API_URL = 'https://api.github.com/search/repositories';

  constructor(private http: HttpClient) { }

  getTopStarredRepos(since: string, page: number): Observable<any> {
    const params = {
      q: `created:>${since}`,
      sort: 'stars',
      order: 'desc',
      page: `${page}`
    };

    return this.http.get(this.API_URL, { params });
  }
}

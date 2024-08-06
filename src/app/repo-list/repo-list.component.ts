import { Component, OnInit, HostListener } from '@angular/core';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {
  repos: any[] = [];
  page: number = 1;
  since: string;

  constructor(private githubService: GithubService) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 10); // Current date - 10 days to get the repos created in the last 10 days
    this.since = currentDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.loadRepos();
  }

  /*
  * Load the repo from the Github API
  * */
  loadRepos(): void {
    this.githubService.getTopStarredRepos(this.since, this.page).subscribe((data: any) => {
      this.repos = this.repos.concat(data.items);
    });
  }

  /*
  * Scroll event listener to load more repos when the user reaches the bottom of the page
  * */
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.page++; //increment page number to load the next page
      this.loadRepos();
    }
  }
}

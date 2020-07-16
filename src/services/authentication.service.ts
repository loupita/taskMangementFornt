import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthenticationService{

  private host:string="http://localhost:8080";
  private jwtToken: string;
  private roles:any[];
  constructor(private http:HttpClient) {
  }
  login(user){
    return this.http.post(this.host + "/login", user, {observe:'response'});
  }

  saveToken(jwt:string){
    this.jwtToken = jwt;
     localStorage.setItem('token',this.jwtToken);
     const jwtHelper = new JwtHelper();
     this.roles = jwtHelper.decodeToken(this.jwtToken).roles;
  }

  loadToken(){
    this.jwtToken=localStorage.getItem('token');
  }
  // Recupère la liste des taches en passant le token
  getTasks(){
    if (this.jwtToken==null) this.loadToken();
    return this.http.get(this.host + "/tasks",{headers: new HttpHeaders({
        'Authorization': this.jwtToken
      })})
  }
  // pour supprimer le token stacker dans le localStorage
  logout(){
    this.jwtToken = null;
    localStorage.removeItem('token');
  }
  isAdmin(){
    for (const r of this.roles){
      // tslint:disable-next-line:triple-equals
      if (r.authority=='ADMIN') return true;
    }
    return false;
  }

  saveTask(task) {
    return this.http.post(this.host + "/tasks", task, {headers:new HttpHeaders(
      {'authorization': this.jwtToken})});
  }
}

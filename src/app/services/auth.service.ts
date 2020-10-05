import { UsuarioModel } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

// crear nuevos usuarios
// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

// Login
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
export class AuthService {
  private urlApi = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey = 'AIzaSyARA4_5dAaStoY3kBubjlUpnVhtD2Imf1U';

  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {}

  login(usuario: UsuarioModel): Observable<any> {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };

    return this.http.post(
      `${this.urlApi}/accounts:signInWithPassword?key=${this.apiKey}`,
      authData
    )
    .pipe(
      map((resp: string) => {
        console.log('entro');
        this.guararToken(resp['idToken']);
        return resp;
      })
    );
  }

  nuevoUsuario(usuario: UsuarioModel): Observable<any> {
    // const authData = {
    //   email:usuario.email,
    //   password:usuario.password,
    //   returnSecureToken:usuario.returnSecureToken,
    // }

    const authData = {
      ...usuario,
      returnSecureToken: true,
    };

    return this.http.post(
      `${this.urlApi}/accounts:signUp?key=${this.apiKey}`,
      authData
    )
    .pipe(
      map((resp: string) => {
        console.log('entro');
        this.guararToken(resp['idToken']);
        return resp;
      })
    );
  }

  private guararToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
  }
}

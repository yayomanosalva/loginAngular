import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm): Observable<any> {
    if (form.invalid) {
      return;
    }
    // console.log('Imprimir si el formulario es valido');
    // console.log(this.usuario);
    // console.log(form);

    Swal.fire({
      allowOutsideClick: false,
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      timerProgressBar: true,
    });
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(
      (resp) => {
        console.log('resp login ==>', resp);
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl('/home');
      },
      (err) => {
        console.log('err --> ', err.error.error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: err.error.error.message,
        });
      }
    );
  }
}

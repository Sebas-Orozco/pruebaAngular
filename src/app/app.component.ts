import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'prueba-tecnica';
  
  reactForm: FormGroup;

  username: string = "";
  email: string = "";
  password: string = "";

  checkUsername: boolean = false;
  checkEmail: boolean = false;
  checkPassword: boolean = false;

  mensajeErrorUsername: string = "";
  mensajeErrorEmail: string = "";
  mensajeErrorPassword: string = "";
  mensajeExito: string = "";

  constructor(private _builder: FormBuilder){
    this.reactForm = _builder.group({
      usuario: ['', Validators.required],
      correo: ['', Validators.compose([Validators.email, Validators.required])],
      clave: ['', Validators.required],
    });
  }

  enviar(values): void{
    console.log(values);
  }

  ingresaUsername(username:string):void{
    this.username = username;
    this.validaUsername();
  }

  ingresaEmail(email:string):void{
    this.email = email;
    this.validaEmail();
  }

  ingresaPassword(password:string):void{
    this.password = password;
    this.validaPassword();
  }

  validaUsername():void{
    // let expresion = /^[A-Za-z0-9\_]{3-20}$/
    this.checkUsername = false;
    let expresion = new RegExp('^[A-Za-z]+[A-Za-z0-9_]{3,10}$');
    
    if (expresion.test(this.username)){
      this.checkUsername = true;
    }
  }

  validaEmail(): void{
    this.checkEmail = false;
    let expresion = new RegExp('^([A-Za-z][A-Za-z0-9._-]+)(@[a-z][a-z0-9]+)(\\.[a-z]{2,4})$');
    if (expresion.test(this.email)){
      this.checkEmail = true;
    }
  }
  
  validaPassword(): void{
    this.checkPassword = false;
    let regexMay = new RegExp('^[A-Z]{1}$');
    let regexMin = new RegExp('^[a-z]{1}$');
    let regexNum = new RegExp('^[0-9]{1}$');

    let checkMayuscula = false;
    let checkMinuscula = false;
    let checkNumero = false;
    let checkEspecial = false;
    
    for (let c of this.password){
      if (regexMay.test(c)){
        checkMayuscula = true;
      }else if(regexMin.test(c)){
        checkMinuscula = true;
      }else if(regexNum.test(c)){
        checkNumero = true;
      }else{
        checkEspecial = true;
      }
    }

    let checkLongitud = this.password.length <= 16 && this.password.length >= 8;
    
    if (checkMayuscula && checkMinuscula && checkNumero && checkEspecial && checkLongitud){
      this.checkPassword = true;
    }
  }

  validar():void{
    this.mensajeErrorUsername = "";
    this.mensajeErrorEmail = "";
    this.mensajeErrorPassword = "";
    this.mensajeExito = "";

    if (!(this.checkUsername)){
      console.log("Error: username");
      this.mensajeErrorUsername = "ERROR: El username debe empezar por una letra y tener un tamaño de 3 a 10 caracteres";
    }
    if (!(this.checkEmail)){
      console.log("Error: email");
      this.mensajeErrorEmail = "ERROR: El email no tiene la estructura de un correo electrónico";
    }
    if(!(this.checkPassword)){
      console.log("Error: password");
      this.mensajeErrorPassword = "ERROR: El password debe contener al menos 1 mayúscula, 1 minúscula, 1 número, 1 caracter especial y contener de 8 a 16 caracteres";
    }
    if(this.checkUsername && this.checkEmail && this.password){
      console.log("Se guardó la información correctamente");
      this.mensajeExito = "¡Se guardó la información correctamente!";
    }
  }
}

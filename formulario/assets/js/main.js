class ValidaFormulario {
  constructor() {
    this.formulario = document.querySelector('.formulario') //seleciona o form
    this.eventos(); //aciona o metodo eventos
  }
  //ate aqui ta certo
  eventos() {
    this.formulario.addEventListener('submit', e => { //pega o submit
      this.handleSubmit(e); //aciona o metodo handle
    });
//funfando
  }

  handleSubmit(e) {
    e.preventDefault(); //previne o comportamento padrão, não envia o form
    const camposValidos = this.camposSaoValidos(); //aciona o metodo para checar os campos do formulario
    const senhasValidas = this.senhasSaoValidas();
    if (camposValidos && senhasValidas) {
      alert('Formulario enviado!!!');
      this.formulario.submit();
    }
  }
//funfando
  senhasSaoValidas() {
    let valid = true;

    const senha = this.formulario.querySelector('.senha');
    const repetirSenha = this.formulario.querySelector('.repetir-senha');

    if (senha.value !== repetirSenha.value) {
      valid = false;
      this.criaErro(senha, 'Campos senha e repetir-senha precisão ser iguais ')
      this.criaErro(repetirSenha, 'Campos senha e repetir-senha precisão ser iguais ')
    }
    if (senha.value.length < 6 || senha.value.length > 12) {
      valid = false;
      this.criaErro(senha, 'Senha precisa ter entre 6 e/ou 12 caracteres');
    }

    return valid;
  }
  //funfando


  camposSaoValidos() {
    let valid = true; //a flag começa com true se tudo estiver correto ela vai terminar verdadeira ,caso o contrario ela vai retornar false;
    for (let errorText of this.formulario.querySelectorAll('.error-text')){
      errorText.remove() //vai remover o erro
    } 

    for (let campo of this.formulario.querySelectorAll('.validar')) { //usa o for para percorrer todos os campos do formulario , coloca -se uma class em comum a todos os capos que vc queira verificar 
      const label = campo.previousElementSibling.innerHTML; //seleciona o irmão anterior do elemento no caso o label
      if (!campo.value) { //verifica se o campo esta vazio
        this.criaErro(campo, ` O campo ${label} não pode ficar vazio !`)
        valid = false;
      }
      if (campo.classList.contains('cpf')) {
        if (!this.validaCPF(campo)) valid = false;
      }
      if (campo.classList.contains('usuario')) {
        if (!this.validaUsuario(campo)) valid = false;
      }
    }
    return valid; //se ele passar por todas as verificações e terminar verdadeiro e porq funfo tudo

  }
  validaUsuario(campo) {
    const usuario = campo.value;
    let valid = true;

    if (usuario.length < 3 || usuario.length > 12) {
      this.criaErro(campo, 'Usuario precisa ter entre 3 a 12 caracteres.');
      valid = false;
    }
    if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {//escreve match direito fdp erro maldito
      this.criaErro(campo, 'Nome de usúario precisa conter  apenas letras e/ou números.');
      valid = false;
    }
    return valid;
  }


  validaCPF(campo) {
    const cpf = new ValidaCPF(campo.value); //inportando a class e passando os dados para class
    if (!cpf.valida()) { //caso venha false  ja vai meter o erro na cara 
      this.criaErro(campo, 'CPF inválido.');
      return false;
    }
    return true;
  }




  criaErro(campo, msg) {
    const div = document.createElement('div'); //cria uma div para receber o erro
    div.innerHTML = msg //passa o parametro da msg pra div
    div.classList.add('error-text') //cria uma class para div para alterar no css
    campo.insertAdjacentElement('afterend', div); //depois do campo insere o elemento no caso a div
  }
}

const valida = new ValidaFormulario();






































































// class ValidaFormulario {
//   constructor() {
//     this.formulario = document.querySelector('.formulario');
//     this.eventos();
//   }

//   eventos() {
//     this.formulario.addEventListener('submit', e => {
//       this.handleSubmit(e);
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const camposValidos = this.camposSaoValidos();
//     const senhasValidas = this.senhasSaoValidas();

//     if(camposValidos && senhasValidas) {
//       alert('Formulário enviado.');
//       this.formulario.submit();
//     }
//   }

//   senhasSaoValidas() {
//     let valid = true;

//     const senha = this.formulario.querySelector('.senha');
//     const repetirSenha = this.formulario.querySelector('.repetir-senha');

//     if(senha.value !== repetirSenha.value) {
//       valid = false;
//       this.criaErro(senha, 'Campos senha e repetir senha precisar ser iguais.');
//       this.criaErro(repetirSenha, 'Campos senha e repetir senha precisar ser iguais.');
//     }

//     if(senha.value.length < 6 || senha.value.length > 12) {
//       valid = false;
//       this.criaErro(senha, 'Senha precisa estar entre 6 e 12 caracteres.');
//     }

//     return valid;
//   }

//   camposSaoValidos() {
//     let valid = true;

//     for(let errorText of this.formulario.querySelectorAll('.error-text')) {
//       errorText.remove();
//     }

//     for(let campo of this.formulario.querySelectorAll('.validar')) {
//       const label = campo.previousElementSibling.innerText;

//       if(!campo.value) {
//         this.criaErro(campo, `Campo "${label}" não pode estar em branco.`);
//         valid = false;
//       }

//       if(campo.classList.contains('cpf')) {
//         if(!this.validaCPF(campo)) valid = false;
//       }

//       if(campo.classList.contains('usuario')) {
//         if(!this.validaUsuario(campo)) valid = false;
//       }

//     }

//     return valid;
//   }

//   validaUsuario(campo) {
//     const usuario = campo.value;
//     let valid = true;

//     if(usuario.length < 3 || usuario.length > 12) {
//       this.criaErro(campo, 'Usuário precisa ter entre 3 e 12 caracteres.');
//       valid = false;
//     }

//     if(!usuario.match(/^[a-zA-Z0-9]+$/g)) {
//       this.criaErro(campo, 'Nome de usuário precisar conter apenas letras e/ou números.');
//       valid = false;
//     }

//     return valid;
//   }

//   validaCPF(campo) {
//     const cpf = new ValidaCPF(campo.value);

//     if(!cpf.valida()) {
//       this.criaErro(campo, 'CPF inválido.');
//       return false;
//     }

//     return true;
//   }

//   criaErro(campo, msg) {
//     const div = document.createElement('div');
//     div.innerHTML = msg;
//     div.classList.add('error-text');
//     campo.insertAdjacentElement('afterend', div);
//   }
// }

// const valida = new ValidaFormulario();
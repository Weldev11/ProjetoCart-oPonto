document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            enviarDadosParaDatabase(user);
        })
        .catch((error) => {
            console.error('Erro no cadastro:', error.message);
            alert('Erro no cadastro: ' + error.message);
        });
});

function enviarDadosParaDatabase(user) {
    const nome = document.getElementById('nome').value;
    const endereco = document.getElementById('endereco').value;
    const telefone = document.getElementById('telefone').value;
    const perfil = document.getElementById('perfil').value;  // Captura o perfil selecionado

    firebase.database().ref('users/' + user.uid).set({
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        perfil: perfil  // Armazena o perfil no banco de dados
    }).then(() => {
        console.log('Dados adicionais armazenados com sucesso!');
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html'; 
    }).catch((error) => {
        console.error('Erro ao enviar dados adicionais:', error);
        alert('Erro ao salvar dados adicionais: ' + error.message);
    });
}

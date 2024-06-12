
// Configure o Firebase com suas credenciais
const firebaseConfig = {
    apiKey: "AIzaSyDe_ABivxg6siS4zNEDV6tEtlUQbLfn_Lo",
    authDomain: "novotesteallan.firebaseapp.com",
    databaseURL: "https://novotesteallan-default-rtdb.firebaseio.com",
    projectId: "novotesteallan",
    storageBucket: "novotesteallan.appspot.com",
    messagingSenderId: "872846618177",
    appId: "1:872846618177:web:b1d5c838dee2bf63a960c0",
    measurementId: "G-RMWKXBBN30"
  };


   firebase.initializeApp(firebaseConfig); // Inicialize o Firebase
   const database = firebase.database(); // Inicialize o banco de dados
   const storage = firebase.storage(); // Inicialize o storage


function enviarDadosParaFirebase() {
    const nome = document.getElementById('nome').value;
    const area = document.getElementById('area').value;
    const hora = document.getElementById('hora').value;
    const endereco = document.getElementById('endereco').value;

    const data = document.getElementById('data').value;
    const imagem = document.getElementById('imagem').files[0]; // Obtém o arquivo de imagem

    if (imagem) {
        const storageRef = storage.ref('imagens/' + imagem.name);
        storageRef.put(imagem).then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                const dados = {
                    nome:nome,
                    area:area,
                    hora:hora,
                    endereco:endereco,
                    data:data,
                    imagemURL: downloadURL // Salva a URL da imagem
                };
                database.ref('funcionarios').push(dados)
                .then(() => {
                    alert('Dados enviados com sucesso!');
                    document.getElementById('nome').value = '';
                    document.getElementById('area').value = '';
                    document.getElementById('hora').value = '';
                    document.getElementById('endereco').value = '';
                    document.getElementById('data').value = '';
                    document.getElementById('imagem').value = '';
                })
                .catch(error => {
                    console.error('Erro ao enviar os dados para o Realtime Database: ', error);
                    alert('Erro ao enviar os dados. Por favor, tente novamente.');
                });
            });
        }).catch(error => {
            console.error('Erro ao fazer upload da imagem: ', error);
            alert('Erro ao enviar a imagem. Por favor, tente novamente.');
        });
    } else {
        alert('Por favor, selecione uma imagem.');
    }
}

   function consultarPontoPorNome() {
    const nome = document.getElementById('nomeConsulta').value.trim();
    const funcionariosRef = database.ref('funcionarios');
    funcionariosRef.orderByChild('nome').equalTo(nome).once('value', snapshot => {
    const data = snapshot.val();
    const lista = document.getElementById('listaFuncionarios');
    lista.innerHTML = ''; // Limpar lista anterior

    if (data) {
    Object.keys(data).forEach(key => {
    const funcionario = data[key];
    const item = document.createElement('li');
    item.innerHTML = `<p>Nome: ${funcionario.nome}, <p>Aréa em que trabalha: ${funcionario.area}, <p>Hora: 
   ${funcionario.hora}, <p>Data: ${funcionario.data}, <p>Endereço: ${funcionario.endereco}, <p>Imagem : <p><img src= "${funcionario.imagemURL}" alt="Imagem do funcionario" 
   style="width:100px; height:auto;">`;
    lista.appendChild(item);
    });
    } else {
    lista.innerHTML = '<li>Nenhum funcionario encontrado com esse nome.</li>';
    }
    }).catch(error => {
    console.error('Erro ao buscar funcionarios: ', error);
    });
   }
function alterarStatus(id) {
    // Simulando alteração de status
    const statusSpan = document.getElementById(`status${id}`);
    if (statusSpan.classList.contains('bg-success')) {
        statusSpan.classList.remove('bg-success');
        statusSpan.classList.add('bg-warning');
        statusSpan.innerText = 'Pendente';
    } else {
        statusSpan.classList.remove('bg-warning');
        statusSpan.classList.add('bg-success');
        statusSpan.innerText = 'Entregue';
    }
}


// LOCAL STORAGE

document.addEventListener("DOMContentLoaded", function() {
    // Verifica se há dados salvos na Local Storage ao carregar a página
    if (localStorage.getItem('vendas')) {
        renderizarVendas();
    }
});

// Função para adicionar uma nova venda
function adicionarVenda(cliente, data, valor) {
    // Verifica se já há vendas na Local Storage
    let vendas = localStorage.getItem('vendas') ? JSON.parse(localStorage.getItem('vendas')) : [];
    
    // salva nova venda no array
    vendas.push({
        cliente: cliente,
        data: data,
        valor: valor
    });

    // Salva os dados atualizados na Local Storage
    localStorage.setItem('vendas', JSON.stringify(vendas));

    // Atualiza a tabela de vendas
    renderizarVendas();
}

// Função para renderizar as vendas na tabela
document.addEventListener("DOMContentLoaded", function() {
    // Verifica se há dados salvos na Local Storage ao carregar a página
    if (localStorage.getItem('vendas')) {
        renderizarVendas();
    }
});

// Função para adicionar uma nova venda
function adicionarVenda(cliente, data, valor) {
    // Verifica se já há vendas na Local Storage
    let vendas = localStorage.getItem('vendas') ? JSON.parse(localStorage.getItem('vendas')) : [];
    
    // Adiciona a nova venda ao array
    vendas.push({
        cliente: cliente,
        data: data,
        valor: valor
    });

    // Salva os dados atualizados na Local Storage
    localStorage.setItem('vendas', JSON.stringify(vendas));

    // Atualiza a tabela de vendas
    renderizarVendas();
}

// Função para renderizar as vendas na tabela
function renderizarVendas() {
    let vendas = JSON.parse(localStorage.getItem('vendas'));
    let tabela = document.getElementById('vendasList');
    tabela.innerHTML = '';

    // Loop através das vendas e cria as linhas da tabela
    for (let i = 0; i < vendas.length; i++) {
        let venda = vendas[i];
        let row = tabela.insertRow();
        row.innerHTML = `<td>${i + 1}</td>
                         <td>${venda.cliente} <br><span class="badge bg-info">tag etiqueta</span></td>
                         <td>${venda.data}</td>
                         <td>R$ ${venda.valor.toFixed(2)}</td>
                         <td><span id="status${i + 1}" class="badge bg-success">Entregue</span></td>
                         <td><button onclick="alterarStatus(${i + 1})" class="btn btn-primary">Alterar</button></td>`;
    }
}

// Manipulador de evento para o envio do formulário de venda
document.getElementById('vendaForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let cliente = document.getElementById('cliente').value;
    let data = document.getElementById('data').value;
    let valor = parseFloat(document.getElementById('valor').value);

    adicionarVenda(cliente, data, valor);

    // Limpa o formulário e fecha o modal
    document.getElementById('vendaForm').reset();
    let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
    modal.hide();
});
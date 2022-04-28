const buscarLista = () => JSON.parse(localStorage.getItem('todoList')) == undefined ? [] : JSON.parse(localStorage.getItem('todoList'));
const salvarLista = (lista) => localStorage.setItem('todoList', JSON.stringify(lista))

const criarItem = (tarefa, status = '', indice) => {
    const item = document.createElement('label')
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

const atualizarLista = () => {
    limparLista();
    const lista = buscarLista();
    lista.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const limparLista = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const lista = buscarLista();
        lista.push({ 'tarefa': texto, 'status': '' });
        salvarLista(lista);
        evento.target.value = '';
        atualizarLista();
    }
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
        salvarLista(lista);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
        atualizarLista();
    }
}

function atualizarItem(indice) {
    const lista = buscarLista();
    lista[indice].status = lista[indice].status === '' ? 'checked' : '';
    salvarLista(lista);
}

function removerItem(indice) {
    const lista = buscarLista();
    lista.splice(indice, 1);
    salvarLista(lista);
    atualizarLista();
}


document.getElementById('newItem').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem)


atualizarLista();
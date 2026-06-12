const form = document.getElementById("formDescarte");
const lista = document.getElementById("lista");
const mensagem = document.getElementById("mensagem");

async function carregarRegistros() {

    const resposta = await fetch(
        "http://localhost:3000/descarte"
    );

    const dados = await resposta.json();

    lista.innerHTML = "";

    dados.forEach(item => {

        const li = document.createElement("li");

        li.textContent =
            `${item.material} - ${item.quantidade}g`;

        lista.appendChild(li);

    });

}

form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    const material =
        document.getElementById("material").value;

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const resposta = await fetch(
        "http://localhost:3000/descarte",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                material,
                quantidade
            })
        }
    );

    const resultado = await resposta.json();

    mensagem.textContent = resultado.mensagem || resultado.erro;

    carregarRegistros();

    form.reset();

});

carregarRegistros();
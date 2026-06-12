const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

app.use((req,res,next)=>{

    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "*"
    );

    next();

});

const ARQUIVO = "dados.json";

app.get("/descarte",(req,res)=>{

    const dados = JSON.parse(
        fs.readFileSync(ARQUIVO)
    );

    res.json(dados);

});

app.post("/descarte",(req,res)=>{

    const { material, quantidade } = req.body;

    if(quantidade < 50){

        return res.status(400).json({
            erro:"O descarte mínimo permitido é 50g."
        });

    }

    const dados = JSON.parse(
        fs.readFileSync(ARQUIVO)
    );

    const novoRegistro = {

        id: Date.now(),

        material,

        quantidade,

        data:new Date().toLocaleString()

    };

    dados.push(novoRegistro);

    fs.writeFileSync(
        ARQUIVO,
        JSON.stringify(
            dados,
            null,
            2
        )
    );

    res.json({
        mensagem:"Descarte registrado com sucesso!"
    });

});

app.listen(3000,()=>{

    console.log(
        "Servidor rodando em http://localhost:3000"
    );

});
# Análise de Sentimento com IBM Waston

<h2>Configurar .env</h2>

```bash
API_KEY=<sua_key>
SERVER_URL=<url_do_servidor>
```

<h2>Iniciando servidor</h2>

```bash
# Instale as dependências
$ npm install

# Inicie o servidor
$ npm start

# O servidor inciará na porta declarada no arquivo .env ou na porta:5000
```

<h2>Request</h2>

- `GET`: `localhost:5000/analise-sentimento`

``` json
{
  "texto": "string para ser analizada"
}
```

<h2>Retorno</h2>

``` json
{
  "textoAnalizado": string enviada para análise,
  "sentimento": objeto com score (-1 até 1) e label (positivo ou negativo),
  "entidades": array com as entidades e sentimentos relacionados a elas,
  "palavrasChave": array de palavras chaves, relevancia, e sentimento relacionados a elas
}
```
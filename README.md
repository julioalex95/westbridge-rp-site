# Westbridge RP - versão live

## Testar

```bash
npm install
npm run dev
```

## IP configurado

Servidor FiveM:
`134.255.233.35:30310`

## Jogadores online

O site lê automaticamente:
`http://134.255.233.35:30310/players.json`

Atualiza a cada 30 segundos.

## Adicionar mansões

Abre `src/main.jsx` e procura:

```js
const mansions = [
```

Para adicionar uma imagem, coloca a imagem dentro da pasta `public`, por exemplo:

`public/mansao-vinewood.png`

Depois usa:

```js
image: "/mansao-vinewood.png",
```

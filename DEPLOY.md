# 🚀 Deploy no GitHub Pages - Super Barreiras

## Passos Rápidos para Deploy

### 1️⃣ Fazer Build do Projeto

```bash
cd /app/frontend
yarn build
```

### 2️⃣ Configurar GitHub Repository

No seu repositório GitHub:

1. Vá em **Settings** (Configurações)
2. No menu lateral, clique em **Pages**
3. Em **Source** (Fonte):
   - Selecione **Deploy from a branch**
   - Branch: **main** ou **master**
   - Folder: **/frontend/build** ⚠️ ou **/(root)** se você mover os arquivos

### 3️⃣ Opção A: Usar GitHub Actions (Mais Fácil)

1. Na aba **Actions** do seu repositório
2. Busque por "React" ou "Node.js"
3. Configure o workflow automático
4. A cada push, o GitHub fará build e deploy automaticamente

### 3️⃣ Opção B: Deploy Manual com gh-pages

```bash
# Na pasta frontend
cd /app/frontend

# Adicionar gh-pages como dependência
yarn add -D gh-pages

# Adicionar no package.json:
"homepage": "https://SEU-USUARIO.github.io/SEU-REPOSITORIO",
"scripts": {
  "predeploy": "yarn build",
  "deploy": "gh-pages -d build"
}

# Fazer deploy
yarn deploy
```

### 3️⃣ Opção C: Deploy Direto (Copiar Build)

```bash
# 1. Fazer build
cd /app/frontend
yarn build

# 2. Criar/mudar para branch gh-pages
cd /app
git checkout -b gh-pages

# 3. Copiar arquivos do build para raiz
cp -r frontend/build/* .
cp frontend/build/.* . 2>/dev/null || true

# 4. Commitar e fazer push
git add .
git commit -m "Deploy: Super Barreiras to GitHub Pages"
git push origin gh-pages

# 5. Configurar no GitHub:
# Settings → Pages → Source: gh-pages branch, /(root)
```

## 🌐 Acessar o Site

Após configurar, o site estará disponível em:

```
https://SEU-USUARIO.github.io/SEU-REPOSITORIO
```

Aguarde 2-5 minutos para o primeiro deploy.

## ✅ Verificar Deploy

1. Acesse a aba **Actions** para ver o progresso
2. Quando o build terminar (✅ verde), acesse a URL
3. Se houver erro (❌ vermelho), verifique os logs

## 🔧 Troubleshooting

### Página em branco após deploy?

Edite `/app/frontend/package.json` e adicione:

```json
{
  "homepage": "."
}
```

Depois faça build novamente e redeploy.

### 404 ao recarregar a página?

Crie um arquivo `public/404.html` que redireciona para `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Super Barreiras</title>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/SEU-REPOSITORIO'">
  </head>
</html>
```

## 📝 Estrutura de Arquivos para GitHub

```
seu-repositorio/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── build/          ← Gerado pelo yarn build
│   └── package.json
├── README.md
└── DEPLOY.md          ← Este arquivo
```

## 💡 Dicas

- Use **GitHub Actions** para deploy automático a cada push
- Mantenha a pasta `build` no `.gitignore` se usar gh-pages
- Teste localmente com `yarn build && serve -s build`
- Monitore o tamanho do bundle (target: <500KB)

## 🎯 Checklist Final

- [ ] Build realizado sem erros
- [ ] GitHub Pages configurado
- [ ] URL do site acessível
- [ ] Todas as funcionalidades testadas
- [ ] localStorage funcionando
- [ ] Exportação PNG funcionando
- [ ] Responsivo em mobile

---

✅ Pronto! Seu Super Barreiras está no ar! 🚀

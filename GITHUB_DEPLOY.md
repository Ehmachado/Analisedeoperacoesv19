# 🎯 Guia Rápido: Deploy no GitHub Pages

## ✅ Estrutura do Projeto (Pronta para Deploy)

```
seu-repositorio/
├── docs/                    ← Build pronto para GitHub Pages ✅
│   ├── index.html
│   └── static/
├── frontend/                ← Código fonte React
│   ├── src/
│   └── package.json
├── build-for-github.sh      ← Script automático de build
└── README.md
```

## 🚀 3 Passos para Deploy

### 1️⃣ Build do Projeto

```bash
cd /app
./build-for-github.sh
```

✅ Isso vai:
- Fazer build do React
- Copiar arquivos para `/docs`
- Otimizar para produção

### 2️⃣ Push para GitHub

```bash
# Adicionar arquivos
git add .

# Commit
git commit -m "Deploy: Super Barreiras"

# Push para GitHub
git push origin main
```

### 3️⃣ Configurar GitHub Pages

1. Abra seu repositório no GitHub
2. Clique em **⚙️ Settings** (Configurações)
3. No menu lateral esquerdo, clique em **Pages**
4. Em **Source** (Origem):
   - Branch: **main** ✅
   - Folder: **/docs** ✅
5. Clique em **Save** (Salvar)
6. Aguarde 2-5 minutos

### 🌐 Acessar o Site

Seu site estará disponível em:
```
https://seu-usuario.github.io/seu-repositorio
```

## 🔄 Atualizar o Site

Sempre que fizer mudanças:

```bash
# 1. Build
./build-for-github.sh

# 2. Commit e push
git add .
git commit -m "Update: [descrição da mudança]"
git push origin main
```

GitHub Pages atualiza automaticamente em 1-2 minutos! 🎉

## 🐛 Troubleshooting

### Página 404?
- Verifique se escolheu **/docs** como pasta
- Aguarde 5 minutos após configurar

### Página em branco?
- Verifique se o build foi executado: `ls -la docs/`
- Deve conter `index.html` e pasta `static/`

### CSS não carrega?
- Já configurado! O `"homepage": "."` no package.json resolve isso

### Mudanças não aparecem?
- Aguarde 2-3 minutos após push
- Limpe cache do navegador (Ctrl+Shift+R)
- Verifique a aba **Actions** no GitHub

## ✅ Checklist Final

- [ ] `./build-for-github.sh` executado sem erros
- [ ] Pasta `/docs` contém `index.html`
- [ ] `git push` concluído
- [ ] GitHub Pages configurado (Settings → Pages)
- [ ] Branch: **main**, Folder: **/docs**
- [ ] Aguardei 5 minutos
- [ ] Site acessível na URL

## 💡 Dicas

- **Sempre faça build antes de push**: `./build-for-github.sh`
- **Não edite arquivos em `/docs` manualmente**: são gerados automaticamente
- **Use o script**: é mais rápido e evita erros
- **Monitore o deploy**: aba **Actions** no GitHub mostra o progresso

## 📞 Links Úteis

- [Documentação GitHub Pages](https://docs.github.com/pages)
- [Tutorial React Deploy](https://create-react-app.dev/docs/deployment/#github-pages)

---

**Pronto! Seu Super Barreiras no ar em menos de 5 minutos! 🚀**

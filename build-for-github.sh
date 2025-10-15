#!/bin/bash

# Build script para GitHub Pages Deploy
# Este script gera o build do React e copia para /docs

echo "🚀 Iniciando build do Super Barreiras..."

# 1. Build do frontend
cd /app/frontend
echo "📦 Gerando build otimizado..."
yarn build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build do frontend"
    exit 1
fi

# 2. Copiar para /docs
cd /app
echo "📂 Copiando arquivos para /docs..."
rm -rf docs
cp -r frontend/build docs

# 3. Verificar
if [ -f "docs/index.html" ]; then
    echo "✅ Build concluído com sucesso!"
    echo "📁 Arquivos prontos em: /app/docs"
    echo ""
    echo "📤 Próximos passos para deploy no GitHub:"
    echo "   1. git add ."
    echo "   2. git commit -m 'Deploy: Super Barreiras'"
    echo "   3. git push origin main"
    echo "   4. No GitHub: Settings → Pages → Source: main branch, /docs folder"
    echo ""
    echo "🌐 Seu site estará disponível em:"
    echo "   https://SEU-USUARIO.github.io/SEU-REPOSITORIO"
else
    echo "❌ Erro ao copiar arquivos"
    exit 1
fi

# Super Barreiras — Análise de Operações

Sistema web moderno para análise de operações do Banco do Brasil, com interface intuitiva e funcionalidades avançadas de exportação.

## 🎯 Funcionalidades

- ✅ **Formulário Completo**: Mais de 30 campos organizados em 3 colunas coloridas
- 💾 **Auto-save**: Persistência automática no localStorage
- 📊 **Cálculo Automático**: Share BB calculado em tempo real
- 👁️ **Modo Pré-visualização**: Visualize antes de exportar
- 📸 **Exportação PNG**: Gera imagem em alta qualidade com layout otimizado (4 colunas)
- 🎨 **Design Banco do Brasil**: Paleta oficial com amarelo (#ffcc00) e azul (#003399)
- 📱 **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🔄 **Formatação BRL**: Campos de moeda com formatação automática pt-BR

## 🚀 Tecnologias

- **Frontend**: React 19
- **UI Components**: Shadcn/ui + Radix UI
- **Styling**: Tailwind CSS + CSS customizado
- **Icons**: Lucide React
- **Export**: html2canvas
- **Tipografia**: Inter (Google Fonts)

## 📦 Instalação e Execução

### Desenvolvimento Local

```bash
# Instalar dependências
cd frontend
yarn install

# Iniciar servidor de desenvolvimento
yarn start
```

O app estará disponível em `http://localhost:3000`

### Build para Produção

```bash
# Gerar build otimizado
yarn build
```

## 🌐 Deploy no GitHub Pages

### Preparação para GitHub Pages

```bash
# 1. Fazer build do projeto
cd /app/frontend
yarn build

# 2. Criar branch gh-pages e copiar build
cd /app
git checkout -b gh-pages
cp -r frontend/build/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages

# 3. Configurar no GitHub
# Vá em Settings → Pages → Source: gh-pages branch
```

## 📋 Como Usar

1. **Preencher Dados**: Digite as informações nos campos
2. **Auto-save**: Os dados são salvos automaticamente no navegador
3. **Pré-visualizar**: Clique no botão "Pré-visualizar" para ver como ficará a exportação
4. **Exportar PNG**: Clique em "Exportar PNG" para baixar a imagem (layout 4 colunas)
5. **Limpar**: Use o botão "Limpar" para resetar todos os campos

### Cálculo do Share BB

O **Share BB** é calculado automaticamente usando a fórmula:
```
Share BB (%) = (Endividamento no BB ÷ Endividamento no SFN) × 100
```

## 🎨 Paleta de Cores Banco do Brasil

- **Azul Principal**: #003399
- **Azul Claro**: #2a56c6
- **Amarelo**: #ffcc00
- **Amarelo Claro**: #ffe680

## 📱 Responsividade

- **Desktop (>1400px)**: 3 colunas
- **Tablet (900px-1400px)**: 2 colunas
- **Mobile (<900px)**: 1 coluna
- **Export**: 4 colunas otimizado

## 🖼️ Exportação PNG

A exportação gera uma imagem com:
- Layout reorganizado em 4 colunas
- Fundo branco
- Alta qualidade (scale 2x)
- Compressão otimizada

---

Desenvolvido com Emergent AI 🚀

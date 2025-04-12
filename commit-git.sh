#!/bin/bash

echo "🔍 Verificando alterações..."
git status

echo "📦 Adicionando tudo..."
git add .

echo "📝 Informe a mensagem do commit:"
read mensagem

echo "✅ Fazendo commit..."
git commit -m "$mensagem"

echo "🚀 Enviando para o GitHub..."
git push origin main

echo "✅ Repositório atualizado com sucesso!"


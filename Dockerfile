# Use a imagem oficial do Node.js com a versão desejada
FROM node:14

# Crie e defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos do projeto para o diretório de trabalho no contêiner
COPY . .

# Instale as dependências
RUN npm install

# Expõe a porta 3000 (ou a porta que a aplicação Next.js está configurada para usar)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
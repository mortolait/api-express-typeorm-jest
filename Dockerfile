FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código fonte para o diretório de trabalho
COPY . .

# Compile o código TypeScript para JavaScript
RUN npm run build

# Exponha a porta em que a aplicação irá rodar
EXPOSE 3000

# Defina a variável de ambiente para a porta do servidor
ENV PORT=3000

# Comando para rodar a aplicação
CMD ["npm", "start"]

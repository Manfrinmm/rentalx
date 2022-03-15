# Docker

- Após realizar o build da imagem do projeto: `docker build -t rentx .`
  **Utilizando somente docker**
- Iniciaremos a imagem: `docker run -p 3333:3333 rentx`

**Utilizando docker compose**

- Inicializar o container: `docker-compose up -d`

- Visualização de logs: `docker logs rentx -f`

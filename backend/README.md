<h1 align="center">
    <a href="https://www.respondeai.com.br/" target="_blank"> 
        <img alt="Rocketseat" title="#Rocketseat" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.respondeai.com.br%2Fmaterias&psig=AOvVaw0WPJf1eHkkoaeFV5Y3peQU&ust=1625504178024000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKCgsIvxyfECFQAAAAAdAAAAABAD" width="350px" />
    </a>
</h1>

# Intro
Backend construido em com NodeJS


# Configurações
- <b>git bash:</b> Recomenda-se utilizar o <i>gitbash</i> como terminal para executar a aplicação, por conter comandos não reconhecidos pelo cmd do Windows.
    > https://git-scm.com/downloads 

- <b>Instalar as dependências:</b> Executar yarn ou npm install para instalar as dependências do projeto.

- <b>ormconfig:</b> Dentro do arquivo <i>ormconfig.json</i> existem dois JSON, aquele que tiver <i>name: default</i> altere os valores das chaves <i>type, host, port, username, password e database </i> conforme as configurações do ambiente que o banco de dados estiver.
    > <b>type</b>: aplicação foi desenvolvida utilizando postgres, recomenda-se manter o valor dessa chave
    > <b>host</b>: ip da máquina que o bd está hospedado
    > <b>port</b>: porta que o bd de postgres está apontando
    > <b>username</b>: login para acessar o banco de dados
    > <b>password</b>: senha para acessar o banco de dados
    > <b>database</b>: nome do banco

- Criar um banco de dados com o mesmo nome da chave database do arquivo <i>ormconfig.json</i> definido anteriormente.

- Após ter criado o banco executar as migration com <i>yarn typeorm migration:run.</i>

- Proto para executar! A seguir a lista de comandos para executar ou testar a aplicação.

# Comandos
- <b>start</b>: executar a aplicação
- <b>dev</b>: executar em modo de desenvolvimento
- <b>test</b>: executar testes

# Tecnologias utilizadas
- NodeJS
- Celebrate
- Jest
- Typescript
- Typeorm

# Conceitos exercitados
- Testes unitários
- Testes de integração
- Validação/Tratamento de erros
- ORM 

# Equação de Heversine
http://www.movable-type.co.uk/scripts/latlong.html
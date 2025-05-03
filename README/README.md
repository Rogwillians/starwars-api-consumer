
# Catálogo Interativo de Filmes

Este projeto é uma aplicação web interativa que permite aos usuários explorar detalhes sobre filmes e personagens de Star Wars. A aplicação exibe informações detalhadas sobre cada filme, como título, sinopse, diretor, produtores e data de lançamento, além de trailers incorporados do YouTube. Os usuários também podem acessar detalhes dos personagens com informações como gênero, espécie, planeta natal, e filmes e naves associados. A interface inclui uma experiência fluida com carregamento dinâmico de dados, modais interativas e indicadores visuais de carregamento, proporcionando uma navegação intuitiva e informativa.


## Tecnologias

Projeto foi criado com:

PHP 7.4.33

JavaScript

HTML

CSS

Bootstrap 5.3.3

MySQL

Servidor Web: Apache

## Instalação

Modifique o limite de memoria no php.ini

```php.ini
  memory_limit=1024M
```

Modifique as variaveis do PDO de acordo com seu host, usuario e senha do banco de dados.

``` configuração do PDO
    $host 'nome do seu host', 
    $user = 'seu usuario', 
    $password = 'sua senha', 
    $dbName = 'nome do banco utilizado'
    em src/Database/request_logs_table.php & src/log_request.php
```
## Documentação da API

#### Url para acessar a aplicação

    http://localhost/testePratico

#### Retorna uma lista com os filmes assim que inicia o projeto

```http
    /testePratico/index.php
```

#### Retorna os detalhes de um filme

```http
  GET /testePratico/src/EndPoints/film_endpoint.php
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `filmUrl`   |  `string`  | **Obrigatório**. URL do filme na API SWAPI.I |

#### Exemplo de Requisição 

GET /testePratico/src/EndPoints/film_endpoint.php?filmUrl=https://swapi.dev/api/films/1/

#### Exemplo de Retorno

{
    "title": "A New Hope",
    "episode_id": 4,
    "opening_crawl": "It is a period of civil war...",
    "director": "George Lucas",
    "producer": "Gary Kurtz, Rick McCallum",
    "release_date": "25/05/1977",
    "age": 46,
    "characters": [
        "Luke Skywalker",
        "C-3PO",
        "R2-D2"
    ],
    "chLinks": [
        "https://swapi.dev/api/people/1/",
        "https://swapi.dev/api/people/2/",
        "https://swapi.dev/api/people/3/"
    ]
}

#### Exemplo de Requisição com cURL

```bash
curl -X GET "http://localhost/testePratico/src/Endpoints/film_endpoint.php?filmUrl=https://swapi.py4e.com/api/films/1/" -H "Content-Type: application/json"
```


#### Retorna os detalhes de um personagem

```http
  GET /testePratico/src/EndPoints/character_endpoint.php
```

| Parâmetro     | Tipo       | Descrição                                   |
| :----------   | :--------- | :------------------------------------------ |
| `characterUrl`|  `string`  | **Obrigatório**. URL do personagem na API SWAPI. |

#### Exemplo de Requisição

GET /testePratico/src/EndPoints/character_endpoint.php?characterUrl=https://swapi.dev/api/people/1/

#### Exemplo de retorno

{
    "name": "Luke Skywalker",
    "gender": "male",
    "birth_year": "19BBY",
    "hair_color": "blond",
    "species": "Human",
    "homeworld": "Tatooine",
    "skin_color": "fair",
    "mass": "77",
    "films": [
        "A New Hope",
        "The Empire Strikes Back",
        "Return of the Jedi"
    ],
    "starships": [
        "X-wing",
        "Imperial shuttle"
    ]
}


## Logs

No arquivo log_request.php existe a função logApiRequest que é responsável por guardar no banco de dados o tipo de requisição e a url que foi acessada na SWAPI.

#### Exemplo de uso
logApiRequest($Url, 'GET');

| Parâmetros    | Tipo       | Descrição                                   |
| :----------   | :--------- | :------------------------------------------ |
| `$Url, 'GET'`|  `string`  | **Obrigatório**. URL da SWAPI e tipo de requisição utilizado. |

## Referências

 - [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)

 - [Bootstrap docs](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

 - [SWAPI docs](https://swapi.py4e.com/documentation)

## Autor

- [@Rogwillians](https://github.com/Rogwillians)


### Estrutura do Projeto


testePratico/

│
├── .idea/                          # Configurações do projeto (geradas pelo IDE Intellij)
├── config/                         # Arquivos de configuração
├── node_modules/                   # Arquivos do bootstrap
│
├── public/                         # Arquivos públicos acessíveis diretamente
│   └── js/
│       └── films.js                # Script JavaScript para funcionalidades de filmes
│
├── src/                            # Código-fonte principal do projeto
│   ├── Controllers/                # Controladores responsáveis pela lógica das rotas
│   │   └── FilmsController.php     # Controlador para operações relacionadas a filmes
│   │
│   ├── Database/                   # Scripts relacionados ao banco de dados
│   │   └── request_logs_table.php  # Script para criação/manipulação da tabela de logs de requisições
│   │
│   ├── Endpoints/                  # Endpoints acessíveis pela aplicação
│   │   ├── character_endpoint.php  # Endpoint para obter detalhes de personagens
│   │   └── film_endpoint.php       # Endpoint para obter detalhes de filmes
│   │
│   ├── Repositories/               # Camada de repositórios para banco de dados
│   │   
│   │
│   ├── Services/                   # Serviços responsáveis por regras de negócio
│       ├── CharacterService.php    # Serviço para lógica de personagens
│       ├── FilmsService.php        # Serviço para lógica de filmes
│       ├── PlanetsService.php      # Serviço para lógica de planetas
│       ├── SpeciesService.php      # Serviço para lógica de espécies
│       ├── StarshipsService.php    # Serviço para lógica de naves espaciais
│       └── VehiclesService.php     # Serviço para lógica de veículos
│
│   └── log_request.php             # Script para registrar logs de requisições
│
├── templates/                      # Arquivos de template para exibição
│   ├── views/                      # Templates específicos para diferentes visualizações
│   │   ├── css/
│   │   ├── js/
│   │   │   └── details.js          # Script relacionado aos detalhes de entidades
│   │   ├── film_details.html       # Template para detalhes de filmes
│   │   └── index.html              # Página inicial do projeto
│   │
│   └── styles.css                  # Estilos globais da aplicação
│
├── index.php                       # Arquivo inicial da aplicação


### Melhorias Futuras

- Adicionar autenticação de usuários para acesso às APIs.
- Implementar sistema de filtro.
- Adicionar opções de idiomas diferentes.
- Implementar paginação na listagem de filmes e personagens.
- Criar aba unica para Listar personagens.
- Adicionar imagens de naves e personagens aos detalhes.
- Melhorar a experiência mobile com estilos adicionais.
- Criar testes unitários para validar os serviços e endpoints.
- Implementar um sistema de cache para melhorar o tempo de resposta.


### Problemas Conhecidos
- A API pode apresentar lentidão caso o servidor da SWAPI esteja com alta carga.
- O projeto pode demorar a exibir conteúdo em conexões mais lentas.


### Capturas de Tela
- **Listagem de Filmes**
  ![Listagem de Filmes](https://i.imgur.com/kavzb2e.jpeg)

- **Detalhes de Personagens**
  ![Detalhes de Personagens](https://i.imgur.com/WJs8EmP.png)

- **Requisição com curl**
  ![Requisição com curl](https://i.imgur.com/FfFaFXW.png)
  
    


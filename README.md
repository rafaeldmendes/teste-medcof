# TESTE MEDCOF - [@rafaeldmendes](https://github.com/rafaeldmendes)


Aplicação feita comprindo os requitos do teste para a vaga de dev pleno.
### Pré-requitos
  - node
  - docker
## Getting Started

Para ser iniciado corretamente, deve-se preencher o arquivo **.env** na raiz do projeto com base nos campos do arquivo **.env.example**
 - [.env.example](https://github.com/rafaeldmendes/teste-medcof/blob/main/.env.example)

O projeto possui docker para facilitar a inicialização do projeto. acesse a raiz do projeto e execute o seguinte comando:

```
docker compose up --build
```

## Documentação da API
 A collection do postman está disponivel na raiz do projeto
- [collection](https://github.com/rafaeldmendes/teste-medcof/blob/main/Teste%20MedCof.postman_collection.json)

#### Endpoint para realizar login na aplicação:

```http
  POST /auth/login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. A chave de identificação do seu usuario |
| `password` | `string` | **Obrigatório**. A chave de acesso |

#### Estrutura de retorno em caso de sucesso:
O valor do campo  do campo data deve ser copiado e incluido no header dos demais endpoints através do parametro **Authorization**, caso esteja utilizando a collection disponibilizada no projeto, há um script para realizar esse processo automaticamente.
```
{
    "code": 200,
    "status": "success",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvb3QiOnRydWUsImlhdCI6MTcwOTIxOTY2MCwiZXhwIjoxNzA5MjIzMjYwfQ.Biu5w299Yj_SpmFQOkC7lwF5atfrMvNiOcNNd9jaCnE"
}
```
#### Endpoint para realizar a criação de um novo usuario:
esse endpoint só pode ser acessado por um usuario root, definido na inicialização do projeto.

```http
  POST /users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Identificação do seu usuario |
| `username` | `string` | **Obrigatório**. A chave de identificação do seu usuario |
| `password` | `string` | **Obrigatório**. A chave de acesso |

#### [200]:
```
{
    "code": 200,
    "status": "success",
    "data": {
        "username": "rafa12345",
        "id": 35
    }
}
```
#### [404]:
```
{
    "code": 404,
    "status": "error",
    "message": "User not found"
}
```
#### [500]:
Nesse caso pode ter ocorrido algo na aplicação que foge do mapeado.
```
{
    "code": 500,
    "status": "error",
    "message": "Error on create "
}
```

#### Endpoint para conferir disponibilidade do serviço

Endpoint exige autenticação de um usuario, e o campo **Authorization** no header da requisição.

```http
  GET /health
```

#### [200]:

```
{
    "status": "ok"
}
```
#### [401]:

```
{
    "error": "Access denied"
}
```
```
{
    "error": "Invalid token"
}
```


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```



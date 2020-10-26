# Challenge - Developer Backend
Neste repositório você vai encontrar uma resolução para o desafio do processo seletivo da [Goomer](https://goomer.com.br/).

## Desafio
Criar uma API RESTful capaz de gerências os restaurantes e os produtos do seu cardápio.

---
## Sumario
  - [**Iniciando**](#iniciando)
  - [**Executar Projeto**](#executar)
    - [**yarn**](#yarn)
    - [**npm**](#npm)
    - [**docker-compose**](#docker-compose)
  - [**Exempos de Requisições**](#exemplos-de-requisições)
    - [**Restaurante**](#restaurante)
      - [**Criar**](#criar)
      - [**Listar Todos**](#listar-todos)
      - [**Retornar um Especifico**](#retornar-um-especifico)
      - [**Atualizar Dados**](#atualizar-dados)
      - [**Excluir**](#excluir)
    - [**Produto**](#produto)
      - [**Criar**](#criar_)
      - [**Listar Todos**](#listar-todos_)
      - [**Retornar um Especifico**](#retornar-um-especifico_)
      - [**Atualizar Dados**](#atualizar-dados_)
      - [**Excluir**](#excluir_)
    - [**Restaurante Imagens**](#restaurante_)
      - [**Criar**](#criar__)
      - [**Listar Todos**](#listar-todos__)
      - [**Retornar um Especifico**](#retornar-um-especifico__)
      - [**Atualizar Dados**](#atualizar-dados__)
      - [**Excluir**](#excluir__)
    - [**Produto Imagens**](#produto_)
      - [**Criar**](#criar___)
      - [**Listar Todos**](#listar-todos___)
      - [**Retornar um Especifico**](#retornar-um-especifico___)
      - [**Atualizar Dados**](#atualizar-dados___)
      - [**Excluir**](#excluir___)
    - [**Desafios/Problemas**](#desafios-problemas)
    - [**Melhorias**](#melhorias)
---

## Iniciando
```sh
# clonar repositório
git clone https://github.com/jorge-lba.git
cd desafio-goomer
```
## Executar
##### yarn
```sh
# Instalando dependência
yarn install

# Rodando Migrations
yarn typeorm migration:run

# Rodar Testes
yarn test

# Iniciando Servidor
yarn start
```
##### npm
```sh
# Instalando dependência
npm install

# Rodando Migrations
npm typeorm migration:run

# Rodar Testes
npm test

# Iniciando Servidor
npm start
```
##### Docker-Compose
```sh
# Rodando o Projeto (Verifique se está na pasta desafio-goomer)
docker-compose run goomer
```
---

### Exemplos de Requisições 
#### Restaurante
##### Criar
```sh
# POST
curl --request POST \
  --url http://localhost:3333/restaurants \
  --header 'content-type: multipart/form-data' \
  --form 'name=Duo Bistrô' \
  --form 'street=Rua Aparecid' \
  --form 'number=626' \
  --form 'complement=none '\
  --form 'state=São PAulo' \
  --form 'city=Sorocaba' \
  --form 'zip_code=18095-000' \
  --form 'weekdays_start[0]=2' \
  --form 'weekdays_end[0]=5' \
  --form 'opening_times[0]=12:00' \
  --form 'closing_times[0]=15:00' \
  --form 'weekdays_start[1]=5' \
  --form 'weekdays_end[1]=6' \
  --form 'opening_times[1]=20:00' \
  --form 'closing_times[1]=23:00' \
  --form 'images=@'$(pwd)'/__tests__/assets/restaurant_dou_01.jpg'
```
##### Listar Todos
```sh
# GET
curl --request GET \
  --url http://localhost:3333/restaurants
```
##### Retornar Um Especifico
```sh
# GET
curl --request GET \
  --url http://localhost:3333/restaurants/1
```
##### Atualizar Dados
```sh
# PUT
curl --request PUT \
  --url http://localhost:3333/restaurants/1 \
  --header 'content-type: application/json' \
  --data '{
  "name": "Duo Bistrô & Rotisseria",
	"address":{
		"street":"Rua Aparecida"
	},
    "working_hours": [
      {
        "id": 2,
        "weekday_start": 5,
        "weekday_end": 6,
        "opening_time": "20:00",
        "closing_time": "23:00"
      },
			{
        "id": 1,
        "weekday_start": 2,
        "weekday_end": 5,
        "opening_time": "12:00",
        "closing_time": "15:00"
      }
    ]
}'
```
##### Excluir
```sh
# DELETE
# ---- Caso queira executar os comando diretamente deixe o
# DELETE para o final, todos os comando foram listados para
# serem executados com IDs já preenchidos ----
curl --request DELETE \
  --url http://localhost:3333/restaurants/1
```
---
#### Produto
##### Criar_
```sh
# POST
curl --request POST \
  --url http://localhost:3333/restaurants/1/products \
  --header 'content-type: multipart/form-data' \
  --form 'name=Filé de salmão da Tasmânia' \
  --form 'price=65.00' \
  --form 'category=Doce' \
  --form 'promotion_prices[0]=49.99' \
  --form 'promotion_descriptions[0]=Lançamento' \
  --form 'weekdays_start[0]=6' \
  --form 'weekdays_end[0]=0' \
  --form 'times_start[0]=20:00' \
  --form 'times_end[0]=22:00' \
  --form 'valid[0]=true' \
  --form 'images=@'$(pwd)'/__tests__/assets/prato_01.jpg'
```
##### Listar Todos_
```sh
# GET
curl --request GET \
  --url http://localhost:3333/products
```
##### Retornar Um Especifico_
```sh
# GET
curl --request GET \
  --url http://localhost:3333/restaurants/1/products
```
##### Atualizar Dados_
```sh
# PUT
curl --request PUT \
  --url http://localhost:3333/products/1 \
  --header 'content-type: application/json' \
  --data '{
      "name": "Filé de salmão da Tasmânia com purê de cenoura holandês",
      "price": 69.99,
      "category": "Salgado",
      "promotions": [
        {
					"id":1,
          "price": 54.99,
          "description": "Lançamento do nosso mais novo prato",
          "weekday_start": 6,
          "weekday_end": 0,
          "time_start": "20:00",
          "time_end": "23:00",
          "valid": false
        }
      ]
    }'
```
##### Excluir_
```sh
# DELETE
# ---- Caso queira executar os comando diretamente deixe o
# DELETE para o final, todos os comando foram listados para
# serem executados com IDs já preenchidos ----
curl --request DELETE \
  --url http://localhost:3333/products/1
```
---

### Imagens
#### Restaurante_
##### Criar__
```sh
# POST
curl --request POST \
  --url http://localhost:3333/images/restaurants/1 \
  --header 'content-type: multipart/form-data' \
  --form 'images=@'$(pwd)'/__tests__/assets/restaurant_dou_03.jpg'
```
##### Listar Todos__
```sh
# GET
curl --request GET \
  --url http://localhost:3333/images/restaurants
```
##### Retornar Um Especifico__
```sh
# GET
curl --request GET \
  --url http://localhost:3333/images/restaurants/1
```
##### Atualizar Dados__
```sh
# PUT
curl --request PUT \
  --url http://localhost:3333/images/restaurants/1/1 \
  --header 'content-type: multipart/form-data' \
  --form 'images=@'$(pwd)'/__tests__/assets/restaurant_dou_02.jpg'
```
##### Excluir__
```sh
# DELETE
# ---- Caso queira executar os comando diretamente deixe o
# DELETE para o final, todos os comando foram listados para
# serem executados com IDs já preenchidos ----
curl --request DELETE \
  --url http://localhost:3333/images/restaurants/1/1
```
---
#### Produto_
##### Criar___
```sh
# POST
curl --request POST \
  --url http://localhost:3333/images/products/1 \
  --header 'content-type: multipart/form-data' \
  --form 'images=@'$(pwd)'/__tests__/assets/prato_01.jpeg'
```
##### Listar Todos___
```sh
# GET
curl --request GET \
  --url http://localhost:3333/images/products
```
##### Retornar Um Especifico___
```sh
# GET
curl --request GET \
  --url http://localhost:3333/images/products/1
```
##### Atualizar Dados___
```sh
# PUT
curl --request PUT \
  --url http://localhost:3333/images/products/1/1 \
  --header 'content-type: multipart/form-data' \
    --form 'images=@'$(pwd)'/__tests__/assets/prato_02.jpeg.jpg'
```
##### Excluir___
```sh
# DELETE
# ---- Caso queira executar os comando diretamente deixe o
# DELETE para o final, todos os comando foram listados para
# serem executados com IDs já preenchidos ----
curl --request DELETE \
  --url http://localhost:3333/images/products/1/1
```


---

### Desafios / Problemas

  * __ESLint :__ 
    - Tive um problema com o funcionamento do ESLint quando passado o parâmetro *jest/Globals*, após passar o parâmetro o ESLinbt parava de fazer a verificação automática. A solução que encontrei fou utilizar um plugin do jest para ESLint. 

  * __TypeORM :__ 
    - Optei por utilizar o TypeORM mesmo não tendo utilizado ante, tive um problema ao fazer a relação OneToOne, diferente das relações OneToMany e ManyToOne que é feito um join nas duas tabelas, o OneToOne só é necessário passa em uma das tabelas.
    - Diferente do .create o .update não faz a atualização em rodas as tabelas relacionadas ( Pesquisei na documentação e em outros locais e não achei nada que fizesse o mesmo efeito do .create), minha solução foi implementar uma funcionalidade que implementa a "mesma" funcionalidade do .create fazendo a atualização nas tabelas relacionadas.

  * __Tabela de Horários de Funcionamento :__
    - Inicialmente optei por usar campos do tipo Date para cadastrar os horários de abertura e fechamento do estabelecimento, mas fazendo desta forma eu teria que usar mais recursos para fazer a comparação e depois o tratamento para apresentar os horários como foi dado o exemplo. Optei usar o campo com _string_ tornando mais fácil o tratamento.

### Melhorias

- [ ] Revisão da funcionalidade que trata os horários de funcionamento e promoções.
- [ ] Adicionar validação dos Dados.
- [ ] Adicionar tratamento dos erros.
- [ ] Revisar códigos duplicados e separar em funções reutilizáveis.
- [ ] Revisar os tipos dos dados utilizados nas migrations.
- [ ] Avaliar se os nomes das variáveis e funções estão coerentes.
- [ ] Revisar tipos das variáveis e funções. 
- [ ] Os teste estão incompletos, é necessário completar.
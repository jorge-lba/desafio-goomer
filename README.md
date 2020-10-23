# Challenge - Developer Backend
Neste repositório você vai encontrar uma resolução para o desafio do processo seletivo da [Goomer](https://goomer.com.br/).

## Desafio
Criar uma API RESTful capaz de gerências os restaurantes e os produtos do seu cardápio.

### Desafios/Problemas

  * __ESLint :__ 
    - Tive um problema com o funcionamento do ESLint quando passado o parâmetro *jest/Globals*, após passar o parâmetro o ESLinbt parava de fazer a verificação automática. A solução que encontrei fou utilizar um plugin do jest para ESLint. 

  * __TypeORM :__ 
    - Optei por utilizar o TypeORM mesmo não tendo utilizado ante, tive um problema ao fazer a relação OneToOne, diferente das relações OneToMany e ManyToOne que é feito um join nas duas tabelas, o OneToOne só é necessário passa em uma das tabelas.

  * __Tabela de Horários de Funcionamento :__
    - Inicialmente optei por usar campos do tipo Date para cadastrar os horários de abertura e fechamento do estabelecimento, mas fazendo desta forma eu teria que usar mais recursos para fazer a comparação e depois o tratamento para apresentar os horários como foi dado o exemplo. Optei usar o campo com _string_ tornando mais fácil o tratamento.
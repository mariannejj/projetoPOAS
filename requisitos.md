Requisitos do Sistema

1. Requisitos Funcionais


RF01 - Criar tarefas

O sistema deve permitir que o usuario cadastre novas tarefas escolares. 
Para cadastrar uma tarefa, o usuario deve informar o titulo da tarefa, a materia e o prazo de entrega. Apos o cadastro, a tarefa deve ser armazenada e aparecer na listagem de tarefas.


RF02 - Listar tarefas

O sistema deve permitir que o usuario visualize as tarefas cadastradas. 
A listagem deve apresentar as informacoes das tarefas de forma organizada, permitindo que o usuario acompanhe suas atividades escolares.


RF03 - Concluir tarefas

O sistema deve permitir que o usuario marque uma tarefa como concluida. 
Ao realizar essa acao, o status da tarefa deve ser atualizado para indicar que a atividade ja foi realizada.


RF04 - Remover tarefas

O sistema deve permitir que o usuario remova uma tarefa cadastrada. 
Ao excluir uma tarefa, ela deve deixar de aparecer na listagem do sistema.


RF05 - Editar tarefas

O sistema deve permitir que o usuario edite uma tarefa ja cadastrada. 
O usuario podera alterar as informacoes da tarefa, como titulo, materia e prazo. Apos a alteracao, os novos dados devem ser atualizados no sistema.


RF06 - Filtrar tarefas por materia

O sistema deve permitir que o usuario filtre as tarefas cadastradas de acordo com a materia. 
Ao selecionar uma materia, o sistema deve apresentar as tarefas relacionadas a ela. Esse recurso deve facilitar a organizacao e a visualizacao das atividades escolares.


2. Requisitos Nao Funcionais

RNF01 - Tecnologia de Frontend

O frontend do sistema deve ser desenvolvido utilizando a tecnologia NextJS.


RNF02 - Integracao entre Frontend e Backend

O sistema deve possuir integracao entre o frontend e o backend para permitir o funcionamento das operacoes relacionadas as tarefas. 
O frontend sera responsavel pela interacao com o usuario, enquanto o backend sera responsavel pelo processamento das informacoes.


RNF03 - Facilidade de uso

O sistema deve possuir uma interface simples, organizada e facil de utilizar. 
As funcionalidades devem ser apresentadas de maneira clara para facilitar a utilizacao por parte dos estudantes.


3. Regras de Negocio

RN01 - Informacoes obrigatorias da tarefa

Toda tarefa cadastrada no sistema deve conter obrigatoriamente titulo, materia e prazo. 
O sistema nao deve permitir o cadastro de uma tarefa caso algum desses campos esteja vazio.
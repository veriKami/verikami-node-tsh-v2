##: ----------------------------------------------------------------------------
##: veriKami °|° 2024 °|||||||||||||||||||||||||||||||||||||||||||||||||||||||||
##: ----------------------------------------------------------------------------

NAME         := 1999.test   # Deploy Name...: app.test $(NAME)
PORT         := 8080:8000  # Port Maping...: 8080:8000 $(PORTS)

NAME := $(strip $(NAME))
PORT := $(strip $(PORT))

##: ----------------------------------------------------------------------------
help: #|° SHOW THIS HELP °||||||||||||||||||||||||||||||||||||||||||||||||||||||
##: ----------------------------------------------------------------------------
	@make .linn .nl
	@grep -hE '^[A-Za-z0-9_ \-]*?:.*##.*$$' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS=":.*?##"};{printf "%3s\033[36m%-13s\033[0m%s\n","",$$1,$$2}'
	@make .nl .linn
##: ----------------------------------------------------------------------------

##: make $(dev|prod) build
##: --------------------------------------------------------
DEV := $(filter dev, $(MAKECMDGOALS))
.EV := $(if $(DEV),.dev,)
NAME := $(NAME)$(.EV)

PRO := $(filter prod, $(MAKECMDGOALS))
.RO := $(if $(PRO),.prod,)
NAME := $(NAME)$(.RO)

TG := $(.EV)$(.RO)
TG := $(if $(TG),app$(TG).,)

dev:; @make .linn; echo 🍋 DEVELOPMENT
prod:; @make .linn; echo 🍋 PRODUCTION
pro:; @make .linn; echo "o! -> USE -> prod"; exit 69

##: ----------------------------------------------------------------------------
##: MAIN °||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
##: ----------------------------------------------------------------------------

build:: .linn ## 🐠 docker build		(dev|prod) Dockerfile
build::
	cd ..; docker build -f ./docker/$(TG)Dockerfile -t $(NAME) .

build::; @make .linn
	@docker images --format "{{.ID}}\t{{.Size}}\t{{.Repository}}" | head -n 5

##: --------------------------------------------------------
:##

runa: .linn ## 🐬 docker run attached		(dev|prod) Image
	docker run --rm -p $(PORT) --name $(NAME) $(NAME)

run: .linn ## 🐬 docker run			(dev|prod) Image
	docker run --rm -d -p $(PORT) --name $(NAME) $(NAME)

##: --------------------------------------------------------
:##

log: .linn ## 🐋 docker logs			(dev|prod) Container
	docker logs --follow $(NAME)

##: --------------------------------------------------------
:##

stop: .linn ## 🐡 docker stop			(dev|prod) Container
	docker stop $(NAME) $(NAME)

stopa: .linn ## 🐡 docker stop all running
	docker stop $(shell docker ps -a -q)

##: --------------------------------------------------------
:##

rm: .linn ## 🐙 docker rm			(dev|prod) Container
	docker rm $(NAME) --force

rmi: .linn ## 🐙 docker rmi			(dev|prod) Image
	docker rmi $(NAME)

rmid: .linn ## 🐙 docker rmi dangling
	docker rmi $(docker images -f "dangling=true" -q)

##: --------------------------------------------------------
:##

sh: .linn ## 🐧 docker exec sh		(dev|prod) Container
	docker exec -it $(NAME) sh

bash: .linn ## 🐧 docker exec bash		(dev|prod) Container
	docker exec -it $(NAME) bash

aux: .linn ## 🐧 docker exec ps aux		(dev|prod) Container
	docker exec -it $(NAME) ps aux

ls: .linn ## 🐧 docker exec ls -lA		(dev|prod) Container
	docker exec -it $(NAME) ls -lA

:##
:## --------------------------------------------------------
:##

re: ## 🐬 Weather Report		(dev|prod)
	make build $(DEV)$(PRO) NAME=1999.report
	@-make run $(DEV)$(PRO) NAME=1999.report PORT=1999:8000
	@-make ls $(DEV)$(PRO) NAME=1999.report
	@-make stop $(DEV)$(PRO) NAME=1999.report
	@-make rmi $(DEV)$(PRO) NAME=1999.report

##: ----------------------------------------------------------------------------
##: DECORATION °-)) °|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
##: ----------------------------------------------------------------------------
.nl:; @printf "\n"
.line:; @for i in {1..73}; do printf "─"; done;
.linn:; @make .line .nl

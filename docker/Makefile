##: ----------------------------------------------------------------------------
##: veriKami °|° 2024 °|||||||||||||||||||||||||||||||||||||||||||||||||||||||||
##: ----------------------------------------------------------------------------

NAME         := 1999.test  ## Deploy Name ------------------ 1999.test $(NAME)
PORT         := 8080:8000  ## Port Mapping ----------------- 8080:8000 $(PORT)

NAME := $(strip $(NAME))
PORT := $(strip $(PORT))

.PHONY: dev prod .linn

##: ----------------------------------------------------------------------------
help: #|° SHOW THIS HELP °||||||||||||||||||||||||||||||||||||||||||||||||||||||
##: ----------------------------------------------------------------------------
	@make .linn .nl
	@grep -hE '^[A-Za-z0-9_ \-]*?:.*##.*$$' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS=":.*?##"};{printf "%3s\033[36m%-13s\033[0m%s\n","",$$1,$$2}'
	@make .nl .linn
##: ----------------------------------------------------------------------------

##: make $(dev|prod) distinctions
DEV := $(filter dev, $(MAKECMDGOALS))
PRO := $(filter prod, $(MAKECMDGOALS))

##: adjust name
NAME := $(if $(DEV),$(NAME).dev,$(NAME))
NAME := $(if $(PRO),$(NAME).prod,$(NAME))

##: build target
TG := $(DEV)$(PRO)

##: Dockerfile prefix
.P := $(if $(DEV),dev.,dev.)
.P := $(if $(PRO),prod.,dev.)

dev:; @make .linn; echo 🍋 DEVELOPMENT
prod:; @make .linn; echo 🦠 PRODUCTION
pro: .linn; @echo "⛺️ USE: prod"; make .linn; exit 69

:##
##: ----------------------------------------------------------------------------
##: MAIN °||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
##: ----------------------------------------------------------------------------

build::; @make .linn ## 🔘 docker build		(dev|prod) Dockerfile
build::
	cd ..; docker build -f ./docker/$(.P)Dockerfile -t $(NAME) .

build::; @make .linn
	@docker images --format "{{.ID}}\t{{.Size}}\t{{.Repository}}" | head -n 5

:##
##: --------------------------------------------------------

runa:; @make .linn ## 🐬 docker run attached		(dev|prod) Image
	docker run --rm -p $(PORT) --name $(NAME) $(NAME)

run:; @make .linn ## 🐬 docker run			(dev|prod) Image
	docker run --rm -d -p $(PORT) --name $(NAME) $(NAME)

:##
##: --------------------------------------------------------

log:; @make .linn ## 🐋 docker logs			(dev|prod) Container
	docker logs --follow $(NAME)

:##
##: --------------------------------------------------------

stop:; @make .linn ## 🐡 docker stop			(dev|prod) Container
	docker stop $(NAME) $(NAME)

.stopa:; @make .linn ## 🐡 docker stop all running
	docker stop $(shell docker ps -a -q)

:##
##: --------------------------------------------------------

rm:; @make .linn ## 🐙 docker rm			(dev|prod) Container
	docker rm $(NAME) --force

rmi:; @make .linn ## 🐙 docker rmi			(dev|prod) Image
	docker rmi $(NAME)

.rmid:; @make .linn ## 🐙 docker rmi dangling
	docker rmi $(docker images -f "dangling=true" -q)

:##
##: --------------------------------------------------------

.sh:; @make .linn ## 🐧 docker exec sh		(dev|prod) Container
	docker exec -it $(NAME) sh

bash:; @make .linn ## 🐧 docker exec bash		(dev|prod) Container
	docker exec -it $(NAME) bash

aux:; @make .linn ## 🐧 docker exec ps aux		(dev|prod) Container
	docker exec -it $(NAME) ps aux

ls:; @make .linn ## 🐧 docker exec ls -lA		(dev|prod) Container
	docker exec -it $(NAME) ls -lA

:##
:## ────────────────────────────────────────────────────────

re: ## 🐠 Build Results (ls) 		(dev|prod) @ temp
	@make build $(TG) NAME=1999.temp
	@-make run $(TG) NAME=1999.temp PORT=9999:8000
	@-make ls $(TG) NAME=1999.temp
	@-make stop $(TG) NAME=1999.temp
	@make rmi $(TG) NAME=1999.temp

.ret: ## 🐠 Build Results (test)	(dev|prod) @ temp
	@make build $(TG) NAME=1999.temp
	@-make run $(TG) NAME=1999.temp PORT=9999:8000
	@-make ls $(TG) NAME=1999.temp
	@-make test-t $(TG) NAME=1999.temp
	@-make stop $(TG) NAME=1999.temp
	@make rmi $(TG) NAME=1999.temp

:## --------------------------------------------------------

ifneq ($(TG),prod)

test: ## 🐠 Test Results		(.|dev) @ temp
	@make build $(TG) NAME=1999.temp
	@-make run $(TG) NAME=1999.temp PORT=9999:8000
	@-make test-c $(TG) NAME=1999.temp
	@-make test-n $(TG) NAME=1999.temp
	@-make stop $(TG) NAME=1999.temp
	@make rmi $(TG) NAME=1999.temp

else
test: .nt
endif

:## ────────────────────────────────────────────────────────
:##

ifneq ($(TG),prod)

test-t:; @make .linn ## 🐧 docker exec npm test	(.|dev)
	docker exec $(NAME) npm test

test-c:; @make .linn ## 🐧 docker exec npm test:c	(.|dev)
	docker exec $(NAME) npm run test:c

test-n:; @make .linn ## 🐧 docker exec npm newman	(.|dev)
	docker exec $(NAME) npm run newman

else
test-t: .nt
test-c: .nt
test-n: .nt
endif

:##
##: --------------------------------------------------------

ps: .linn ## 🔘 List of Containers ----------------------------------
	@docker ps -a --format \
	"{{.ID}}\t{{.Names}}\t{{.Status}}" | head -n 10

li: .linn ## 🔘 List of Images --------------------------------------
	@docker images --format \
	"{{.ID}}\t{{.Size}}\t{{.Repository}}" | head -n 10

he: .linn # 🔘 Usage Help ------------------------------------------
	@printf "\n\
	%18s#: aliases\n\n\
	%18s───────────────────────────────────────────────────────\n\
	%18salias l='ls -l'\n\
	%18salias ll='ls -lA'\n\
	%18salias lr='ls -lAR'\n\
	%18salias px='ps aux'\n\
	%18salias qq='exit'\n\
	"

##: EMPTY TARGETS
##: ----------------------------------------------------------------------------
.et: .linn
	@printf "⛺️ EMPTY TARGET ⛺️ make \033[33m(dev|prod)\033[0m <target>\n"

.nt: .linn
	@printf "⛺️ TESTS NOT AVAILABLE ⛺️ make \033[33m(prod)\033[0m test\n"

##: ----------------------------------------------------------------------------
##: DECORATION °-)) °|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
##: ----------------------------------------------------------------------------
.nl:; @printf "\n"
.line:; @for i in {1..73}; do printf "─"; done;
.linn:; @make .line .nl

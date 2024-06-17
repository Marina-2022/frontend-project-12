install:
		npm ci

start-frontend:
		make -C frontend start

start-backend:
		npm start

start:
	make start-backend & make start-frontend

build:
		rm -rf frontend/build
		npm run postinstall
		npm run build 

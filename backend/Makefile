build-app-video-dashboard:
	docker build . -t video-dashboard-rest-api-image -f Dockerfile.production

run-app-video-dashboard:
	docker-compose -f docker-compose-video-dashboard.yml up -d

stop-app-video-dashboard:
	docker-compose -f docker-compose-video-dashboard.yml down

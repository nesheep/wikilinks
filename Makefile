.PHONY: build zip

build:
	cd cmd/lambda && GOOS=linux GOARCH=amd64 go build -ldflags="-s -w" -trimpath

zip: build
	zip -j cmd/lambda/lambda.zip cmd/lambda/lambda

package main

import (
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/awslabs/aws-lambda-go-api-proxy/httpadapter"
	"github.com/nesheep/wikilinks/config"
	"github.com/nesheep/wikilinks/server"
)

var (
	cfg            *config.Config
	handlerAdapter *httpadapter.HandlerAdapter
)

func init() {
	cfg, _ = config.New()
	mux := server.NewMux(cfg.Env)
	handlerAdapter = httpadapter.New(mux)
}

func main() {
	lambda.Start(handlerAdapter.ProxyWithContext)
}

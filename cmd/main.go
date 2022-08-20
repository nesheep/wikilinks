package main

import (
	"context"
	"fmt"
	"log"
	"net"

	"github.com/nesheep/wikilinks/config"
	"github.com/nesheep/wikilinks/server"
)

func main() {
	if err := run(context.Background()); err != nil {
		log.Printf("failed to terminate server: %v", err)
	}
}

func run(ctx context.Context) error {
	cfg, err := config.New()
	if err != nil {
		return err
	}

	l, err := net.Listen("tcp", fmt.Sprintf(":%d", cfg.Port))
	if err != nil {
		log.Fatalf("failed to listen port %d: %v", cfg.Port, err)
	}

	url := fmt.Sprintf("http://%s", l.Addr().String())
	log.Printf("start with: %v", url)

	mux := server.NewMux(cfg)
	s := server.NewServer(mux, l)

	return s.Run(ctx)
}

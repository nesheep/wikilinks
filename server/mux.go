package server

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/nesheep/wikilinks/config"
	"github.com/nesheep/wikilinks/frontend"
	"github.com/nesheep/wikilinks/infra/client"
	"github.com/nesheep/wikilinks/wiki"
)

func NewMux(cfg *config.Config) http.Handler {
	mux := chi.NewMux()

	mux.Use(middleware.Logger)
	mux.Use(middleware.Recoverer)
	mux.Use(middleware.URLFormat)

	if cfg.Env == "dev" {
		mux.Use(cors.Handler(cors.Options{
			AllowedOrigins:   []string{"*"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Content-Type"},
			AllowCredentials: false,
		}))
	}

	mux.Route("/api", func(ar chi.Router) {
		ar.Route("/wikis", func(r chi.Router) {
			cli := client.NewClient()
			st := wiki.NewStore(cli)
			sv := wiki.NewService(st)
			h := wiki.NewHandler(sv)
			r.Get("/", h.GetLinks)
			r.Get("/{id}", h.GetOne)
		})
	})

	fh := frontend.NewHandler()
	mux.NotFound(fh.ServeHTTP)

	return mux
}

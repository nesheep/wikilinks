package server

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/nesheep/wikilinks/config"
	"github.com/nesheep/wikilinks/frontend"
	"github.com/nesheep/wikilinks/wiki"
)

func NewRouter(cfg *config.Config) http.Handler {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.URLFormat)

	if cfg.Env == "dev" {
		r.Use(cors.Handler(cors.Options{
			AllowedOrigins:   []string{"*"},
			AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
			AllowedHeaders:   []string{"Accept", "Content-Type"},
			AllowCredentials: false,
		}))
	}

	r.Route("/api", func(ar chi.Router) {
		ar.Route("/wikis", func(wr chi.Router) {
			st := wiki.NewStore()
			sv := wiki.NewService(st)
			h := wiki.NewHandler(sv)
			wr.Get("/", h.GetLinks)
			wr.Get("/{id}", h.GetOne)
		})
	})

	fh := frontend.NewHandler()
	r.NotFound(fh.ServeHTTP)

	return r
}

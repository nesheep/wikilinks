package wiki

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/nesheep/wikilinks/responder"
)

type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) GetLinks(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id := r.URL.Query().Get("id")
	if id == "" {
		responder.BadRequest(ctx, w)
		return
	}

	wikiLinks, err := h.service.GetLinks(ctx, id)
	if err != nil {
		log.Println(err)
		responder.InternalServerError(ctx, w)
		return
	}

	responder.JSON(ctx, w, &wikiLinks, http.StatusOK)
}

func (h *Handler) GetOne(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id := chi.URLParam(r, "id")
	if id == "" {
		responder.BadRequest(ctx, w)
		return
	}

	wiki, err := h.service.GetOne(ctx, id)
	if err != nil {
		log.Println(err)
		responder.InternalServerError(ctx, w)
		return
	}

	responder.JSON(ctx, w, &wiki, http.StatusOK)
}

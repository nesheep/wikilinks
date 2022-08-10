package wiki

import (
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/nesheep/wikilinks/responder"
)

type Handler struct {
	store Store
}

func NewHandler(store Store) *Handler {
	return &Handler{store: store}
}

func (h *Handler) GetLinks(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	id := r.URL.Query().Get("id")
	if id == "" {
		responder.BadRequest(ctx, w)
		return
	}

	wikiLinks, err := h.store.GetLinks(ctx, id)
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

	wiki, err := h.store.GetOne(ctx, id)
	if err != nil {
		log.Println(err)
		responder.InternalServerError(ctx, w)
		return
	}

	responder.JSON(ctx, w, &wiki, http.StatusOK)
}

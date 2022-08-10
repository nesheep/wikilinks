package frontend

import (
	"context"
	"embed"
	"errors"
	"io"
	"mime"
	"net/http"
	"path"
	"path/filepath"

	"github.com/nesheep/wikilinks/responder"
)

//go:embed build/*
var assets embed.FS

type Handler struct{}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	err := h.tryRead(ctx, r.URL.Path, w)
	if err == nil {
		return
	}

	err = h.tryRead(ctx, "index.html", w)
	if err != nil {
		responder.NotFound(ctx, w)
	}
}

func (h *Handler) tryRead(ctx context.Context, requestPath string, w http.ResponseWriter) error {
	file, err := assets.Open(path.Join("build", requestPath))
	if err != nil {
		return err
	}
	defer file.Close()

	stat, err := file.Stat()
	if err != nil {
		return err
	}

	if stat.IsDir() {
		return errors.New("path is dir")
	}

	ext := filepath.Ext(requestPath)
	var contentType string
	if m := mime.TypeByExtension(ext); m != "" {
		contentType = m
	} else {
		contentType = "application/octet-stream"
	}

	w.Header().Set("Content-Type", contentType)
	io.Copy(w, file)

	return nil
}

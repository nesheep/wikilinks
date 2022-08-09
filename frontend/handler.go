package frontend

import (
	"embed"
	"errors"
	"io"
	"mime"
	"net/http"
	"path"
	"path/filepath"
)

//go:embed build/*
var assets embed.FS

type Handler struct{}

func NewHandler() *Handler {
	return &Handler{}
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	err := h.tryRead(r.URL.Path, w)
	if err == nil {
		return
	}

	err = h.tryRead("index.html", w)
	if err != nil {
		panic(err)
	}
}

func (h *Handler) tryRead(requestPath string, w http.ResponseWriter) error {
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

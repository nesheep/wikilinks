package responder

import (
	"context"
	"net/http"
)

type ErrorResponse struct {
	Message string   `json:"message"`
	Details []string `json:"details,omitempty"`
}

func NotFound(ctx context.Context, w http.ResponseWriter) {
	fromStatus(ctx, w, http.StatusNotFound)
}

func BadRequest(ctx context.Context, w http.ResponseWriter) {
	fromStatus(ctx, w, http.StatusBadRequest)
}

func InternalServerError(ctx context.Context, w http.ResponseWriter) {
	fromStatus(ctx, w, http.StatusInternalServerError)
}

func fromStatus(ctx context.Context, w http.ResponseWriter, status int) {
	JSON(ctx, w, ErrorResponse{Message: http.StatusText(status)}, status)
}

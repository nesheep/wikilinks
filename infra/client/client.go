package client

import (
	"net/http"

	"github.com/hashicorp/go-retryablehttp"
)

func NewClient() *http.Client {
	rc := retryablehttp.NewClient()
	rc.RetryMax = 2
	return rc.StandardClient()
}

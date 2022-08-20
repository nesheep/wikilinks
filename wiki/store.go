package wiki

import (
	"context"
	"encoding/json"
	"net/http"
	"net/url"
)

type store struct{}

type Store interface {
	GetLinks(ctx context.Context, title string, cont string) (*WikiLinksRaw, error)
	GetOne(ctx context.Context, id string) (*WikiRaw, error)
}

func NewStore() Store {
	return &store{}
}

func (s *store) GetLinks(ctx context.Context, title string, cont string) (*WikiLinksRaw, error) {
	params := map[string]string{
		"generator":    "links",
		"gplnamespace": "0",
		"gpllimit":     "25",
		"titles":       title,
	}
	if cont != "" {
		params["gplcontinue"] = cont
	}
	u, err := s.buildWikiURL(params)
	if err != nil {
		return nil, err
	}

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var wikiLinksRaw WikiLinksRaw
	if err := json.NewDecoder(resp.Body).Decode(&wikiLinksRaw); err != nil {
		return nil, err
	}

	return &wikiLinksRaw, nil
}

func (s *store) GetOne(ctx context.Context, id string) (*WikiRaw, error) {
	params := map[string]string{
		"prop":        "extracts|pageimages",
		"exsentences": "10",
		"exintro":     "1",
		"explaintext": "1",
		"piprop":      "original",
		"pageids":     id,
	}
	u, err := s.buildWikiURL(params)
	if err != nil {
		return nil, err
	}

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var wikiRaw WikiRaw
	if err := json.NewDecoder(resp.Body).Decode(&wikiRaw); err != nil {
		return nil, err
	}

	return &wikiRaw, nil
}

func (s store) buildWikiURL(params map[string]string) (*url.URL, error) {
	endpoint := "https://ja.wikipedia.org/w/api.php"
	u, err := url.Parse(endpoint)
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Set("action", "query")
	q.Set("format", "json")
	for k, v := range params {
		q.Set(k, v)
	}
	u.RawQuery = q.Encode()

	return u, nil
}

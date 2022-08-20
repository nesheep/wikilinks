package wiki

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

type store struct{}

type Store interface {
	GetLinks(context.Context, string) (*WikiLinks, error)
	GetOne(context.Context, string) (*Wiki, error)
}

func NewStore() Store {
	return &store{}
}

func (s *store) GetLinks(ctx context.Context, id string) (*WikiLinks, error) {
	titleCont := strings.Split(id, "||||")
	title := titleCont[0]
	var cont string
	if len(titleCont) > 1 {
		cont = titleCont[1]
	}

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

	items := []*WikiLinksItem{}
	for _, v := range wikiLinksRaw.Query.Pages {
		if v.Missing == nil {
			items = append(items, NewWikiLinksItem(strconv.Itoa(v.Id), v.Title))
		}
	}

	wikiLinks := NewWikiLinks(id, title, items, wikiLinksRaw.Continue.Gplcontinue)
	return wikiLinks, nil
}

func (s *store) GetOne(ctx context.Context, id string) (*Wiki, error) {
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

	page, ok := wikiRaw.Query.Pages[id]
	if !ok {
		return nil, fmt.Errorf("failed to get: %s", id)
	}

	wiki := NewWiki(strconv.Itoa(page.Id), page.Title, page.Extract, page.Image.Source)
	return wiki, nil
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

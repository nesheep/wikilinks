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

var endpoint = "https://ja.wikipedia.org/w/api.php"

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

	u, err := url.Parse(endpoint)
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Set("action", "query")
	q.Set("format", "json")
	q.Set("generator", "links")
	q.Set("gplnamespace", "0")
	q.Set("gpllimit", "25")
	q.Set("titles", title)
	if cont != "" {
		q.Set("gplcontinue", cont)
	}
	u.RawQuery = q.Encode()

	resp, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	var wikiLinksRaw WikiLinksRaw
	if err := json.NewDecoder(resp.Body).Decode(&wikiLinksRaw); err != nil {
		return nil, err
	}

	items := []WikiLinksItem{}
	for _, v := range wikiLinksRaw.Query.Pages {
		if v.Missing == nil {
			items = append(items, WikiLinksItem{
				Id:    strconv.FormatInt(int64(v.Id), 10),
				Title: v.Title,
			})
		}
	}

	wikilinks := &WikiLinks{
		Id:    id,
		Title: title,
		Items: items,
		Next:  wikiLinksRaw.Continue.Gplcontinue,
	}

	return wikilinks, nil
}

func (s *store) GetOne(ctx context.Context, id string) (*Wiki, error) {
	u, err := url.Parse(endpoint)
	if err != nil {
		return nil, err
	}

	q := u.Query()
	q.Set("action", "query")
	q.Set("format", "json")
	q.Set("prop", "extracts|pageimages")
	q.Set("exsentences", "10")
	q.Set("exintro", "1")
	q.Set("explaintext", "1")
	q.Set("piprop", "original")
	q.Set("pageids", id)
	u.RawQuery = q.Encode()

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

	wiki := &Wiki{
		Id:      strconv.FormatInt(int64(page.Id), 10),
		Title:   page.Title,
		Extract: page.Extract,
		Image:   page.Image.Source,
	}

	return wiki, nil
}

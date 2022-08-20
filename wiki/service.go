package wiki

import (
	"context"
	"fmt"
	"strconv"
	"strings"
)

type service struct {
	store Store
}

type Service interface {
	GetLinks(ctx context.Context, id string) (*WikiLinks, error)
	GetOne(ctx context.Context, id string) (*Wiki, error)
}

func NewService(store Store) Service {
	return &service{store: store}
}

func (s *service) GetLinks(ctx context.Context, id string) (*WikiLinks, error) {
	titleCont := strings.Split(id, "||||")
	title := titleCont[0]
	var cont string
	if len(titleCont) > 1 {
		cont = titleCont[1]
	}

	wikiLinksRaw, err := s.store.GetLinks(ctx, title, cont)
	if err != nil {
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

func (s *service) GetOne(ctx context.Context, id string) (*Wiki, error) {
	wikiRaw, err := s.store.GetOne(ctx, id)
	if err != nil {
		return nil, err
	}

	page, ok := wikiRaw.Query.Pages[id]
	if !ok {
		return nil, fmt.Errorf("failed to get: %s", id)
	}

	wiki := NewWiki(strconv.Itoa(page.Id), page.Title, page.Extract, page.Image.Source)
	return wiki, nil
}

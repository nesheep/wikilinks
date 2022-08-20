package wiki

// WikiLinks is the struct for a response of GetLinks request.
type WikiLinks struct {
	Id    string           `json:"id"`
	Title string           `json:"title"`
	Items []*WikiLinksItem `json:"items"`
	Next  string           `json:"next"`
}

func NewWikiLinks(id string, title string, items []*WikiLinksItem, next string) *WikiLinks {
	return &WikiLinks{
		Id:    id,
		Title: title,
		Items: items,
		Next:  next,
	}
}

type WikiLinksItem struct {
	Id    string `json:"id"`
	Title string `json:"title"`
}

func NewWikiLinksItem(id, title string) *WikiLinksItem {
	return &WikiLinksItem{
		Id:    id,
		Title: title,
	}
}

// Wiki is the struct for a response of GetOne request.
type Wiki struct {
	Id      string `json:"id"`
	Title   string `json:"title"`
	Extract string `json:"extract"`
	Image   string `json:"image"`
}

func NewWiki(id, title, extract, image string) *Wiki {
	return &Wiki{
		Id:      id,
		Title:   title,
		Extract: extract,
		Image:   image,
	}
}

// WikiRaw is the struct for MediaWikiApi.
// e.g. https://ja.wikipedia.org/w/api.php?titles=%E3%83%88%E3%83%9E%E3%83%88&generator=links&gplnamespace=0&gpllimit=25&action=query&format=json
type WikiLinksRaw struct {
	Continue WikiLinksRawContinue `json:"continue"`
	Query    WikiLinksRawQuery    `json:"query"`
}

type WikiLinksRawContinue struct {
	Gplcontinue string `json:"gplcontinue"`
}

type WikiLinksRawQuery struct {
	Pages map[string]WikiLinksRawPage `json:"pages"`
}

type WikiLinksRawPage struct {
	Id      int     `json:"pageid"`
	Title   string  `json:"title"`
	Missing *string `json:"missing"`
}

// WikiRaw is the struct for MediaWikiApi.
// e.g. https://ja.wikipedia.org/w/api.php?prop=extracts%7Cpageimages&pageids=902&exsentences=10&exintro=1&explaintext=1&piprop=original&action=query&format=json
type WikiRaw struct {
	Query WikiRawQuery `json:"query"`
}

type WikiRawQuery struct {
	Pages map[string]WikiRawPage `json:"pages"`
}

type WikiRawPage struct {
	Id      int          `json:"pageid"`
	Title   string       `json:"title"`
	Extract string       `json:"extract"`
	Image   WikiRawImage `json:"original"`
}

type WikiRawImage struct {
	Source string `json:"source"`
	Width  int    `json:"width"`
	Height int    `json:"height"`
}

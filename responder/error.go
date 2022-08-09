package responder

var NotFound = Error{Message: "not found"}

type Error struct {
	Message string   `json:"message"`
	Details []string `json:"details,omitempty"`
}

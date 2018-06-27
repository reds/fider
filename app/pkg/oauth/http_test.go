package oauth_test

import (
	"testing"

	. "github.com/getfider/fider/app/pkg/assert"
	"github.com/getfider/fider/app/pkg/oauth"
)

func TestGetAuthURL_Facebook(t *testing.T) {
	RegisterT(t)

	svc := &oauth.HTTPService{}
	authURL := svc.GetAuthURL("http://login.test.fider.io:3000", oauth.FacebookProvider, "")

	Expect(authURL).Equals("https://www.facebook.com/dialog/oauth?client_id=&redirect_uri=http%3A%2F%2Flogin.test.fider.io%3A3000%2Foauth%2Ffacebook%2Fcallback&response_type=code&scope=public_profile+email&state=")
}

func TestGetAuthURL_Google(t *testing.T) {
	RegisterT(t)

	svc := &oauth.HTTPService{}
	authURL := svc.GetAuthURL("http://login.test.fider.io:3000", oauth.GoogleProvider, "")

	Expect(authURL).Equals("https://accounts.google.com/o/oauth2/auth?client_id=&redirect_uri=http%3A%2F%2Flogin.test.fider.io%3A3000%2Foauth%2Fgoogle%2Fcallback&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&state=")
}

func TestGetAuthURL_GitHub(t *testing.T) {
	RegisterT(t)

	svc := &oauth.HTTPService{}
	authURL := svc.GetAuthURL("http://login.test.fider.io:3000", oauth.GitHubProvider, "")

	Expect(authURL).Equals("https://github.com/login/oauth/authorize?client_id=&redirect_uri=http%3A%2F%2Flogin.test.fider.io%3A3000%2Foauth%2Fgithub%2Fcallback&response_type=code&scope=user%3Aemail&state=")
}

func TestGetAuthURL_Decode(t *testing.T) {
	RegisterT(t)

	svc := &oauth.HTTPService{}
	_ = svc.GetAuthURL("http://login.test.fider.io:3000", oauth.DiscordProvider, "")
}

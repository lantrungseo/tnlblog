#tnlblog client

local-database : sessionStorage

  + accountType : fb/reddit
  + ${accountType}AccessToken
  + user_${key}

auth:
  facebook : just fbLogin()
  reddit: 
    + onclick : redditAuthRedirect()
    + componentDidMount (for redirect):
      let accessToken = redditGetAccessToken(hashvalue in url)
      redditLogin(accessToken)
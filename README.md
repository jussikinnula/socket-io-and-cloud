# Socket.io & Cloud

This is the code part used in my talk.

Talk slides can be found at: https://jussikinnula.github.io/socket-io-and-clouds-wunderdog-tekki-20170512

## Deploy to Heroku

```
heroku create --region eu mychat
heroku addons:create heroku-redis:hobby-dev
git push heroku master
```
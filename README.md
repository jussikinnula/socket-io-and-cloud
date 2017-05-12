# Socket.io & Cloud

This is the code part used in my talk.

## Deploy to Heroku

```
heroku create --region eu mychat
heroku addons:create heroku-redis:hobby-dev
git push heroku master
```
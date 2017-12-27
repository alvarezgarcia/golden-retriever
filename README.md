# golden-retriever

![demo](https://i.imgur.com/BJaKKyc.jpg)

## Description

golden-retriever is an app for Slack which aims to inform the price in bitcoin 
in dollars (as well as in pounds and euros).
Simply invoking the slash command / btc will allow access to this information

Because the results for currency conversions are acquired through a request to 
the CoinDesk endpoint API, a very simple cache was implemented.
If two requests are made in a time interval of less than 10 seconds, access to CoinDesk 
is avoided and a previously saved value is returned.

## Working demo

A slightly modified version is running in a Webtask function (Auth0).

The POST endpoint for the `/btc` slash command is:
```
https://wt-2d0c1b127ddf2114db57608a0d9ef965-0.run.webtask.io/golden-retriever/api/btc
```

And finally the access through OAuth is (to be able to generate the "Add to Slack" button)
```
https://wt-2d0c1b127ddf2114db57608a0d9ef965-0.run.webtask.io/golden-retriever/oauth
```

## Setup

### Dependencies

```
npm i
```

### Environment variables

There is an example `.env` file, called `.env.sample` that has two required fields 
`SLACK_CLIENT_ID` and `SLACK_CLIENT_SECRET`.

The procedure for the app to work should be a copy of this file with the name .env 
and both variables should be filled with the values supplied by Slack at the moment of app creation.

In case the `.env` file does not exist or these two variables are not defined the application will not start.

## Testing

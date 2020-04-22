# golden-retriever

![demo](https://imgur.com/a/YWfUAHm)

## Description

golden-retriever is an app for Slack which aims to inform the price in bitcoin 
in dollars (as well as in pounds and euros).
Simply invoking the slash command `/btc` will allow access to this information

Because the results for currency conversions are acquired through a request to 
the CoinDesk endpoint API, a very simple cache was implemented.
If two requests are made in a time interval of less than 10 seconds, access to CoinDesk 
is avoided and a previously saved value is returned.

## Architecture

Due to Slack requirement to answer on a three-seconds window of time with a `200` status, each request is received, set a message on a Redis queue and answered with this `200`.
Later the `bitcoin-requester` service catch this message on the Redis queue, process it and send the response to client using the `response_url` parameter, that allows
responses for a period of 30 minutes.

## Setup

```
$ npm i
$ cp .env.sample .env
$ docker-compose up
```

Fill `.env` file with the specific values for `SLACK_CLIENT_ID` and `SLACK_CLIENT_SECRET` provided for Slack dashboard when app is created.

# Upcoming Gigs Image Generator

This project generates a poster image of upcoming gigs by fetching data from a Google Calendar API and taking a screenshot of a React component.

## Local Usage

### Setup
First, install the dependencies:

```bash
npm install
```

Before running the screenshot script, you need to set the Google API key in your environment variables:

```
cp .env.example .env.local
```

Then edit the `.env.local` file and add your Google API key.


### Generating the image
Run the server:

```bash
npm run dev
```

Then run the screenshot script:

```bash
npm run screenshot
```

## Production Usage

This project runs on a cron job in GitHub Actions. It generates the image once per week and uploads it to an S3 bucket.

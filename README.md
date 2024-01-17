# Charlie Challenge

<img src="_README.md/app.gif" alt="gif">

## Challenge Rules:

[[README](README.md) | [English](README.md) | [Portuguese](README.pt.md)]

## Brief Summary:

I had to use the browser to get the latitude and longitude, with [Open Cage API](https://api.opencagedata.com) I had to convert the coordenates to a city and state. From [Open Weather API](https://api.openweathermap.org) I had to call 2 APIs, one for the weather information and one for the forecast. The last API to be called was [Bing API](https://www.bing.com), that I had to extract a background image from there.

Depending on the temperature the data will have a blue color if it is cold, a red if it is hot and a yellow for a in between temperature.

It also needed to run with docker as it was about to go to production.

## Running Application:

### With Docker:

Open a terminal in the project root and run the following code:

```bash
docker build -t nome-da-sua-imagem .
```

After the image is built run the container with the following command:

```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_OPENWEATHER_API_KEY=Sua_API_key_do_OPENWEATHER -e NEXT_PUBLIC_OPENCAGE_API_KEY=Sua_API_key_do_OPENCAGE nome-da-sua-imagem
```

Just remenber you need to use the actual keys of each API.

### Without Docker:

I builted it using node version v20.10.0

For the first time runing it, create a .env.local file in the root with the following content (there are keys available in the challenge):

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=Your_API_key_from_OPENWEATHER
NEXT_PUBLIC_OPENCAGE_API_KEY=Your_API_key_from_OPENCAGE
```

The you need to run the following code in the folder of the project:

```bash
npm i
```

And finally:

```bash
npm run dev
```

# Charlie Challenge

<img src="_README.md/app.gif" alt="gif">

## Challenge Rules:

[[README](README.md) | [English](README.md) | [Portuguese](README.pt.md)]

## Brief Summary:

I had to use the browser to get the latitude and longitude, with [Open Cage API](https://api.opencagedata.com) I had to convert the coordenates to a city and state. From [Open Weather API](https://api.openweathermap.org) I had to call 2 APIs, one for the weather information and one for the forecast. The last API to be called was [Bing API](https://www.bing.com), that I had to extract a background image from there.

Depending on the temperature the data will have a blue color if it is cold, a red if it is hot and a yellow for a in between temperature.

It also needed to run with docker as it was about to go to production.

## Points Where the Challenge Could Improve:

Instead of a image as reference could be a Figma project, that would allow to have a better experience, I had to guess lot's of CSS coding that in Figma I could see the desire option and apply that to the project.

The collor pallette would also benefit from a Figma project, this point of the project seemed very important, but the colors itself were also a guess game, with it so important it could have been available. Not only Spaces and collor pallete could be improved, but font weight, font, svg sizes, etc.

One of the aspects of the challenge was also create a new branch where the challenge was available, but I hadn't access to the project so I couldn't do it, as the next best thing I created my own repository to support the project and worked on it here.

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

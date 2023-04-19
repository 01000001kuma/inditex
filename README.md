
# Prueba tecnica

Prueba front-end INDITEX


## Appendix

Esta prueba consiste en la creación de una mini-aplicación para escuchar podcasts
musicales.

La aplicación tendrá únicamente tres vistas:

1. Vista principal
2. Detalles de un podcast
3. Detalles de un capítulo de un podcast

## Author

- [Adrian Molina Illera](https://github.com/01000001kuma?tab=repositories)


## Tech Stack

**Client:** React, javascript, html, css



## API Reference

#### Get all items

```http
  https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Get item

```http
  https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |




## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Color Palette | rgb(178, 204, 247) |


## Screenshots

![App Screenshot](https://i.postimg.cc/sgbgdLNr/captura.png)


## Run Locally

Clone the project

```bash
  git clone https://github.com/01000001kuma/inditex
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Running Tests

To run tests with jest, run the following command

```bash
  npm run test
```


## 🚀 About Me
I am well-versed in many aspects of React development, from setting up the environment to creating components. I have also worked with HTML, CSS (SCSS, SaaS), SVG (elements and animations), JavaScript, and some backend technologies like NodeJS and Express. If your technologies match mine let me help you solve that problem.

Cultivating my creativity with interesting projects is essential. I'm highly organized and love working with clients and fulfilling their needs. I have a solid knowledge of the management, operation, logistics, and development of all activities related to e-commerce software companies and start-ups. 

Teamwork makes the dream work. 

I'm passionate about developing products and enhancing my creativity along the way. I would describe myself as an energetic and decisive person. In my professional career, I've been focused on evaluating operational needs in order to offer solutions to save costs and increase benefits and customer satisfaction.


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://adrianmol.netlify.app/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/adrian-molina/)


## Features

- Loading spinner
- Itunes api
- Audio player


## License

[MIT](https://choosealicense.com/licenses/mit/)


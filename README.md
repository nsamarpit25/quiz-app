# Quiz App

A modern quiz application built with Next.js.

## Features

-  Interactive quiz interface
-  Real-time scoring
-  Multiple quiz categories
-  Responsive design
-  User authentication
-  Score tracking

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your configuration.

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
quiz-app/
├── app/               # App router pages and layouts
├── components/        # Reusable components
├── lib/              # Utility functions
├── public/           # Static assets
└── styles/           # CSS styles
```

## Technologies Used

-  [Next.js](https://nextjs.org/)
-  [React](https://reactjs.org/)
-  [Tailwind CSS](https://tailwindcss.com/)
-  [TypeScript](https://www.typescriptlang.org/)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

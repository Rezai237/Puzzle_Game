# Telegram Puzzle Game

A modern, interactive puzzle game built with React and TypeScript, featuring:

- 🧩 Multiple difficulty levels
- 🏆 Achievement system
- 💰 Token economy
- 👥 Referral system
- 📊 Leaderboards
- 🎮 Daily tasks and rewards

## Features

- **Puzzle Game**: Classic sliding puzzle with multiple difficulty levels
- **Token System**: Earn tokens by completing puzzles and tasks
- **Achievements**: Unlock achievements and earn rewards
- **Referral System**: Invite friends and earn commission
- **Daily Tasks**: Complete daily tasks for bonus tokens
- **Leaderboards**: Compete with other players
- **Profile System**: Track your progress and stats

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Vite
- LibSQL/Turso (Database)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/telegram-puzzle-game.git
   ```

2. Install dependencies:
   ```bash
   cd telegram-puzzle-game
   npm install
   ```

3. Create a `.env` file with your database configuration:
   ```
   VITE_DATABASE_URL=your_database_url
   VITE_DATABASE_AUTH_TOKEN=your_auth_token
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup

1. Install the Drizzle CLI:
   ```bash
   npm install -g drizzle-kit
   ```

2. Push the database schema:
   ```bash
   npm run db:push
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
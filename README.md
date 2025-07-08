# Campus Interactive Map

An interactive map of your college campus built with React, Mapbox, and Vercel.

## Features

- 🗺️ Interactive Mapbox map with campus buildings
- 🔍 Search functionality for buildings
- 🏷️ Filter buildings by type (Academic, Student Life, Athletics, Dining)
- 📍 Clickable markers with detailed popups
- 📱 Responsive design for mobile and desktop
- 🧭 Navigation controls and geolocation
- 🎨 Color-coded building types with legend

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Mapbox account (free tier available)

## Setup Instructions

### 1. Get a Mapbox Access Token

1. Go to [Mapbox](https://account.mapbox.com/access-tokens/)
2. Create a free account or sign in
3. Create a new access token
4. Copy the token (you'll need it in the next step)

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp env.example .env
   ```

2. Edit `.env` and add your Mapbox access token:
   ```
   VITE_MAPBOX_ACCESS_TOKEN=your_actual_mapbox_token_here
   ```

### 3. Update Campus Data

1. Open `src/config/mapbox.js`
2. Update the campus coordinates to match your college location
3. Open `src/components/CampusMap.jsx`
4. Replace the sample building data with your actual campus buildings

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Customizing Your Campus Map

### Adding Buildings

Edit the `campusBuildings` array in `src/components/CampusMap.jsx`:

```javascript
const campusBuildings = [
  {
    id: 1,
    name: "Your Building Name",
    description: "Description of the building",
    coordinates: [longitude, latitude], // Replace with actual coordinates
    type: "academic", // Options: academic, student-life, athletics, dining
    hours: "8AM-10PM",
    image: "https://your-image-url.com/image.jpg"
  }
];
```

### Finding Coordinates

1. Go to Google Maps
2. Right-click on your campus location
3. Select "What's here?"
4. Copy the coordinates from the info panel

### Updating Campus Center

Edit `src/config/mapbox.js`:

```javascript
export const CAMPUS_CONFIG = {
  name: "Your College Name",
  center: {
    longitude: your_longitude,
    latitude: your_latitude
  }
};
```

## Deployment to Vercel

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Build the Project

```bash
npm run build
```

### 3. Deploy

```bash
vercel
```

### 4. Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add `VITE_MAPBOX_ACCESS_TOKEN` with your Mapbox token

## Project Structure

```
src/
├── components/
│   ├── CampusMap.jsx      # Main map component
│   └── CampusMap.css      # Map styles
├── config/
│   └── mapbox.js          # Configuration file
├── App.jsx                # Main app component
└── App.css               # App styles
```

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool
- **Mapbox GL JS** - Interactive maps
- **react-map-gl** - React wrapper for Mapbox
- **Vercel** - Deployment platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for your campus!

## Support

If you need help setting up your campus map, check out:
- [Mapbox Documentation](https://docs.mapbox.com/)
- [react-map-gl Documentation](https://visgl.github.io/react-map-gl/)
- [Vercel Documentation](https://vercel.com/docs)

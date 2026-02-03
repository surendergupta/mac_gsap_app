# Apple MacBook Pro M4 - High-Performance Web Experience Landing Page

## 1. Overview

The **mac_gsap_app** is a modern, immersive landing page built to showcase the MacBook Pro. It utilizes a "Scrollytelling" approach where the 3D model and UI elements respond dynamically to the user's scroll position.

### Key Technology Stack

- **Framework:** React 19 (Vite)
- **3D Engine:** React Three Fiber (R3F) & Three.js
- **Animation:** GSAP (GreenSock Animation Platform) with ScrollTrigger
- **State Management:** Zustand
- **Styling:** Tailwind CSS 4.0
- **Responsive Design:** React Responsive

---

## 2. Architecture & State Management

### Zustand Store (`/store/index.js`)

The application uses a centralized store to manage the 3D model's visual state across different sections.

- **`color`**: Handles the chassis color of the MacBook (e.g., Space Gray vs. Silver).
- **`scale`**: Manages the model size (toggling between 14" and 16" representations).
- **`texture`**: Stores the path for the video texture currently playing on the MacBook screen.

### Dependency Highlights

The project uses `@gsap/react` for safe hook-based animations and `@react-three/drei` for optimized 3D helpers like `useGLTF` and `useVideoTexture`.

---

## 3. Core Components

### `App.js`

The entry point that orchestrates the layout. It registers the `ScrollTrigger` plugin and stacks the functional sections of the page.

### `ProductViewer.jsx`

An interactive section allowing users to customize the MacBook.

- **Features**: Color switching and size toggling.
- **ModelSwitcher**: A custom logic component that handles the transition between the 14" and 16" GLTF models using GSAP opacity and position fades.

### `Features.jsx`

The "Scrollytelling" core.

- **ModelScroll**: Syncs the 3D model rotation and video texture swaps with the scroll progress.
- **Video Preloading**: Utilizes a `useEffect` to pre-load feature videos into the browser cache to ensure seamless texture switching during the scroll.

### `Performance.jsx`

Uses GSAP to create a masonry-style image entrance. On desktop, it calculates individual positions for performance-related hardware images based on scroll depth.

### `Showcase.jsx`

Features a "masking" animation where a video background is revealed behind a logo, scaled up as the user scrolls.

---

## 4. 3D Model Implementation

The application uses three primary GLTF models located in `/public/models/`:

1. **MacbookModel**: The main interactive model for the Features section.
2. **MacbookModel14 / 16**: Specific variants used in the Product Viewer.

### Texture Handling

```javascript
// Example from MacbookModel.jsx
const screen = useVideoTexture(texture);
// ...
<mesh geometry={nodes.Object_123.geometry}>
  <meshBasicMaterial map={screen} />
</mesh>;
```

The models use `useVideoTexture` to map dynamic MP4 files onto the screen geometry, allowing the "content" on the laptop to change based on the scroll trigger or user selection.

---

## 5. Animation Strategy

### ScrollTrigger Logic

The project follows a "Pin and Scrub" pattern:

- **Pinning**: The Canvas is pinned using `pin: true` so the 3D model stays in the viewport while text boxes scroll past.
- **Scrubbing**: `scrub: 1` links the animation progress directly to the scrollbar position, providing a smooth, reversible transition.

### Performance Optimizations

- **`useLayoutEffect`**: Used in `ModelSwitcher` to calculate initial positions before the browser paints, preventing "flashes" of unstyled content.
- **Mesh Traversal**: The models use `scene.traverse` to programmatically update material colors without needing to manually reference every sub-mesh.
- **Responsive Filtering**: Heavy 3D animations are modified or disabled for mobile devices using `useMediaQuery` to maintain 60fps.

---

## 6. Project Structure

```text
src/
├── components/        # UI & Section Components
│   ├── models/        # GLTF JSX Model Definitions
│   ├── three/         # Lighting & 3D Helpers
│   └── ...            # Navbar, Hero, Footer, etc.
├── store/             # Zustand State
├── constants/         # Content, Links, and Config
├── App.jsx            # Main Entry
└── main.jsx           # React Render

```

---

## 7. Setup & Installation

1. **Install Dependencies**:

```bash
npm install

```

2. **Development Mode**:

```bash
npm run dev

```

3. **Build for Production**:

```bash
npm run build

```

4. **Optimize**:

```bash
npx gltfjsx public/models/macbook.glb -T

```

> **Note**: Ensure all 3D assets (`.glb`) and video assets (`.mp4`) are placed in the `/public` folder as referenced in the components.

---

**End of Documentation**

Would you like me to generate a specific technical guide for the GSAP ScrollTrigger logic used in the `Features` component?

# 🤖 Robot Builder & 3D Simulator

> **Project Status:** Prototype / MVP in active development  
> **Purpose:** Browser-based robot construction, 3D visualization, and physics simulation.

**Robot Builder** is a web application that allows users to build modular robots and test them in a 3D physics environment.

Our core philosophy and long-term workflow is:  
`DESIGN → PROGRAM → SIMULATE → TEST`

---

## ✨ Current Features (MVP)

The project is currently in the MVP stage with the following functional features:

- **3D Robot Assembly:** Build robots using a library of predefined components (chassis, wheels, sensors, walls, generic geometries).
- **Transform Controls:** Translate and rotate components in a 3D viewport.
- **Project Management:** Save and open robot assemblies as `.json` files.
- **Physics Simulation:** Basic Rapier-powered simulation including:
  - Wheel motors and revolute joints.
  - Basic gravity, ground, and wall collisions.
  - Distance sensor raycasting (basic obstacle detection to stop motors).
- **Zustand State Management:** Centralized state handling for the editor and simulation.

> ⚠️ **Note:** Features like actual code execution, Blockly visual programming, complex parent-child local transforms, and realistic motor torques are _planned_ but not yet implemented.

---

## 🛠 Tech Stack

**Frontend:**

- Next.js 16.3.0 / React 19.2.8 (Server-Side Rendering disabled for 3D components)
- TypeScript 5
- Tailwind CSS 4 & Lucide React

**3D & Physics:**

- Three.js 0.182.x
- React Three Fiber 9.7.x / React Three Drei 10.7.x
- React Three Rapier (Physics engine) 2.2.x

**State Management:**

- Zustand 5.0.x
- UUID 14.x

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build
```

# 🏗 Architecture & Data Model

## The Golden Rule

The robot is represented by a stable domain model (**RobotPart**).  
The editor, 3D renderer, and physics engine simply consume this model via Zustand rather than independently maintaining their own versions.

## Core Data Model (RobotPart)

The source of truth for every component in the project.

```
interface RobotPart {
  id: string;
  type: PartType; // 'chassis', 'wheel', 'sensor', etc.
  name: string;
  position: [number, number, number]; // [x, y, z]
  rotation: [number, number, number]; // [x, y, z] in radians
  scale: [number, number, number];
  parentId: string | null;
  properties: Record<string, any>;
}
```

# ⚙️ State Management (`useRobotStore.ts`)

Zustand handles all global states:

- `mode`
- `parts`
- `selectedPartId`
- `transformMode`

👉 Never duplicate robot state in UI components.

---

# 🗺 Development Roadmap

The project will evolve incrementally through these phases:

## 1. Stabilize Editor

- Implement keyboard shortcuts
- Undo/redo functionality
- Real parent-child transform hierarchy
- Typed property panels

## 2. Improve Physics

- Add realistic friction
- Differential drive
- Center of mass
- Physical attachments

## 3. Sensor System

- Expand from simple raycasts
- Field of View (FOV)
- Line sensors
- Camera abstractions

## 4. Programming & Visual Blocks

- Sandboxed execution environment
- Robot API
- Blockly integration

## 5. Advanced Simulator & Platform

- Custom environments
- Cloud saves
- User accounts
- AI integration

---

# 🤖 Instructions for AI Agents & Contributors

If you are an AI assistant continuing development on this project, strictly follow these rules:

## Read Existing Architecture First

Always inspect:

- `src/types/robot.ts`
- `src/lib/catalog.ts`
- `useRobotStore.ts`
- Core 3D files

## Incremental Changes

- Do not rewrite the entire 3D architecture.
- Identify the smallest change needed.
- Preserve existing behaviors.

## Keep Separation of Concerns

- **UI → Zustand → Domain Model → Simulation System**
- Do not put complex physics logic inside UI sidebars.

## Preserve JSON Compatibility

- Current schema version: **1**
- If modifying schema, implement migration logic.
- Do not break old `.json` saves.

## Beware of Three.js & Physics Remounts

- Modifying how components mount can reset Rapier physics bodies.
- Be careful with transforms, collision groups, and joint references.
  - `0 = ground`
  - `1 = chassis`
  - `2 = wheels`
  - `3 = walls`
  - `4 = sensors`

## Radians, not Degrees

- Rotations are stored as **Euler radians**.
- Convert to degrees only at the UI boundary.

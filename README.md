# 🤖 RoboSim3D - Robot Builder & 3D Physics Simulator

Ứng dụng web thiết kế và mô phỏng robot modular trực quan trên không gian 3D kết hợp công cụ vật lý thời gian thực.

---

## 📍 Project Status

**Current phase:** Core Simulation

### ✅ Completed

- 3D Robot Builder & Component Library
- Translate / Rotate bằng Gizmo và Properties Panel
- Robot Data Model & Robot Tree
- Rapier Physics: Gravity, Friction, Collision
- Wheel Motor & Revolute Joint
- Distance Sensor & Automatic Brake
- Simulation Transport: Run / Pause / Step / Reset / Stop
- Simulation State & Fixed Timestep (60Hz)
- Real-time Simulation HUD & Telemetry
- Debug Mode: Sensor Ray / Simulation Data

### 🚧 Next

- Independent Motor Control
- Multiple Sensor System
- Environment Editor
- Robot Programming API
- Command / Script System

---

## ✨ Tính năng chính

### 3D Robot Builder

- Thư viện linh kiện: Chassis, Wheel, Distance Sensor, Wall, Box.
- Di chuyển và xoay linh kiện trong không gian 3D.
- Robot Tree và Properties Panel.

### 3D Physics Simulator

- Rapier Physics với Gravity, Friction và Collision.
- Wheel Motor sử dụng Revolute Joint.
- Distance Sensor sử dụng Raycasting.
- Cơ chế phanh tự động khi phát hiện vật cản.
- Fixed timestep simulation với Run / Pause / Step / Reset / Stop.
- Simulation HUD hiển thị telemetry realtime.
- Debug mode hỗ trợ quan sát Sensor Ray và simulation state.

### Project Management

- Export / Import robot dưới dạng `.json`.
- Schema version hiện tại: v1.

---

## 🛠 Công nghệ

- **Frontend:** Next.js 16, React 19, TypeScript
- **3D & Physics:** Three.js, React Three Fiber, Drei, React Three Rapier
- **State:** Zustand
- **UI:** Tailwind CSS 4, Lucide React

---

## 🏗 Architecture

```text
UI & Editor
│
│ Robot Definition
▼
Simulation Core
│
│ Fixed Timestep 60Hz
▼
Physics & Simulation
│
├── Rapier Physics
├── Motors
├── Sensors
└── Collision
│
▼
Simulation State
│
├── Robot State
├── Motor State
└── Sensor State
│
▼
3D Renderer + Telemetry
```

**Data Separation**

- Zustand: Robot design state.
- SimulationState: Runtime simulation state.
- Không cập nhật Zustand trực tiếp trong physics loop 60Hz.

---

## 📁 Project Structure

```text
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page (SSR, giới thiệu nền tảng)
│   ├── builder/page.tsx          # 3D Robot Builder (Desktop) & Fallback (Mobile)
│   └── simulator/page.tsx
│
├── components/
│   ├── builder/
│   │   ├── 3d/                   # Thành phần 3D (React Three Fiber & Rapier)
│   │   │   ├── Scene3D.tsx       # Khởi tạo Canvas, ánh sáng, mặt đất & Physics
│   │   │   ├── RobotAssembly.tsx # Lắp ráp các khối linh kiện 3D của Robot
│   │   │   ├── EditorGizmo.tsx   # Trục toạ độ Gizmo (Translate / Rotate)
│   │   │   ├── SimulatedWheel3D.tsx # Bánh xe mô phỏng khớp quay RevoluteJoint
│   │   │   └── parts/            # Các linh kiện 3D: Chassis3D, Wheel3D, Sensor3D, Box3D
│   │   │
│   │   └── editor/               # Giao diện điều khiển & Bảng công cụ
│   │       ├── Topbar.tsx        # Thanh menu trên: Lưu/Mở file .json, đổi tên dự án
│   │       ├── SidebarLeft.tsx   # Thư viện linh kiện kéo thả (Component Library)
│   │       ├── SidebarRight.tsx  # Cây phân cấp linh kiện (RobotTree) & Thuộc tính (Properties)
│   │       ├── Viewport.tsx      # Khung nhìn chính chứa Canvas 3D & nút công cụ
│   │       ├── SimulationHud.tsx # HUD hiển thị dữ liệu telemetry viễn trắc thời gian thực
│   │       └── SimulationTransport.tsx # Bộ nút Play, Pause, Step, Reset, Stop
│   │
│   └── honepage/                 # Components trang chủ: Header, CodeIdePreview
│
├── lib/
│   └── catalog.ts                # Thông số kích thước, màu sắc & vật lý mặc định của linh kiện
│
├── simulation/                   # Lõi mô phỏng vật lý & Trạng thái độc lập
│   ├── Simulation.ts             # Session Controller, bộ đếm thời gian cố định (Fixed timestep)
│   ├── state/
│   │   ├── SimulationState.ts    # Lưu trữ snapshot động (BodyState, SensorReading, MotorCommand)
│   │   └── types.ts              # Định nghĩa kiểu dữ liệu cho Simulation State
│   ├── bridge/
│   │   ├── SimulationStepper.tsx # Kích hoạt physics step theo nhịp Simulation tick
│   │   └── usePublishRigidBody.ts# Hook đồng bộ dữ liệu từ Rapier sang SimulationState
│   ├── useSimulation.ts          # Các React Hooks: useSimulationWorld, useSimulationStatus
│   └── session.ts                # Quản lý vòng đời khởi tạo, tạm dừng và làm mới mô phỏng
│
├── store/
│   └── useRobotStore.ts          # Zustand store: quản lý dữ liệu thiết kế robot (RobotPart[])
│
└── types/
    └── robot.ts                  # Interface định nghĩa RobotPart, CatalogPart, Vector3D
```

---

## 🔑 Nguyên tắc thiết kế & Lưu ý cho Developer (Developer Guidelines)

1. **Ranh giới dữ liệu (Separation of Concerns):**
   - Dữ liệu thiết kế tĩnh (linh kiện, màu sắc, vị trí ban đầu) được quản lý trong **Zustand** (`useRobotStore`).
   - Dữ liệu động khi mô phỏng (tọa độ di chuyển, vận tốc, khoảng cách tia laser, tốc độ motor) do **SimulationState** quản lý.
   - _Không gọi `set` trên Zustand bên trong vòng lặp vật lý 60Hz_ để tránh gây giật lag và re-render không cần thiết.

2. **Đơn vị góc quay (Rotation):**
   - Mọi góc quay trong domain model (`RobotPart.rotation`) được lưu bằng **Radian (Euler)**. Chỉ chuyển đổi sang độ (°/degrees) khi hiển thị trên giao diện người dùng.

3. **Cơ chế Va chạm (Collision Groups):**
   - `0`: Mặt sàn (Ground)
   - `1`: Khung xe (Chassis)
   - `2`: Bánh xe (Wheels)
   - `3`: Tường chắn & Vật cản (Walls / Obstacles)
   - `4`: Tia cảm biến (Sensor Raycast)

4. **Tương thích file JSON:**
   - Phiên bản schema hiện tại là `version: 1`. Đảm bảo giữ đúng định dạng khi bổ sung thuộc tính mới cho linh kiện để không làm hỏng các bản lưu cũ.

---

## 🚀 Development

- `npm install`
- `npm run dev`  
  Development server: http://localhost:3000
- `npm run build`

---

## 🗺 Roadmap

### ✅ Hoàn thành

- Robot Builder
- Robot Data Model
- Physics Simulation
- Motor & Sensor
- Simulation State
- Telemetry & Debug

### 🔨 Đang phát triển

- Motor Control
- Sensor System
- Environment Editor
- Robot Programming
- Challenge System

### 🔮 Tương lai

- Autonomous Robot
- Advanced Robotics
- AI Robot

# 🤖 RoboSim3D - Robot Builder & 3D Physics Simulator

Ứng dụng web thiết kế và mô phỏng robot modular trực quan trên không gian 3D kết hợp công cụ vật lý thời gian thực.

---

## ✨ Tính năng chính

- **3D Robot Builder:**
  - Thư viện linh kiện: Chassis (khung gầm), Wheel (bánh xe), Distance Sensor (cảm biến khoảng cách), Wall (tường chắn), Box.
  - Công cụ căn chỉnh không gian 3D: Di chuyển (Translate) và Xoay (Rotate) linh kiện trực quan với Gizmo.
  - Cây phân cấp linh kiện (Robot Tree) và bảng cấu hình thông số (Properties Panel).
- **Mô phỏng Vật lý Thời gian thực (Rapier Physics):**
  - Động cơ bánh xe (Revolute Joints & Motor Velocity).
  - Tác động trọng lực, ma sát và va chạm vật cản/mặt sàn.
  - Cảm biến khoảng cách (Raycasting) quét vật cản và kích hoạt cơ chế phanh an toàn.
  - Bộ điều khiển mô phỏng (Simulation Transport): Run, Pause, Step từng tick, Reset, Stop.
  - Simulation HUD hiển thị dữ liệu telemetry thời gian thực (vị trí chassis, khoảng cách cảm biến, tốc độ động cơ).
- **Quản lý Dự án:** Lưu (Export) và nạp lại (Import) bản thiết kế robot dưới dạng file `.json`.

---

## 🛠 Công nghệ sử dụng

- **Frontend Core:** [Next.js 16](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **3D & Physics Engine:** [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei), [@react-three/rapier](https://github.com/pmndrs/react-three-rapier)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **UI & Styling:** [Tailwind CSS 4](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)

---

## 🏗 Kiến trúc & Luồng dữ liệu (Architecture & Data Flow)

Dự án được thiết kế theo mô hình phân tách tầng rõ ràng nhằm đảm bảo hiệu năng 60 FPS và dễ dàng mở rộng:

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. UI & Editor Layer (Zustand: useRobotStore)              │
│    - Quản lý danh sách RobotPart, mode (Build/Simulate),   │
│      selectedPartId, transformMode                         │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Hydrate khi bắt đầu mô phỏng)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Simulation Core (Simulation.ts & Clock Loop)             │
│    - Quản lý đồng hồ thời gian thực (Fixed timestep dt=1/60)│
│    - Session Lifecycle: start, pause, resume, step, reset   │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Tick 60Hz)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Physics & Bridge Layer (Rapier + SimulationState)        │
│    - SimulationStepper: Điều phối bước chạy vật lý Rapier   │
│    - usePublishRigidBody: Đồng bộ vị trí & vận tốc          │
│    - Sensor3D: Raycasting phát hiện vật cản & kích hoạt     │
│      tự động phanh (robotBlocked)                           │
│    - SimulatedWheel3D: Điều khiển mô-men & vận tốc động cơ  │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Broadcast World Snapshot)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. Rendering & Telemetry Layer                              │
│    - Three.js Viewport: Render chuyển động 3D               │
│    - Simulation HUD: Hiển thị t, step, lidar, motor speed   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Cấu trúc thư mục & Giải thích chi tiết

```text
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page (SSR, giới thiệu nền tảng)
│   ├── builder/page.tsx          # 3D Robot Builder (Desktop) & Fallback (Mobile)
│   └── simulator/page.tsx        # Điều hướng nhanh tới Builder
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

## 🚀 Cài đặt & Khởi chạy

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy môi trường phát triển (http://localhost:3000)
npm run dev

# 3. Build sản phẩm
npm run build
```

# Vercel Dependency Fix

The original project used React `latest` together with React Three Fiber 8.x and Rapier 1.x. Vercel resolved `react` to React 19, which caused npm peer-dependency resolution to fail.

The project now uses the React 19-compatible family:

- Next.js 16.x
- React 19.x / React DOM 19.x
- @react-three/fiber 9.x
- @react-three/drei 10.x
- @react-three/rapier 2.x
- Three.js 0.185.x

Do not use `--force` or `--legacy-peer-deps` for deployment. Vercel should install the dependency tree normally.

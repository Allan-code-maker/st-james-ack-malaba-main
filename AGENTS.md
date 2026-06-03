# Project: St. James ACK Malaba Website

## Overview
This is the official website for St. James ACK Church in Malaba, Kenya.
Frontend is React/TypeScript. Backend is a Motoko canister on ICP.

## Rules
- Always use `useAuth()` from `src/frontend/src/hooks/useAuth.ts` for auth checks
- Admin-only routes must check `isAdmin` from `useAuth()`
- Backend calls go through the `actor` from `useActor(createActor)`
- Church content (sermons, events, announcements) is stored on-chain via the backend canister

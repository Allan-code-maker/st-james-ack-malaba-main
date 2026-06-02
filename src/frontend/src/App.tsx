import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// ─── Lazy-load all pages ──────────────────────────────────────────────────────
const HomePage = lazy(() => import("@/pages/HomePage"));
const HymnsPage = lazy(() => import("@/pages/HymnsPage"));
const HymnDetailPage = lazy(() => import("@/pages/HymnDetailPage"));
const HymnDisplayPage = lazy(() => import("@/pages/HymnDisplayPage"));
const BibleReadingsPage = lazy(() => import("@/pages/BibleReadingsPage"));
const BibleReadingDetailPage = lazy(
  () => import("@/pages/BibleReadingDetailPage"),
);
const AnnouncementsPage = lazy(() => import("@/pages/AnnouncementsPage"));
const AnnouncementDetailPage = lazy(
  () => import("@/pages/AnnouncementDetailPage"),
);
const SermonSchedulePage = lazy(() => import("@/pages/SermonSchedulePage"));
const SermonDetailPage = lazy(() => import("@/pages/SermonDetailPage"));
const SundayProgramPage = lazy(() => import("@/pages/SundayProgramPage"));
const SundaySchoolPage = lazy(() => import("@/pages/SundaySchoolPage"));
const SundaySchoolClassPage = lazy(
  () => import("@/pages/SundaySchoolClassPage"),
);
const YouthMinistryPage = lazy(() => import("@/pages/YouthMinistryPage"));
const MothersUnionPage = lazy(() => import("@/pages/MothersUnionPage"));
const MensAssociationPage = lazy(() => import("@/pages/MensAssociationPage"));
const OfferingPage = lazy(() => import("@/pages/OfferingPage"));
const ServiceBookPage = lazy(() => import("@/pages/ServiceBookPage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));

function PageLoader() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
      <Skeleton className="h-10 w-1/2" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </Layout>
  );
}

// ─── Routes ────────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({ component: () => <Outlet /> });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <PageWrapper>
      <HomePage />
    </PageWrapper>
  ),
});

const hymnsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hymns",
  component: () => (
    <PageWrapper>
      <HymnsPage />
    </PageWrapper>
  ),
});

const hymnDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hymns/$id",
  component: () => (
    <PageWrapper>
      <HymnDetailPage />
    </PageWrapper>
  ),
});

const hymnDisplayBaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hymns/display",
  component: () => (
    <PageWrapper>
      <HymnsPage />
    </PageWrapper>
  ),
});

const hymnDisplayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hymns/display/$id",
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <HymnDisplayPage />
      </Suspense>
    </Layout>
  ),
});

const bibleReadingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bible-readings",
  component: () => (
    <PageWrapper>
      <BibleReadingsPage />
    </PageWrapper>
  ),
});

const bibleReadingDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/bible-readings/$id",
  component: () => (
    <PageWrapper>
      <BibleReadingDetailPage />
    </PageWrapper>
  ),
});

const announcementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/announcements",
  component: () => (
    <PageWrapper>
      <AnnouncementsPage />
    </PageWrapper>
  ),
});

const announcementDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/announcements/$id",
  component: () => (
    <PageWrapper>
      <AnnouncementDetailPage />
    </PageWrapper>
  ),
});

const sermonScheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sermon-schedule",
  component: () => (
    <PageWrapper>
      <SermonSchedulePage />
    </PageWrapper>
  ),
});

const sermonDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sermon-schedule/$id",
  component: () => (
    <PageWrapper>
      <SermonDetailPage />
    </PageWrapper>
  ),
});

const sundayProgramRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sunday-program",
  component: () => (
    <PageWrapper>
      <SundayProgramPage />
    </PageWrapper>
  ),
});

const sundaySchoolRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sunday-school",
  component: () => (
    <PageWrapper>
      <SundaySchoolPage />
    </PageWrapper>
  ),
});

const sundaySchoolClassRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sunday-school/$id",
  component: () => (
    <PageWrapper>
      <SundaySchoolClassPage />
    </PageWrapper>
  ),
});

const youthMinistryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/youth-ministry",
  component: () => (
    <PageWrapper>
      <YouthMinistryPage />
    </PageWrapper>
  ),
});

const mothersUnionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mothers-union",
  component: () => (
    <PageWrapper>
      <MothersUnionPage />
    </PageWrapper>
  ),
});

const mensAssociationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/mens-association",
  component: () => (
    <PageWrapper>
      <MensAssociationPage />
    </PageWrapper>
  ),
});

const offeringRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/offering",
  component: () => (
    <PageWrapper>
      <OfferingPage />
    </PageWrapper>
  ),
});

const serviceBookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/service-book",
  component: () => (
    <PageWrapper>
      <ServiceBookPage />
    </PageWrapper>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <PageWrapper>
      <AdminPage />
    </PageWrapper>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  hymnsRoute,
  hymnDisplayBaseRoute,
  hymnDisplayRoute,
  hymnDetailRoute,
  bibleReadingsRoute,
  bibleReadingDetailRoute,
  announcementsRoute,
  announcementDetailRoute,
  sermonScheduleRoute,
  sermonDetailRoute,
  sundayProgramRoute,
  sundaySchoolRoute,
  sundaySchoolClassRoute,
  youthMinistryRoute,
  mothersUnionRoute,
  mensAssociationRoute,
  offeringRoute,
  serviceBookRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

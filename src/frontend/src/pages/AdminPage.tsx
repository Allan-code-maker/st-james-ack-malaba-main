import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import AdminAnnouncements from "@/pages/admin/AdminAnnouncements";
import AdminBibleReadings from "@/pages/admin/AdminBibleReadings";
import AdminHymns from "@/pages/admin/AdminHymns";
import AdminMensAssociation from "@/pages/admin/AdminMensAssociation";
import AdminMothersUnion from "@/pages/admin/AdminMothersUnion";
import AdminOffering from "@/pages/admin/AdminOffering";
import AdminSermons from "@/pages/admin/AdminSermons";
import AdminServiceBook from "@/pages/admin/AdminServiceBook";
import AdminSundayProgram from "@/pages/admin/AdminSundayProgram";
import AdminSundaySchool from "@/pages/admin/AdminSundaySchool";
import AdminYouthMinistry from "@/pages/admin/AdminYouthMinistry";
import { LayoutDashboard, LogIn, LogOut, Shield, Settings } from "lucide-react";

const ADMIN_SECTIONS = [
  { value: "hymns", label: "Hymns", icon: "🎵", component: <AdminHymns /> },
  { value: "bible-readings", label: "Bible Readings", icon: "📖", component: <AdminBibleReadings /> },
  { value: "announcements", label: "Announcements", icon: "📢", component: <AdminAnnouncements /> },
  { value: "sermons", label: "Sermons", icon: "🎤", component: <AdminSermons /> },
  { value: "sunday-program", label: "Sunday Program", icon: "📅", component: <AdminSundayProgram /> },
  { value: "sunday-school", label: "Sunday School", icon: "👶", component: <AdminSundaySchool /> },
  { value: "youth", label: "Youth Ministry", icon: "👥", component: <AdminYouthMinistry /> },
  { value: "mothers-union", label: "Mothers' Union", icon: "👩", component: <AdminMothersUnion /> },
  { value: "mens-association", label: "Men's Association", icon: "👨", component: <AdminMensAssociation /> },
  { value: "offering", label: "Offering", icon: "💰", component: <AdminOffering /> },
  { value: "service-book", label: "Service Book", icon: "📘", component: <AdminServiceBook /> },
];

export default function AdminPage() {
  const {
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    handleLogin,
    handleLogout,
  } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
          <Shield size={28} className="text-primary" />
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">
          Admin Access
        </h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Sign in with Internet Identity to manage church content.
        </p>
        <Button
          onClick={handleLogin}
          disabled={isInitializing || isLoggingIn}
          className="gap-2"
        >
          <LogIn size={16} />
          {isInitializing
            ? "Loading…"
            : isLoggingIn
              ? "Opening login…"
              : "Login with Internet Identity"}
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <LayoutDashboard size={20} className="text-primary" />
        </div>
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage all church content
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto gap-2 shrink-0"
          onClick={handleLogout}
        >
          <LogOut size={14} />
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
              <CardDescription>System overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="text-green-500 font-medium">Live</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Admin Mode</span>
                <span className="font-medium">Active</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Tabs defaultValue="hymns" className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-muted/60 p-1 rounded-xl justify-start">
              {ADMIN_SECTIONS.map((section) => (
                <TabsTrigger key={section.value} value={section.value} className="text-xs">
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {ADMIN_SECTIONS.map((section) => (
              <TabsContent key={section.value} value={section.value} className="mt-0">
                <Card className="border-none shadow-none bg-transparent">
                  {section.component}
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

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
import { LogIn, LogOut, Shield } from "lucide-react";

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
      <div
        data-ocid="admin.page"
        className="max-w-md mx-auto px-4 py-16 text-center"
      >
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
          data-ocid="admin.login_button"
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
    <div data-ocid="admin.page" className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <Shield size={20} className="text-primary" />
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
          data-ocid="admin.logout_button"
          variant="outline"
          size="sm"
          className="ml-auto gap-2 shrink-0"
          onClick={handleLogout}
        >
          <LogOut size={14} />
          Logout
        </Button>
      </div>

      <Tabs defaultValue="hymns" data-ocid="admin.tabs">
        <TabsList className="flex flex-wrap h-auto gap-1 mb-6 bg-muted/60 p-1 rounded-xl">
          <TabsTrigger data-ocid="admin.tab.hymns" value="hymns">
            🎵 Hymns
          </TabsTrigger>
          <TabsTrigger
            data-ocid="admin.tab.bible-readings"
            value="bible-readings"
          >
            📖 Bible Readings
          </TabsTrigger>
          <TabsTrigger
            data-ocid="admin.tab.announcements"
            value="announcements"
          >
            📢 Announcements
          </TabsTrigger>
          <TabsTrigger data-ocid="admin.tab.sermons" value="sermons">
            🎤 Sermons
          </TabsTrigger>
          <TabsTrigger
            data-ocid="admin.tab.sunday-program"
            value="sunday-program"
          >
            📅 Sunday Program
          </TabsTrigger>
          <TabsTrigger
            data-ocid="admin.tab.sunday-school"
            value="sunday-school"
          >
            👶 Sunday School
          </TabsTrigger>
          <TabsTrigger data-ocid="admin.tab.youth" value="youth">
            👥 Youth Ministry
          </TabsTrigger>
          <TabsTrigger
            data-ocid="admin.tab.mothers-union"
            value="mothers-union"
          >
            👩 Mothers' Union
          </TabsTrigger>
          <TabsTrigger
            data-ocid="admin.tab.mens-association"
            value="mens-association"
          >
            👨 Men's Association
          </TabsTrigger>
          <TabsTrigger data-ocid="admin.tab.offering" value="offering">
            💰 Offering
          </TabsTrigger>
          <TabsTrigger data-ocid="admin.tab.service-book" value="service-book">
            📘 Service Book
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hymns">
          <AdminHymns />
        </TabsContent>
        <TabsContent value="bible-readings">
          <AdminBibleReadings />
        </TabsContent>
        <TabsContent value="announcements">
          <AdminAnnouncements />
        </TabsContent>
        <TabsContent value="sermons">
          <AdminSermons />
        </TabsContent>
        <TabsContent value="sunday-program">
          <AdminSundayProgram />
        </TabsContent>
        <TabsContent value="sunday-school">
          <AdminSundaySchool />
        </TabsContent>
        <TabsContent value="youth">
          <AdminYouthMinistry />
        </TabsContent>
        <TabsContent value="mothers-union">
          <AdminMothersUnion />
        </TabsContent>
        <TabsContent value="mens-association">
          <AdminMensAssociation />
        </TabsContent>
        <TabsContent value="offering">
          <AdminOffering />
        </TabsContent>
        <TabsContent value="service-book">
          <AdminServiceBook />
        </TabsContent>
      </Tabs>
    </div>
  );
}

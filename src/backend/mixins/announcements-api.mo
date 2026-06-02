import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import AnnouncementsLib "../lib/announcements";
import Types "../types/announcements";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  announcementsState : AnnouncementsLib.State,
) {
  public shared ({ caller }) func addAnnouncement(input : Types.AnnouncementInput) : async Types.Announcement {
    Debug.todo();
  };

  public shared ({ caller }) func updateAnnouncement(id : CommonTypes.Id, input : Types.AnnouncementInput) : async ?Types.Announcement {
    Debug.todo();
  };

  public shared ({ caller }) func deleteAnnouncement(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };

  public query func getAnnouncement(id : CommonTypes.Id) : async ?Types.Announcement {
    Debug.todo();
  };

  public query func listAnnouncements() : async [Types.Announcement] {
    Debug.todo();
  };
};

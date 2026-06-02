import Debug "mo:core/Debug";
import List "mo:core/List";
import Types "../types/announcements";
import CommonTypes "../types/common";
import Time "mo:core/Time";

module {
  public type State = {
    announcements : List.List<Types.Announcement>;
    nextId : { var val : Nat };
  };

  public func initState() : State {
    {
      announcements = List.empty<Types.Announcement>();
      nextId = { var val = 1 };
    };
  };

  public func addAnnouncement(state : State, input : Types.AnnouncementInput) : Types.Announcement {
    let ann : Types.Announcement = {
      id = state.nextId.val;
      title = input.title;
      body = input.body;
      pinned = input.pinned;
      createdAt = Time.now();
    };
    state.announcements.add(ann);
    state.nextId.val += 1;
    ann;
  };

  public func updateAnnouncement(state : State, id : CommonTypes.Id, input : Types.AnnouncementInput) : ?Types.Announcement {
    var updated : ?Types.Announcement = null;
    state.announcements.mapInPlace(
      func(a) {
        if (a.id == id) {
          let u = { a with title = input.title; body = input.body; pinned = input.pinned };
          updated := ?u;
          u;
        } else { a };
      }
    );
    updated;
  };

  public func deleteAnnouncement(state : State, id : CommonTypes.Id) : Bool {
    let before = state.announcements.size();
    let filtered = state.announcements.filter(func(a) { a.id != id });
    state.announcements.clear();
    state.announcements.append(filtered);
    state.announcements.size() < before;
  };

  public func getAnnouncement(state : State, id : CommonTypes.Id) : ?Types.Announcement {
    state.announcements.find(func(a) { a.id == id });
  };

  public func listAnnouncements(state : State) : [Types.Announcement] {
    state.announcements.toArray();
  };

  public func seedSampleData(state : State) {
    ignore addAnnouncement(state, {
      title = "Sunday Service Notice";
      body = "Sunday Service at St. James ACK Malaba begins at 9:00 AM. All members are warmly invited. Please arrive early for preparation.";
      pinned = true;
    });
    ignore addAnnouncement(state, {
      title = "Prayer Meeting";
      body = "The weekly Prayer Meeting will be held on Wednesday at 5:30 PM in the main hall. Come and join us in prayer and fellowship.";
      pinned = false;
    });
  };
};

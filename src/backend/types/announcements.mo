import CommonTypes "common";

module {
  public type Announcement = {
    id : CommonTypes.Id;
    title : Text;
    body : Text;
    pinned : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type AnnouncementInput = {
    title : Text;
    body : Text;
    pinned : Bool;
  };
};

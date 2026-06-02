import CommonTypes "common";

module {
  public type Hymn = {
    id : CommonTypes.Id;
    number : Nat;
    title : Text;
    lyrics : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type HymnInput = {
    number : Nat;
    title : Text;
    lyrics : Text;
  };
};

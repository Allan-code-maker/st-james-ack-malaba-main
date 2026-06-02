import CommonTypes "common";

module {
  public type ProgramItem = {
    id : CommonTypes.Id;
    time : Text;
    activity : Text;
    order : Nat;
    createdAt : CommonTypes.Timestamp;
  };

  public type ProgramItemInput = {
    time : Text;
    activity : Text;
    order : Nat;
  };
};

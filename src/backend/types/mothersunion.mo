import CommonTypes "common";

module {
  public type MothersItem = {
    id : CommonTypes.Id;
    category : Text;
    title : Text;
    description : Text;
    date : ?CommonTypes.Timestamp;
    leader : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type MothersItemInput = {
    category : Text;
    title : Text;
    description : Text;
    date : ?CommonTypes.Timestamp;
    leader : Text;
  };
};

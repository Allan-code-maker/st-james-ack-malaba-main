import CommonTypes "common";

module {
  public type MensItem = {
    id : CommonTypes.Id;
    category : Text;
    title : Text;
    description : Text;
    date : ?CommonTypes.Timestamp;
    leader : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type MensItemInput = {
    category : Text;
    title : Text;
    description : Text;
    date : ?CommonTypes.Timestamp;
    leader : Text;
  };
};

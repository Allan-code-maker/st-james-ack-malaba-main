import CommonTypes "common";

module {
  public type YouthItem = {
    id : CommonTypes.Id;
    category : Text;
    title : Text;
    description : Text;
    date : ?CommonTypes.Timestamp;
    leader : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type YouthItemInput = {
    category : Text;
    title : Text;
    description : Text;
    date : ?CommonTypes.Timestamp;
    leader : Text;
  };
};

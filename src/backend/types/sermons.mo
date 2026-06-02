import CommonTypes "common";

module {
  public type Sermon = {
    id : CommonTypes.Id;
    preacher : Text;
    theme : Text;
    date : CommonTypes.Timestamp;
    scriptureRef : Text;
    notes : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type SermonInput = {
    preacher : Text;
    theme : Text;
    date : CommonTypes.Timestamp;
    scriptureRef : Text;
    notes : Text;
  };
};

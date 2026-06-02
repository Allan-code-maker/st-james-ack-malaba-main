import CommonTypes "common";

module {
  public type BibleReading = {
    id : CommonTypes.Id;
    reference : Text;
    text : Text;
    isReadingOfDay : Bool;
    createdAt : CommonTypes.Timestamp;
  };

  public type BibleReadingInput = {
    reference : Text;
    text : Text;
  };
};

import CommonTypes "common";

module {
  public type ServiceBookItem = {
    id : CommonTypes.Id;
    step : Nat;
    title : Text;
    content : Text;
    createdAt : CommonTypes.Timestamp;
  };

  public type ServiceBookItemInput = {
    step : Nat;
    title : Text;
    content : Text;
  };
};

import Debug "mo:core/Debug";
import AccessControl "mo:caffeineai-authorization/access-control";
import MothersLib "../lib/mothersunion";
import Types "../types/mothersunion";
import CommonTypes "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  mothersState : MothersLib.State,
) {
  public shared ({ caller }) func addMothersItem(input : Types.MothersItemInput) : async Types.MothersItem {
    Debug.todo();
  };

  public shared ({ caller }) func updateMothersItem(id : CommonTypes.Id, input : Types.MothersItemInput) : async ?Types.MothersItem {
    Debug.todo();
  };

  public shared ({ caller }) func deleteMothersItem(id : CommonTypes.Id) : async Bool {
    Debug.todo();
  };

  public query func getMothersItem(id : CommonTypes.Id) : async ?Types.MothersItem {
    Debug.todo();
  };

  public query func listMothersItems() : async [Types.MothersItem] {
    Debug.todo();
  };
};
